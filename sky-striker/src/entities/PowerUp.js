/* ============================================================
   PowerUp — dropped by Gunner-type enemies. Falls slowly with a
   gentle wobble; despawns if not collected in time. Type is one
   of 'weapon' | 'shield' | 'health'; the GameScene applies the
   effect on pickup.
   ============================================================ */

const POWERUP_TEX = { weapon: 'pw_weapon', shield: 'pw_shield', health: 'pw_health' };

class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, POWERUP_TEX[type]);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.type = type;
    this.setDepth(7);
    this._baseX = x;
    this._age = 0;
    this.setVelocityY(CONFIG.powerup.fallSpeed);

    // Idle spin/pulse so it reads as collectible
    scene.tweens.add({ targets: this, scale: 1.15, duration: 500,
                       yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Auto-despawn
    this._life = scene.time.delayedCall(CONFIG.powerup.lifespanMs, () => {
      if (this.active) this.destroy();
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this._age += delta / 1000;
    // gentle horizontal wobble
    this.x = this._baseX + Math.sin(this._age * 3) * 14;
    if (this.y > CONFIG.HEIGHT + 30) this.destroy();
  }

  destroy(fromScene) {
    if (this._life) this._life.remove(false);
    if (this.scene) this.scene.tweens.killTweensOf(this);
    super.destroy(fromScene);
  }
}
