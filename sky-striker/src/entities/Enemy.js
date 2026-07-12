/* ============================================================
   Enemy (base) — shared behaviour for all archetypes.
   Subclasses (Grunt / Weaver / Gunner) override _move() and,
   if they fire, _fire(). Per-stage scaling (hp/speed) and tint
   are applied on spawn.

   Not pooled (enemy churn is far lower than bullets); created
   and destroyed directly. Bullets/particles remain pooled.
   ============================================================ */

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, baseStats) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
    this.base = baseStats;
    this.setDepth(6);
    this._age = 0;
    this._fireTimer = 0;
  }

  // Called by WaveManager right after construction.
  spawn(stage) {
    const scale = CONFIG.stageScaling[stage] || { hp: 1, speed: 1 };
    const d = Difficulty.mods();
    this.maxHealth = Math.max(1, Math.round(this.base.health * scale.hp * d.hpMul));
    this.health = this.maxHealth;
    this.speed = this.base.speed * scale.speed * d.speedMul;
    this.score = this.base.score;
    this.contactDamage = this.base.contactDamage;
    // Effective (difficulty-adjusted) firing values
    this.bulletSpeed = this.base.bulletSpeed * d.bulletSpeedMul;
    this.fireIntervalMs = this.base.fireIntervalMs * d.fireRateMul;
    this.spawnX = this.x;
    this._age = 0;
    this._fireTimer = this.fireIntervalMs
      ? Phaser.Math.Between(400, this.fireIntervalMs) : 0;

    // Per-stage re-skin
    const tints = CONFIG.stageTints[stage];
    if (tints && tints[this.typeKey] !== undefined) this.setTint(tints[this.typeKey]);
    return this;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
      return;
    }
    // Brief hit flash — only when the enemy survives, so the tween can
    // never update a destroyed sprite (a cause of hard freezes).
    this.scene.tweens.add({ targets: this, alpha: 0.55, duration: 40, yoyo: true });
  }

  die(silent) {
    if (!this.active) return;
    const scene = this.scene;
    if (!silent) scene.onEnemyKilled(this);   // score + explosion + maybe drop
    this.destroy();
    scene.events.emit('enemy-removed');        // lets WaveManager check for clear
  }

  // Ensure no tween keeps ticking on a destroyed enemy.
  destroy(fromScene) {
    if (this.scene) this.scene.tweens.killTweensOf(this);
    super.destroy(fromScene);
  }

  _emitBullet(vx, vy) {
    const b = this.scene.enemyBullets.get();
    if (b) b.fire(this.x, this.y + this.displayHeight * 0.4, vx, vy);
  }

  // Fire straight down (overridden by Gunner for aimed shots).
  _fire() {
    this._emitBullet(0, this.bulletSpeed);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const dt = delta / 1000;
    this._age += dt;

    this._move(dt);

    // Firing (only if this archetype fires)
    if (this.base.fireIntervalMs > 0) {
      this._fireTimer -= delta;
      if (this._fireTimer <= 0 && this.y > 0 && this.y < CONFIG.HEIGHT * 0.85) {
        this._fire();
        this._fireTimer = this.fireIntervalMs;
      }
    }

    // Despawn once fully off the bottom (no penalty for MVP)
    if (this.y > CONFIG.HEIGHT + 40) this.die(true);
  }

  // Overridden per archetype.
  _move(dt) { this.y += this.speed * dt; }
}
