/* ============================================================
   GameOverScene — final score + retry. Also the place the
   Victory screen (after stage 5) will branch to / share styling.
   ============================================================ */

class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }

  create() {
    const cx = CONFIG.WIDTH / 2;
    this.bg = new Background(this);

    const won = this.registry.get('outcome') === 'win';
    this.add.text(cx, 240, won ? 'VICTORY!' : 'GAME OVER', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '48px',
      color: won ? '#38e08a' : '#ff5b5b',
    }).setOrigin(0.5);

    if (won) {
      this.add.text(cx, 292, 'All 5 stages cleared', {
        fontFamily: 'monospace', fontSize: '14px', color: '#8fb7d6',
      }).setOrigin(0.5);
    }

    const score = this.registry.get('score') || 0;
    const hi = this.registry.get('highScore') || 0;

    this.add.text(cx, 330, 'SCORE  ' + score.toString().padStart(6, '0'), {
      fontFamily: 'monospace', fontSize: '20px', color: '#eaf2ff',
    }).setOrigin(0.5);
    this.add.text(cx, 362, 'BEST   ' + hi.toString().padStart(6, '0'), {
      fontFamily: 'monospace', fontSize: '20px', color: '#8fb7d6',
    }).setOrigin(0.5);

    // Retry button
    const bw = 200, bh = 56;
    const btn = this.add.container(cx, 470);
    const g = this.add.graphics();
    g.fillStyle(0x35d0ff, 1);
    g.fillRoundedRect(-bw / 2, -bh / 2, bw, bh, 12);
    const label = this.add.text(0, 0, 'RETRY', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '22px', color: '#08111f',
    }).setOrigin(0.5);
    btn.add([g, label]);
    btn.setInteractive(new Phaser.Geom.Rectangle(-bw / 2, -bh / 2, bw, bh), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', () => this.scene.start('Game'));

    this.add.text(cx, CONFIG.HEIGHT - 60, 'Tap RETRY to fly again', {
      fontFamily: 'monospace', fontSize: '13px', color: '#6f93b3',
    }).setOrigin(0.5);
  }

  update(_, delta) { this.bg.update(delta); }
}
