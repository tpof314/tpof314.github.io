/* ============================================================
   PreloadScene — shows a loading bar and prepares all art.
   For now art is generated procedurally (instant). This scene
   is also where real sprite sheets and SFX will be loaded via
   this.load.* in the next phase; the progress bar already
   reflects load progress for when that happens.
   ============================================================ */

class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }

  preload() {
    const cx = CONFIG.WIDTH / 2;
    const cy = CONFIG.HEIGHT / 2;

    this.add.text(cx, cy - 60, 'SKY STRIKER', {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '34px',
      color: CONFIG.colors.uiAccent,
    }).setOrigin(0.5);

    // Loading bar frame + fill
    const barW = 240, barH = 16;
    const frame = this.add.graphics();
    frame.lineStyle(2, 0x35d0ff, 1);
    frame.strokeRoundedRect(cx - barW / 2, cy, barW, barH, 8);
    const fill = this.add.graphics();

    this.load.on('progress', (p) => {
      fill.clear();
      fill.fillStyle(0x35d0ff, 1);
      fill.fillRoundedRect(cx - barW / 2 + 3, cy + 3, (barW - 6) * p, barH - 6, 5);
    });

    // --- Real asset loading goes here later, e.g.: ---
    // this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth:64, frameHeight:64});
    // this.load.audio('shoot', 'assets/sfx/shoot.mp3');

    // Tiny dummy delay so the bar is visible even with no real assets yet.
    for (let i = 0; i < 12; i++) {
      this.load.image('dummy' + i, this._blankDataURI());
    }
  }

  create() {
    TextureFactory.generateAll(this);
    this.time.delayedCall(150, () => this.scene.start('Title'));
  }

  _blankDataURI() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMCAQD3rD0nAAAAAElFTkSuQmCC';
  }
}
