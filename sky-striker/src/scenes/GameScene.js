/* ============================================================
   GameScene — the core loop.
   Wires background, player, enemy waves, power-ups, collisions,
   explosions, scoring, and stage progression.

   NEXT PHASE: onStageCleared currently advances straight to the
   next stage. That is where the boss fight will be inserted:
   final wave -> spawn boss -> boss death -> onStageCleared.
   ============================================================ */

class GameScene extends Phaser.Scene {
  constructor() { super('Game'); }

  create() {
    this._startRun();

    this.bg = new Background(this);
    this.explosions = new Explosions(this);

    // --- Player ---
    const px = CONFIG.WIDTH / 2;
    const py = CONFIG.HEIGHT * CONFIG.player.startYFactor;
    this.player = new Player(this, px, py);

    // --- Groups ---
    this.enemies = this.physics.add.group();
    this.enemyBullets = this.physics.add.group({
      classType: EnemyBullet,
      maxSize: CONFIG.enemyBullet.poolSize,
      runChildUpdate: true,
    });
    this.powerups = this.physics.add.group();

    // --- Collisions ---
    this.physics.add.overlap(this.player.bullets, this.enemies, this._bulletHitsEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this._playerHitsEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemyBullets, this._enemyBulletHitsPlayer, null, this);
    this.physics.add.overlap(this.player, this.powerups, this._collectPowerup, null, this);

    // --- Input (unified pointer) ---
    this.input.on('pointermove', (p) => this.player.setTargetFromPointer(p));
    this.input.on('pointerdown', (p) => this.player.setTargetFromPointer(p));

    // --- HUD overlay ---
    this.scene.launch('HUD');

    // --- Events ---
    this.events.once('player-dead', () => this._endRun('lose'));
    this.events.on('enemy-removed', () => this.waveManager && this.waveManager.checkClear());
    this.events.once('shutdown', () => this._cleanup());

    // --- Start stage 1 ---
    this._startStage(1);
  }

  // ---- Run / stage lifecycle -------------------------------

  _startRun() {
    this.registry.set('score', 0);
    this.registry.set('stage', 1);
    this.registry.set('health', CONFIG.player.startHealth);
    this.registry.set('maxHealth', CONFIG.player.maxHealth);
    this.registry.set('weaponLevel', CONFIG.weapon.startLevel);
    this.registry.set('shield', 0);
    this.registry.set('outcome', null);
  }

  _startStage(stage) {
    this.registry.set('stage', stage);
    if (this.waveManager) this.waveManager.destroy();
    this.waveManager = new WaveManager(this, stage);
    this._banner('STAGE ' + stage);
  }

  onStageCleared() {
    const stage = this.registry.get('stage') || 1;

    // >>> BOSS HOOK: spawn the stage boss here instead of advancing. <<<

    if (stage >= CONFIG.totalStages) {
      this._endRun('win');
      return;
    }
    this._banner('STAGE CLEAR', () => this._startStage(stage + 1));
  }

  // ---- Collision handlers ----------------------------------

  _bulletHitsEnemy(bullet, enemy) {
    if (!bullet.active || !enemy.active) return;
    bullet.deactivate();
    enemy.takeDamage(bullet.damage);
  }

  _playerHitsEnemy(player, enemy) {
    if (!enemy.active) return;
    player.takeDamage(enemy.contactDamage, this.time.now);
    enemy.die(); // ramming destroys the enemy (and triggers its kill effects)
  }

  _enemyBulletHitsPlayer(player, bullet) {
    if (!bullet.active) return;
    bullet.deactivate();
    player.takeDamage(bullet.damage, this.time.now);
  }

  _collectPowerup(player, pu) {
    if (!pu.active) return;
    const type = pu.type;
    pu.destroy();
    this.explosions.play(player.x, player.y - 20, 'small', CONFIG.colors[
      type === 'weapon' ? 'pwWeapon' : type === 'shield' ? 'pwShield' : 'pwScore']);

    if (type === 'weapon')      { player.upgradeWeapon(); this._popup(player.x, player.y - 30, 'WEAPON UP'); }
    else if (type === 'shield') { player.addShield(CONFIG.powerup.shieldHits); this._popup(player.x, player.y - 30, 'SHIELD'); }
    else                        { this.addScore(CONFIG.powerup.scoreValue); this._popup(player.x, player.y - 30, '+' + CONFIG.powerup.scoreValue); }
    // Hook: this.sfx('powerup');
  }

  // ---- Called by Enemy.die() -------------------------------

  onEnemyKilled(enemy) {
    this.addScore(enemy.score);
    const sizeByType = { grunt: 'small', weaver: 'medium', gunner: 'large' };
    this.explosions.play(enemy.x, enemy.y, sizeByType[enemy.typeKey] || 'small', enemy.tintTopLeft);
    if (enemy.base.dropsPowerup) this._dropPowerup(enemy.x, enemy.y);
  }

  _dropPowerup(x, y) {
    const w = CONFIG.powerup.weights;
    const r = Math.random();
    let type = 'score';
    if (r < w.weapon) type = 'weapon';
    else if (r < w.weapon + w.shield) type = 'shield';
    const pu = new PowerUp(this, x, y, type);
    this.powerups.add(pu);
  }

  // ---- Helpers ---------------------------------------------

  addScore(points) {
    this.registry.set('score', (this.registry.get('score') || 0) + points);
  }

  _banner(text, onDone) {
    const t = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, text, {
      fontFamily: 'Arial Black, sans-serif', fontSize: '40px', color: '#eaf2ff',
    }).setOrigin(0.5).setDepth(30).setAlpha(0);
    this.tweens.add({
      targets: t, alpha: 1, duration: 300, yoyo: true, hold: 700,
      onComplete: () => { t.destroy(); if (onDone) onDone(); },
    });
  }

  _popup(x, y, text) {
    const t = this.add.text(x, y, text, {
      fontFamily: 'monospace', fontSize: '14px', color: '#ffe14d',
    }).setOrigin(0.5).setDepth(25);
    this.tweens.add({ targets: t, y: y - 30, alpha: 0, duration: 700,
                      onComplete: () => t.destroy() });
  }

  _endRun(outcome) {
    const score = this.registry.get('score') || 0;
    const hi = this.registry.get('highScore') || 0;
    if (score > hi) {
      this.registry.set('highScore', score);
      SafeStorage.set(CONFIG.storage.highScore, score);
    }
    this.registry.set('outcome', outcome);
    this._cleanup();
    this.scene.stop('HUD');
    this.scene.start('GameOver');
  }

  _cleanup() {
    if (this.waveManager) { this.waveManager.destroy(); this.waveManager = null; }
  }

  update(_, delta) {
    this.bg.update(delta);
    const ptr = this.input.activePointer;
    if (ptr.isDown || ptr.wasTouch) this.player.setTargetFromPointer(ptr);
  }
}
