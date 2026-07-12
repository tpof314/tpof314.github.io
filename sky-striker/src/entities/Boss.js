/* ============================================================
   Boss — one per stage. Slides in, hovers/sweeps, and runs a
   3-phase attack script (phases enter at 100% / 66% / 33% HP).
   Each phase layers several attack patterns on independent
   cadences. On death it plays a staggered explosion sequence,
   then tells the scene the stage is clear.

   Fires into the shared scene.enemyBullets pool, so the existing
   player<->enemyBullets overlap already handles boss bullets.
   ============================================================ */

class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, cfg, stage) {
    super(scene, CONFIG.WIDTH / 2, -120, cfg.tex);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
    this.cfg = cfg;
    this.stage = stage;
    this.setDepth(8);

    this.maxHealth = Math.round(cfg.healthBase * Difficulty.mods().bossHpMul);
    this.health = this.maxHealth;
    this.contactDamage = cfg.contactDamage;
    this.score = cfg.score;
    this.setTint(cfg.tint);
    // Slightly forgiving hitbox
    this.body.setSize(this.width * 0.82, this.height * 0.82, true);

    this.attacksEnabled = false;
    this.dying = false;
    this.phaseIndex = -1;
    this.phase = null;
    this._dir = 1;
    this._t = 0;
    this._spiralAngle = 0;
    this._invulnUntil = 0;
    this.hoverY = cfg.hoverY;

    // Populate HUD boss bar
    const r = scene.registry;
    r.set('bossActive', true);
    r.set('bossName', cfg.name);
    r.set('bossHealth', this.health);
    r.set('bossMaxHealth', this.maxHealth);

