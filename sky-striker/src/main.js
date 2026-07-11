/* ============================================================
   main.js — instantiates the Phaser game.
   Scale mode FIT + CENTER keeps the portrait play field intact
   and letterboxes on any phone/desktop aspect ratio.

   Render config hardened for cross-browser reliability:
   - failIfMajorPerformanceCaveat:false lets WebGL start on
     Android devices/emulators that would otherwise refuse a
     context (a common "game won't start" cause).
   - A WebGL context-loss handler prevents a lost GPU context
     (seen on macOS Safari) from appearing as a hard freeze.
   ============================================================ */

const game = new Phaser.Game({
  type: Phaser.AUTO,                 // WebGL, with Canvas2D fallback
  width: CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
  backgroundColor: CONFIG.BACKDROP,
  parent: 'game-root',
  disableContextMenu: true,
  scale: {
    mode: Phaser.Scale.FIT,          // preserve aspect, letterbox to fit
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false, fps: 60 },
  },
  render: {
    antialias: true,
    pixelArt: false,
    powerPreference: 'default',
    failIfMajorPerformanceCaveat: false,
  },
  // Cap catch-up work after a stall (tab backgrounded / GC pause) so the
  // physics loop can't enter a spiral-of-death long frame.
  fps: { target: 60, min: 20, forceSetTimeOut: false },
  scene: [
    BootScene,
    PreloadScene,
    TitleScene,
    GameScene,
    HUDScene,
    GameOverScene,
  ],
});

// Expose for debugging and handle WebGL context loss/restore gracefully.
window.game = game;
game.events.once('ready', () => {
  const canvas = game.canvas;
  if (!canvas) return;
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault(); // required so the context can be restored
    console.warn('WebGL context lost — pausing render.');
    if (window.__reportGameError) {
      window.__reportGameError('Graphics context was lost (GPU hiccup). ' +
        'Tap to reload if the screen stays frozen.');
    }
  }, false);
  canvas.addEventListener('webglcontextrestored', () => {
    console.warn('WebGL context restored.');
  }, false);
});
