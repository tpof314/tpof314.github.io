/* ============================================================
   TextureFactory — generates all game art procedurally.
   Flat vector / cartoon shapes drawn with Graphics and baked
   into GPU textures once at load. This keeps the project
   zero-asset and instantly runnable. When real sprite sheets
   arrive later, they load in PreloadScene and these are dropped.

   Enemies are drawn in a NEUTRAL white/gray so they can be
   tinted per-stage at runtime via setTint (re-skin cheaply).
   ============================================================ */

const TextureFactory = {
  generateAll(scene) {
    this._player(scene);
    this._bullet(scene);
    this._enemyBullet(scene);
    this._grunt(scene);
    this._weaver(scene);
    this._gunner(scene);
    this._dot(scene, 'star', CONFIG.colors.star, 3);
    this._dot(scene, 'spark', 0xffffff, 6);
    this._ring(scene);
    this._powerups(scene);
    this._bosses(scene);
  },

  _player(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const w = 40, h = 46;
    g.fillStyle(CONFIG.colors.playerDark, 1);
    g.fillTriangle(2, h * 0.72, w * 0.5, h * 0.35, w - 2, h * 0.72);
    g.fillStyle(CONFIG.colors.player, 1);
    g.fillTriangle(w * 0.5, 0, w * 0.30, h, w * 0.70, h);
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(w * 0.5, h * 0.42, 4);
    g.generateTexture('player', w, h);
    g.destroy();
  },

  _bullet(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const w = 6, h = 16;
    g.fillStyle(CONFIG.colors.bullet, 1);
    g.fillRoundedRect(0, 0, w, h, 3);
    g.fillStyle(0xffffff, 0.9);
    g.fillRoundedRect(1.5, 1.5, w - 3, 5, 2);
    g.generateTexture('bullet', w, h);
    g.destroy();
  },

  _enemyBullet(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const r = 6;
    g.fillStyle(CONFIG.colors.enemyBullet, 1);
    g.fillCircle(r, r, r);
    g.fillStyle(0xffffff, 0.85);
    g.fillCircle(r, r - 1.5, r * 0.45);
    g.generateTexture('enemyBullet', r * 2, r * 2);
    g.destroy();
  },

  // Enemies drawn pointing DOWN (toward the player) in neutral white.
  _grunt(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const s = CONFIG.enemies.grunt.size;
    g.fillStyle(0xffffff, 1);
    // wings
    g.fillTriangle(2, s * 0.28, s * 0.5, s * 0.62, s - 2, s * 0.28);
    // body pointing down
    g.fillTriangle(s * 0.5, s, s * 0.30, 0, s * 0.70, 0);
    g.fillStyle(0x1b2338, 1);
    g.fillCircle(s * 0.5, s * 0.5, 3.5);
    g.generateTexture('grunt', s, s);
    g.destroy();
  },

  _weaver(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const s = CONFIG.enemies.weaver.size;
    g.fillStyle(0xffffff, 1);
    // diamond / dart pointing down
    g.beginPath();
    g.moveTo(s * 0.5, s);
    g.lineTo(0, s * 0.42);
    g.lineTo(s * 0.5, s * 0.16);
    g.lineTo(s, s * 0.42);
    g.closePath();
    g.fillPath();
    g.fillStyle(0x1b2338, 1);
    g.fillCircle(s * 0.5, s * 0.46, 3);
    g.generateTexture('weaver', s, s);
    g.destroy();
  },

  _gunner(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const s = CONFIG.enemies.gunner.size;
    g.fillStyle(0xffffff, 1);
    // bulky hexagon turret
    const cx = s * 0.5, cy = s * 0.5, r = s * 0.46;
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + i * Math.PI / 3;
      const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
      if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.closePath();
    g.fillPath();
    // barrel pointing down
    g.fillStyle(0xffffff, 1);
    g.fillRect(cx - 3, cy, 6, s * 0.5);
    g.fillStyle(0x1b2338, 1);
    g.fillCircle(cx, cy, 5);
    g.generateTexture('gunner', s, s);
    g.destroy();
  },

  _dot(scene, key, color, size) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    g.fillCircle(size, size, size);
    g.generateTexture(key, size * 2, size * 2);
    g.destroy();
  },

  // Stroked ring used for explosion shockwaves (tinted at runtime).
  _ring(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    const s = 64, r = 28;
    g.lineStyle(5, 0xffffff, 1);
    g.strokeCircle(s / 2, s / 2, r);
    g.generateTexture('ring', s, s);
    g.destroy();
  },

  // Three power-up icons: weapon (chevron), shield (ring), score (star-ish).
  _powerups(scene) {
    const box = (g, color) => {
      const s = 28;
      g.fillStyle(0x0e1730, 1);
      g.fillRoundedRect(0, 0, s, s, 6);
      g.lineStyle(2, color, 1);
      g.strokeRoundedRect(1, 1, s - 2, s - 2, 6);
      return s;
    };

    // weapon
    let g = scene.make.graphics({ x: 0, y: 0, add: false });
    let s = box(g, CONFIG.colors.pwWeapon);
    g.fillStyle(CONFIG.colors.pwWeapon, 1);
    g.fillTriangle(s * 0.5, 6, s * 0.24, s * 0.5, s * 0.76, s * 0.5);
    g.fillRect(s * 0.42, s * 0.46, s * 0.16, s * 0.34);
    g.generateTexture('pw_weapon', s, s);
    g.destroy();

    // shield
    g = scene.make.graphics({ x: 0, y: 0, add: false });
    s = box(g, CONFIG.colors.pwShield);
    g.lineStyle(3, CONFIG.colors.pwShield, 1);
    g.strokeCircle(s * 0.5, s * 0.5, s * 0.26);
    g.generateTexture('pw_shield', s, s);
    g.destroy();

    // score
    g = scene.make.graphics({ x: 0, y: 0, add: false });
    s = box(g, CONFIG.colors.pwScore);
    g.fillStyle(CONFIG.colors.pwScore, 1);
    g.fillCircle(s * 0.5, s * 0.5, s * 0.16);
    g.fillStyle(CONFIG.colors.pwScore, 0.5);
    g.fillCircle(s * 0.5, s * 0.5, s * 0.26);
    g.generateTexture('pw_score', s, s);
    g.destroy();
  },

  // Player shield bubble (drawn once, toggled on the player at runtime).
  shieldBubbleKey: 'shieldBubble',

  // Five distinct boss silhouettes, drawn neutral white, tinted at runtime.
  _bosses(scene) {
    const mk = (key, w, h, draw) => {
      const g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1);
      draw(g, w, h);
      g.fillStyle(0x1b2338, 1); // cockpit/core accent
      draw._core && draw._core(g, w, h);
      g.generateTexture(key, w, h);
      g.destroy();
    };

    // boss1 — wide carrier chevron
    mk('boss1', 150, 90, (g, w, h) => {
      g.fillTriangle(0, 20, w / 2, h, w, 20);
      g.fillRect(w * 0.2, 6, w * 0.6, 26);
      g.fillStyle(0x1b2338, 1);
      g.fillCircle(w / 2, 30, 9);
      g.fillStyle(0xffffff, 1);
    });

    // boss2 — hexagonal battlecruiser with side prongs
    mk('boss2', 150, 100, (g, w, h) => {
      const cx = w / 2, cy = h / 2, r = 42;
      g.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + i * Math.PI / 3;
        const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.8;
        i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
      }
      g.closePath(); g.fillPath();
      g.fillTriangle(2, cy - 6, 34, cy - 2, 34, cy + 10);       // left prong
      g.fillTriangle(w - 2, cy - 6, w - 34, cy - 2, w - 34, cy + 10); // right prong
      g.fillStyle(0x1b2338, 1); g.fillCircle(cx, cy, 12);
      g.fillStyle(0xffffff, 1);
    });

    // boss3 — saucer with orbital ring
    mk('boss3', 150, 96, (g, w, h) => {
      const cx = w / 2, cy = h / 2;
      g.fillEllipse(cx, cy, 120, 46);
      g.fillEllipse(cx, cy - 12, 56, 40);
      g.lineStyle(5, 0xffffff, 1);
      g.strokeEllipse(cx, cy + 8, 140, 30);
      g.fillStyle(0x1b2338, 1); g.fillCircle(cx, cy - 12, 12);
      g.fillStyle(0xffffff, 1);
    });

    // boss4 — blocky fortress with turrets
    mk('boss4', 156, 96, (g, w, h) => {
      g.fillRoundedRect(10, 20, w - 20, h - 34, 8);
      g.fillRect(0, 34, 18, 40);       // left tower
      g.fillRect(w - 18, 34, 18, 40);  // right tower
      g.fillRect(w / 2 - 22, 6, 44, 24); // center keep
      g.fillStyle(0x1b2338, 1);
      g.fillRect(24, 40, 16, 16);
      g.fillRect(w - 40, 40, 16, 16);
      g.fillRect(w / 2 - 8, 12, 16, 12);
      g.fillStyle(0xffffff, 1);
    });

    // boss5 — layered mothership
    mk('boss5', 168, 108, (g, w, h) => {
      const cx = w / 2, cy = h / 2;
      g.fillEllipse(cx, cy, 150, 60);
      g.fillTriangle(cx, h, 20, cy + 6, w - 20, cy + 6);
      g.fillEllipse(cx, cy - 14, 70, 46);
      g.fillStyle(0x1b2338, 1);
      g.fillCircle(cx, cy - 12, 16);
      g.fillStyle(0xffffff, 1);
      g.fillCircle(cx - 46, cy, 8);
      g.fillCircle(cx + 46, cy, 8);
    });
  },
};
