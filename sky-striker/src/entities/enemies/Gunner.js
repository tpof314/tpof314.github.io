/* Gunner — slow descent, fires AIMED shots at the player,
   drops a power-up on death. Drifts to a hold band then creeps. */
class Gunner extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'gunner', CONFIG.enemies.gunner);
    this.typeKey = 'gunner';
  }
  _move(dt) {
    // Slow to a crawl once it reaches its firing band, so it lingers.
    const band = CONFIG.HEIGHT * 0.35;
    const s = this.y < band ? this.speed : this.speed * 0.35;
    this.y += s * dt;
  }
  // Aimed shot toward the player's current position.
  _fire() {
    const p = this.scene.player;
    if (!p || !p.active) { super._fire(); return; }
    const ang = Math.atan2(p.y - this.y, p.x - this.x);
    const spd = this.bulletSpeed;
    this._emitBullet(Math.cos(ang) * spd, Math.sin(ang) * spd);
  }
}
