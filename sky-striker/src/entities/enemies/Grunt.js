/* Grunt — straight-line dive, occasional straight-down shot. */
class Grunt extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'grunt', CONFIG.enemies.grunt);
    this.typeKey = 'grunt';
  }
  _move(dt) {
    this.y += this.speed * dt;
  }
}
