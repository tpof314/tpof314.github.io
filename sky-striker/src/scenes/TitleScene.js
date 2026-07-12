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

    // --- Difficulty selection ---
    this.add.text(cx, 386, 'SELECT DIFFICULTY', {
      fontFamily: 'monospace', fontSize: '14px', color: '#8fb7d6',
    }).setOrigin(0.5);

    const startY = 428, gap = 74;
    CONFIG.difficultyOrder.forEach((key, i) => {
      this._makeDifficultyButton(cx, startY + i * gap, key, key === Difficulty.current);
    });

    // --- Mute toggle (top-right) ---
    this.muteLabel = this.add.text(CONFIG.WIDTH - 16, 20, '', {
      fontFamily: 'monospace', fontSize: '20px', color: '#eaf2ff',
    }).setOrigin(1, 0).setInteractive();
    this._refreshMute();
    this.muteLabel.on('pointerdown', () => {
      const m = !this.registry.get('muted');
      this.registry.set('muted', m);
      this.sound.setMute(m);
      SFX.unlock();
      SFX.setMuted(m);
      if (!m) SFX.uiClick(); // audible confirmation when turning sound on
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

  // One difficulty button: coloured pill, label + description, tap to start.
  _makeDifficultyButton(cx, y, key, isCurrent) {
    const cfg = CONFIG.difficulties[key];
    const bw = 260, bh = 60;
    const c = this.add.container(cx, y);

    const g = this.add.graphics();
    g.fillStyle(cfg.color, 1);
    g.fillRoundedRect(-bw / 2, -bh / 2, bw, bh, 12);
    if (isCurrent) { // highlight the last-picked level
      g.lineStyle(3, 0xffffff, 1);
      g.strokeRoundedRect(-bw / 2, -bh / 2, bw, bh, 12);
    }
    const label = this.add.text(-bw / 2 + 20, -10, cfg.label, {
      fontFamily: 'Arial Black, sans-serif', fontSize: '22px', color: '#08111f',
    }).setOrigin(0, 0.5);
    const desc = this.add.text(-bw / 2 + 20, 14, cfg.desc, {
      fontFamily: 'monospace', fontSize: '12px', color: '#0b1a2b',
    }).setOrigin(0, 0.5);
    const chevron = this.add.text(bw / 2 - 22, 0, '\u25B6', {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#08111f',
    }).setOrigin(0.5);

    c.add([g, label, desc, chevron]);
    c.setSize(bw, bh);
    c.setInteractive(new Phaser.Geom.Rectangle(-bw / 2, -bh / 2, bw, bh), Phaser.Geom.Rectangle.Contains);
    c.on('pointerdown', () => {
      SFX.unlock();       // start audio within the user gesture (browsers require this)
      SFX.uiClick();
      Difficulty.set(key);
      this.scene.start('Game');
    });
    // Tap feedback
    c.on('pointerover', () => c.setScale(1.04));
    c.on('pointerout', () => c.setScale(1.0));
    return c;
  }

  _refreshMute() {
    this.muteLabel.setText(this.registry.get('muted') ? '\u{1F507} SFX OFF' : '\u{1F50A} SFX ON');
  }

  update(_, delta) { this.bg.update(delta); }
}
