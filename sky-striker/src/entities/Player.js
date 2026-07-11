/* ============================================================
   Player — the jet.
   Responsibilities:
     - Follow the pointer (mouse on desktop, finger on mobile with
       an upward offset) using smooth easing, clamped to bounds.
     - Auto-fire continuously; bullet pattern scales with weapon level.
     - Manage the weapon-level decay timer.
     - Track health / invulnerability (damage hooks ready for enemies).
   ============================================================ */

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.setCollideWorldBounds(true);
    this.setDepth(10);

    // Movement target (where the pointer wants the jet to be)
    this.targetX = x;
    this.targetY = y;

    // --- Bullet pool ---
    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: CONFIG.bullet.poolSize,
      runChildUpdate: true,
    });

    // --- Weapon state ---
    this.weaponLevel = CONFIG.weapon.startLevel;
    this._fireTimer = 0;
    this._decayTimer = 0;

    // --- Health / survivability ---
    this.health = CONFIG.player.maxHealth;
    this.invulnUntil = 0;
    this.shield = 0; // hits absorbed before health is touched

    // Shield bubble visual (hidden until a shield is active)
    this.shieldSprite = scene.add.image(x, y, 'ring');
    this.shieldSprite.setTint(CONFIG.colors.shield);
    this.shieldSprite.setScale(1.4);
    this.shieldSprite.setAlpha(0.7);
    this.shieldSprite.setDepth(11);
    this.shieldSprite.setVisible(false);

    this._syncRegistry();

    // Engine thrust trail (establishes the particle pattern; cheap)
    this.thrust = scene.add.particles(0, 0, 'spark', {
      speedY: { min: 120, max: 220 },
      speedX: { min: -20, max: 20 },
      lifespan: 320,
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.8, end: 0 },
      quantity: 2,
      frequency: 30,
      blendMode: 'ADD',
      tint: CONFIG.colors.thrust,
    });
    this.thrust.setDepth(9);
    this.thrust.startFollow(this, 0, this.height * 0.45);
  }

  // Called by GameScene whenever pointer position changes / every frame.
  setTargetFromPointer(pointer) {
    let ty = pointer.y;
    // Lift target above the finger on touch input only.
    if (pointer.wasTouch) ty -= CONFIG.player.touchOffsetY;
    this.targetX = pointer.x;
    this.targetY = ty;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const dt = delta / 1000;

    // --- Smooth easing toward the target, clamped to the play field ---
    const halfW = this.displayWidth * 0.5;
    const halfH = this.displayHeight * 0.5;
    const tx = Phaser.Math.Clamp(this.targetX, halfW, CONFIG.WIDTH - halfW);
    const ty = Phaser.Math.Clamp(this.targetY, halfH, CONFIG.HEIGHT - halfH);
    this.x = Phaser.Math.Linear(this.x, tx, CONFIG.player.followLerp);
    this.y = Phaser.Math.Linear(this.y, ty, CONFIG.player.followLerp);

    // Subtle bank/tilt based on horizontal movement for character
    const drift = tx - this.x;
    this.setRotation(Phaser.Math.Clamp(drift * 0.02, -0.25, 0.25));

    // --- Auto-fire ---
    this._fireTimer -= delta;
    if (this._fireTimer <= 0) {
      this._fire();
      this._fireTimer = CONFIG.weapon.fireIntervalByLevel[this.weaponLevel];
    }

    // --- Weapon decay ---
    this._decayTimer += dt;
    if (this._decayTimer >= CONFIG.weapon.decaySeconds) {
      this._decayTimer = 0;
      if (this.weaponLevel > 1) {
        this.setWeaponLevel(this.weaponLevel - 1);
      }
    }

    // Flicker while invulnerable
    if (time < this.invulnUntil) {
      this.setAlpha(0.4 + 0.4 * Math.sin(time * 0.03));
    } else {
      this.setAlpha(1);
    }

    // Shield bubble tracks the ship and gently pulses
    if (this.shieldSprite.visible) {
      this.shieldSprite.setPosition(this.x, this.y);
      this.shieldSprite.setScale(1.4 + 0.06 * Math.sin(time * 0.008));
    }
  }

  // Fire the current weapon pattern. Bullets travel up (negative Y).
  _fire() {
    const speed = CONFIG.weapon.bulletSpeed;
    const dmg = CONFIG.weapon.damageByLevel[this.weaponLevel];
    const y = this.y - this.displayHeight * 0.5;

    // Each entry is a horizontal offset + an angle (deg from straight up).
    const patterns = {
      1: [[0, 0]],
      2: [[-8, 0], [8, 0]],
      3: [[0, 0], [-12, -10], [12, 10]],
      4: [[0, 0], [-10, 0], [10, 0], [-16, -18], [16, 18]],
      5: [[0, 0], [-8, -6], [8, 6], [-16, -16], [16, 16], [-22, -26], [22, 26]],
    };

    for (const [ox, angDeg] of patterns[this.weaponLevel]) {
      const rad = Phaser.Math.DegToRad(angDeg - 90); // -90 => straight up
      const vx = Math.cos(rad) * speed;
      const vy = Math.sin(rad) * speed;
      const b = this.bullets.get();
      if (b) b.fire(this.x + ox, y, vx, vy, dmg);
    }

    // Hook: this.scene.sfx('shoot');  <-- wired when SFX assets are added
  }

  setWeaponLevel(level) {
    this.weaponLevel = Phaser.Math.Clamp(level, 1, CONFIG.weapon.maxLevel);
    this._syncRegistry();
  }

  upgradeWeapon() {
    this._decayTimer = 0; // picking up resets the decay clock
    this.setWeaponLevel(this.weaponLevel + 1);
  }

  // Damage entry point (called by enemy collision handlers).
  takeDamage(amount, time) {
    if (time < this.invulnUntil) return;

    // Shield absorbs the whole hit before health is touched.
    if (this.shield > 0) {
      this.shield--;
      this.invulnUntil = time + CONFIG.player.invulnMs;
      this._updateShieldVisual();
      this._syncRegistry();
      return;
    }

    this.health = Math.max(0, this.health - amount);
    this.invulnUntil = time + CONFIG.player.invulnMs;
    this._syncRegistry();
    if (this.health <= 0) this.scene.events.emit('player-dead');
  }

  addShield(hits) {
    this.shield = Math.min(CONFIG.shield.maxHits, this.shield + hits);
    this._updateShieldVisual();
    this._syncRegistry();
  }

  _updateShieldVisual() {
    this.shieldSprite.setVisible(this.shield > 0);
  }

  _syncRegistry() {
    const r = this.scene.registry;
    r.set('health', this.health);
    r.set('weaponLevel', this.weaponLevel);
    r.set('shield', this.shield);
  }

  destroy(fromScene) {
    if (this.thrust) this.thrust.destroy();
    if (this.shieldSprite) this.shieldSprite.destroy();
    super.destroy(fromScene);
  }
}
