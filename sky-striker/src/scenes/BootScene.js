/* ============================================================
   BootScene — first scene. Sets up global defaults and the
   persisted mute preference, then hands off to PreloadScene.
   ============================================================ */

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    console.log('Sky Striker — build ' + CONFIG.version);

    // Restore persisted preferences
    const muted = SafeStorage.get(CONFIG.storage.muted) === 'true';
    this.registry.set('muted', muted);
    this.sound.setMute(muted);
    SFX.setMuted(muted);

    const hi = parseInt(SafeStorage.get(CONFIG.storage.highScore, '0'), 10);
    this.registry.set('highScore', hi);

    this.scene.start('Preload');
  }
}
