/* ============================================================
   EnemyBullet — pooled projectile fired by enemies.
   Travels along a velocity vector; recycled off-screen.
   ============================================================ */

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyBullet');
    this.damage = CONFIG.enemyBullet.damage;
  }

  fire(x, y, vx, vy) {
    this.enableBody(true, x, y, true, true);
    this.setVelocity(vx, vy);
    this.setActive(true);
    this.setVisible(true);
  }

  deactivate() {
    this.disableBody(true, true);
    this.setActive(false);
    this.setVisible(false);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y < -20 || this.y > CONFIG.HEIGHT + 20 ||
        this.x < -20 || this.x > CONFIG.WIDTH + 20) {
      this.deactivate();
    }
  }
}
