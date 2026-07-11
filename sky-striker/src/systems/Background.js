/* ============================================================
   Background — parallax scrolling starfield.
   Multiple layers scroll downward at different speeds to sell
   forward flight. Stars wrap around when they leave the screen.
   Pure procedural; no image assets required.
   ============================================================ */

class Background {
  constructor(scene) {
    this.scene = scene;
    this.layers = [];

    CONFIG.starLayers.forEach((cfg, i) => {
      const stars = [];
      for (let n = 0; n < cfg.count; n++) {
        const s = scene.add.image(
          Phaser.Math.Between(0, CONFIG.WIDTH),
          Phaser.Math.Between(0, CONFIG.HEIGHT),
          'star'
        );
        s.setScale(cfg.size);
        s.setAlpha(cfg.alpha);
        s.setDepth(-100 + i); // always behind gameplay
        stars.push(s);
      }
      this.layers.push({ stars, speed: cfg.speed });
    });
  }

  update(delta) {
    const dt = delta / 1000;
    for (const layer of this.layers) {
      for (const s of layer.stars) {
        s.y += layer.speed * dt;
        if (s.y > CONFIG.HEIGHT + 4) {
          s.y = -4;
          s.x = Phaser.Math.Between(0, CONFIG.WIDTH);
        }
      }
    }
  }
}
