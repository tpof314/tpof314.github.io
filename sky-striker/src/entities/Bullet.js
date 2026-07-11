/* ============================================================
   Bullet — player projectile, designed for object pooling.
   Bullets are created once into a Group and recycled via
   fire()/deactivate() instead of being destroyed/recreated.
   ============================================================ */

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.damage = 1;
  }

  // Launch this bullet from (x,y) travelling along a velocity vector.
  fire(x, y, velocityX, velocityY, damage) {
    this.damage = damage;
    this.enableBody(true, x, y, true, true);
    this.setVelocity(velocityX, velocityY);
    this.setActive(true);
    this.setVisible(true);
    // Angle the sprite to match travel direction (bullets are drawn pointing up)
    this.setRotation(Math.atan2(velocityY, velocityX) + Math.PI / 2);
  }

  deactivate() {
    this.disableBody(true, true);
    this.setActive(false);
    this.setVisible(false);
  }

  // Recycle once the bullet leaves the play field.
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y < -20 || this.y > CONFIG.HEIGHT + 20 ||
        this.x < -20 || this.x > CONFIG.WIDTH + 20) {
      this.deactivate();
    }
  }
}
