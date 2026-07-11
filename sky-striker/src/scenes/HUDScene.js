/* ============================================================
   HUDScene — overlay drawn on top of GameScene. Reads shared
   run state from the registry and redraws each frame.
   ============================================================ */

class HUDScene extends Phaser.Scene {
  constructor() { super('HUD'); }

  create() {
    const pad = 14;

    // Health bar
    this.hpBack = this.add.graphics();
    this.hpFill = this.add.graphics();
    this.hpLabel = this.add.text(pad, pad - 2, 'HP', {
      fontFamily: 'monospace', fontSize: '12px', color: '#cfe4f5',
    });

    // Score (top-right)
    this.scoreText = this.add.text(CONFIG.WIDTH - pad, pad, '', {
      fontFamily: 'monospace', fontSize: '18px', color: '#eaf2ff',
    }).setOrigin(1, 0);

    // Stage + weapon level (bottom strip)
    this.stageText = this.add.text(pad, CONFIG.HEIGHT - pad, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#8fb7d6',
    }).setOrigin(0, 1);
    this.wpnText = this.add.text(CONFIG.WIDTH - pad, CONFIG.HEIGHT - pad, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#ffe14d',
    }).setOrigin(1, 1);

    // Shield indicator (only shown when a shield is active)
    this.shieldText = this.add.text(CONFIG.WIDTH / 2, pad, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#35d0ff',
    }).setOrigin(0.5, 0);

    // Boss health bar (hidden unless a boss is active)
    this.bossName = this.add.text(CONFIG.WIDTH / 2, 40, '', {
      fontFamily: 'Arial Black, sans-serif', fontSize: '13px', color: '#ffd7d7',
    }).setOrigin(0.5, 0).setVisible(false);
    this.bossBarBg = this.add.graphics();
    this.bossBarFill = this.add.graphics();
  }

  update() {
    const r = this.registry;
    const hp = r.get('health') || 0;
    const maxHp = r.get('maxHealth') || 100;
    const frac = Phaser.Math.Clamp(hp / maxHp, 0, 1);

    // Health bar geometry
    const x = 40, y = 12, w = 150, h = 14;
    this.hpBack.clear();
    this.hpBack.fillStyle(0x11213a, 1);
    this.hpBack.fillRoundedRect(x, y, w, h, 6);

    let col = CONFIG.colors.hpGood;
    if (frac < 0.3) col = CONFIG.colors.hpLow;
    else if (frac < 0.6) col = CONFIG.colors.hpMid;

    this.hpFill.clear();
    this.hpFill.fillStyle(col, 1);
    if (frac > 0) this.hpFill.fillRoundedRect(x + 2, y + 2, (w - 4) * frac, h - 4, 4);

    const score = r.get('score') || 0;
    this.scoreText.setText(score.toString().padStart(6, '0'));
    this.stageText.setText('STAGE ' + (r.get('stage') || 1) + ' / ' + CONFIG.totalStages);
    this.wpnText.setText('WPN Lv.' + (r.get('weaponLevel') || 1));

    const shield = r.get('shield') || 0;
    this.shieldText.setText(shield > 0 ? 'SHIELD x' + shield : '');

    // Boss health bar
    const bossActive = r.get('bossActive');
    this.bossName.setVisible(!!bossActive);
    this.bossBarBg.clear();
    this.bossBarFill.clear();
    if (bossActive) {
      const bx = 30, by = 60, bw = CONFIG.WIDTH - 60, bh = 12;
      const bfrac = Phaser.Math.Clamp(
        (r.get('bossHealth') || 0) / (r.get('bossMaxHealth') || 1), 0, 1);
      this.bossName.setText(r.get('bossName') || 'BOSS');
      this.bossBarBg.fillStyle(0x2a1020, 1);
      this.bossBarBg.fillRoundedRect(bx, by, bw, bh, 5);
      this.bossBarFill.fillStyle(0xff5b5b, 1);
      if (bfrac > 0) this.bossBarFill.fillRoundedRect(bx + 2, by + 2, (bw - 4) * bfrac, bh - 4, 3);
    }
  }
}
