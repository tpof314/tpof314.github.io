/* ============================================================
   TitleScene — start screen. Start button + mute toggle.
   Also shows the persisted high score.
   ============================================================ */

class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    const cx = CONFIG.WIDTH / 2;
    this.bg = new Background(this);

    this.add.text(cx, 200, 'SKY', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '72px', color: '#eaf2ff',
    }).setOrigin(0.5);
    this.add.text(cx, 268, 'STRIKER', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '56px', color: CONFIG.colors.uiAccent,
    }).setOrigin(0.5);

    const hi = this.registry.get('highScore') || 0;
    this.add.text(cx, 330, 'HIGH SCORE  ' + hi.toString().padStart(6, '0'), {
      fontFamily: 'monospace', fontSize: '16px', color: '#8fb7d6',
    }).setOrigin(0.5);

    // --- Start button ---
    const btn = this.add.container(cx, 470);
    const bw = 220, bh = 60;
    const g = this.add.graphics();
    g.fillStyle(0x35d0ff, 1);
    g.fillRoundedRect(-bw / 2, -bh / 2, bw, bh, 12);
    const label = this.add.text(0, 0, 'TAP TO START', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '22px', color: '#08111f',
    }).setOrigin(0.5);
    btn.add([g, label]);
    btn.setSize(bw, bh);
    btn.setInteractive(new Phaser.Geom.Rectangle(-bw / 2, -bh / 2, bw, bh), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', () => this.scene.start('Game'));

    // Gentle pulse to draw the eye
    this.tweens.add({ targets: btn, scale: 1.05, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // --- Mute toggle (top-right) ---
    this.muteLabel = this.add.text(CONFIG.WIDTH - 16, 20, '', {
      fontFamily: 'monospace', fontSize: '20px', color: '#eaf2ff',
    }).setOrigin(1, 0).setInteractive();
    this._refreshMute();
    this.muteLabel.on('pointerdown', () => {
      const m = !this.registry.get('muted');
      this.registry.set('muted', m);
      this.sound.setMute(m);
      SafeStorage.set(CONFIG.storage.muted, m);
      this._refreshMute();
    });

    this.add.text(cx, CONFIG.HEIGHT - 40,
      'Drag to move  \u2022  Auto-fire  \u2022  Survive 5 stages', {
      fontFamily: 'monospace', fontSize: '13px', color: '#6f93b3',
    }).setOrigin(0.5);

    // Build stamp — confirms which version is loaded (catch stale caches)
    this.add.text(CONFIG.WIDTH - 8, CONFIG.HEIGHT - 8, 'build ' + CONFIG.version, {
      fontFamily: 'monospace', fontSize: '10px', color: '#3f5a72',
    }).setOrigin(1, 1);
  }

  _refreshMute() {
    this.muteLabel.setText(this.registry.get('muted') ? '\u{1F507} SFX OFF' : '\u{1F50A} SFX ON');
  }

  update(_, delta) { this.bg.update(delta); }
}
