/* Weaver — sine-wave descent, hard to hit, does not fire. */
class Weaver extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'weaver', CONFIG.enemies.weaver);
    this.typeKey = 'weaver';
  }
  _move(dt) {
    this.y += this.speed * dt;
    const a = this.base.waveAmplitude, f = this.base.waveFreq;
    // Oscillate around the spawn column, clamped to the play field.
    const targetX = this.spawnX + Math.sin(this._age * f) * a;
    this.x = Phaser.Math.Clamp(targetX, this.displayWidth * 0.5,
                               CONFIG.WIDTH - this.displayWidth * 0.5);
  }
}