    // Entrance, then arm attacks
    this.body.enable = false; // no collisions until it's on screen
    scene.tweens.add({
      targets: this, y: this.hoverY, duration: 1400, ease: 'Cubic.out',
      onComplete: () => {
        this.body.enable = true;
        this.attacksEnabled = true;
        this._enterPhase(0);
      },
    });
  }

  // ---- Phases ----------------------------------------------

  _enterPhase(i) {
    if (i === this.phaseIndex || i >= this.cfg.phases.length) return;
    this.phaseIndex = i;
    this.phase = this.cfg.phases[i];
    const now = this.scene.time.now;
    this.phase.steps.forEach((s) => { s._next = now + (s.startDelay || 0); });

    if (i > 0) { // phase-change flourish
      this.scene.cameras.main.shake(200, 0.006);
      this._invulnUntil = now + 350;
      this._radial({ count: 16, speed: 200 });
    }
  }

  // ---- Damage / death --------------------------------------

  takeDamage(amount) {
    if (this.dying) return;
    this.health = Math.max(0, this.health - amount);
    this.scene.registry.set('bossHealth', this.health);

    // hit flash (fill white briefly, then restore tint)
    this.setTintFill(0xffffff);
    this.scene.time.delayedCall(45, () => {
      if (this.active && !this.dying) this.setTint(this.cfg.tint);
    });

    const frac = this.health / this.maxHealth;
    if (this.phaseIndex < 1 && frac <= 0.66) this._enterPhase(1);
    else if (this.phaseIndex < 2 && frac <= 0.33) this._enterPhase(2);

    if (this.health <= 0) this._die();
  }

  _die() {
    if (this.dying) return;
    this.dying = true;
    this.attacksEnabled = false;
    this.body.enable = false;
    this.scene.registry.set('bossActive', false);
    this.scene.tweens.killTweensOf(this);
    this.setTint(this.cfg.tint);

    const n = 9;
    for (let i = 0; i < n; i++) {
      this.scene.time.delayedCall(i * 130, () => {
        if (!this.active) return;
        const ox = Phaser.Math.Between(-this.displayWidth * 0.4, this.displayWidth * 0.4);
        const oy = Phaser.Math.Between(-this.displayHeight * 0.35, this.displayHeight * 0.35);
        this.scene.explosions.play(this.x + ox, this.y + oy,
          i % 2 ? 'medium' : 'large');
        this.setAlpha(1 - (i / n) * 0.5);
      });
    }
    // Final blast + hand off to the scene
    this.scene.time.delayedCall(n * 130 + 160, () => {
      this.scene.explosions.play(this.x, this.y, 'boss');
      SFX.bossDeath();
      if (this.scene._screenFlash) this.scene._screenFlash(0xffffff, 0.85, 260);
      const scene = this.scene;
      this.destroy();
      scene.onBossDefeated(this.cfg, this.score);
    });
  }

  // ---- Movement --------------------------------------------

  _move(dt) {
    const W = CONFIG.WIDTH, m = 78;
    switch (this.cfg.movement) {
      case 'sweep':
        this.x += this._dir * this.cfg.moveSpeed * dt;
        if (this.x < m) { this.x = m; this._dir = 1; }
        else if (this.x > W - m) { this.x = W - m; this._dir = -1; }
        this.y = this.hoverY + Math.sin(this._t * 1.4) * 6;
        break;
      case 'figure8':
        this.x = W / 2 + Math.sin(this._t * 0.9) * 92;
        this.y = this.hoverY + Math.sin(this._t * 1.8) * 24;
        break;
      case 'hover':
      default:
        this.x = W / 2 + Math.sin(this._t * 0.8) * 60;
        this.y = this.hoverY + Math.sin(this._t * 1.6) * 10;
        break;
    }
  }

  // ---- Attack dispatch & patterns --------------------------

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.dying) return;
    const dt = delta / 1000;
    this._t += dt;
    this._move(dt);

    if (!this.attacksEnabled || !this.phase) return;
    for (const step of this.phase.steps) {
      if (time >= step._next) {
        this._dispatch(step);
        step._next = time + step.every;
      }
    }
  }

  _dispatch(step) {
    switch (step.fn) {
      case 'spread': this._spread(step); break;
      case 'aimed':  this._aimed(step);  break;
      case 'radial': this._radial(step); break;
      case 'spiral': this._spiral(step); break;
      case 'rain':   this._rain(step);   break;
    }
  }

  _shoot(x, y, angDeg, speed) {
    const b = this.scene.enemyBullets.get();
    if (!b) return;
    const rad = Phaser.Math.DegToRad(angDeg);
    b.fire(x, y, Math.cos(rad) * speed, Math.sin(rad) * speed);
  }

  _muzzle() { return { x: this.x, y: this.y + this.displayHeight * 0.3 }; }

  // Fan of bullets centred straight down (90deg in screen space).
  _spread({ count, arc, speed }) {
    const { x, y } = this._muzzle();
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      this._shoot(x, y, 90 + (t - 0.5) * arc, speed);
    }
  }

  // Volley aimed at the player, optionally spread around the aim.
  _aimed({ count, arc, speed }) {
    const p = this.scene.player;
    if (!p || !p.active) return this._spread({ count, arc, speed });
    const { x, y } = this._muzzle();
    const aim = Phaser.Math.RadToDeg(Math.atan2(p.y - y, p.x - x));
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      this._shoot(x, y, aim + (t - 0.5) * (arc || 0), speed);
    }
  }

  // Ring of bullets in all directions.
  _radial({ count, speed, offset = 0 }) {
    const { x, y } = this._muzzle();
    for (let i = 0; i < count; i++) this._shoot(x, y, offset + i * (360 / count), speed);
  }

  // Rotating spiral (advances a running angle each tick).
  _spiral({ arms, speed, rot }) {
    const { x, y } = this._muzzle();
    for (let i = 0; i < arms; i++) this._shoot(x, y, this._spiralAngle + i * (360 / arms), speed);
    this._spiralAngle = (this._spiralAngle + rot) % 360;
  }

  // Barrage falling straight down from random columns.
  _rain({ count, speed }) {
    const W = CONFIG.WIDTH;
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(24, W - 24);
      const s = speed * Phaser.Math.FloatBetween(0.9, 1.15);
      this._shoot(x, this.y, 90, s);
    }
  }

  destroy(fromScene) {
    if (this.scene) this.scene.tweens.killTweensOf(this);
    super.destroy(fromScene);
  }
}
