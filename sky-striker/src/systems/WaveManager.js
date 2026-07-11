/* ============================================================
   WaveManager — drives one stage's worth of enemy waves.
   Schedules all spawns up front via timers, then reports the
   stage cleared once every wave has spawned AND every enemy is
   gone. GameScene calls checkClear() whenever an enemy is
   removed so the "kill everything" gate resolves promptly.

   NEXT PHASE: instead of clearing immediately, the final wave
   will trigger a boss; the boss's death then clears the stage.
   ============================================================ */

const ENEMY_CLASSES = { grunt: Grunt, weaver: Weaver, gunner: Gunner };

class WaveManager {
  constructor(scene, stage) {
    this.scene = scene;
    this.stage = stage;
    this.waves = buildStageWaves(stage);
    this.spawnsPending = 0;
    this.allQueued = false;
    this._cleared = false;
    this._timers = [];
    this._queueWaves();
  }

  _queueWaves() {
    let t = 0;
    const margin = 44;

    this.waves.forEach((wave) => {
      t += wave.delay;
      wave.spawns.forEach((spawn) => {
        // Fixed column for 'stream' patterns, chosen once per spawn group.
        spawn._streamX = Phaser.Math.Between(margin, CONFIG.WIDTH - margin);
        for (let i = 0; i < spawn.count; i++) {
          this.spawnsPending++;
          const at = t + i * spawn.gap;
          const idx = i, cnt = spawn.count;
          const timer = this.scene.time.delayedCall(at, () => {
            this._spawnOne(spawn, idx, cnt, margin);
            this.spawnsPending--;
            this.checkClear();
          });
          this._timers.push(timer);
        }
      });
      // Advance the clock past this wave's own spawn duration.
      const waveDur = Math.max(0, ...wave.spawns.map((s) => (s.count - 1) * s.gap));
      t += waveDur;
    });

    this.allQueued = true;
  }

  _spawnOne(spawn, i, count, margin) {
    const W = CONFIG.WIDTH;
    let x;
    switch (spawn.pattern) {
      case 'spread': x = ((i + 1) / (count + 1)) * W; break;
      case 'stream': x = spawn._streamX; break;
      case 'vform':  x = W / 2 + (i - (count - 1) / 2) * 42; break;
      case 'center': x = W / 2; break;
      case 'random':
      default:       x = Phaser.Math.Between(margin, W - margin); break;
    }
    x = Phaser.Math.Clamp(x, margin, W - margin);

    const Cls = ENEMY_CLASSES[spawn.type];
    const enemy = new Cls(this.scene, x, -30);
    enemy.spawn(this.stage);
    this.scene.enemies.add(enemy);
  }

  // Called after each spawn and whenever an enemy is removed.
  checkClear() {
    if (this._cleared || !this.allQueued) return;
    if (this.spawnsPending > 0) return;
    if (this.scene.enemies.countActive(true) > 0) return;
    this._cleared = true;
    this.scene.onStageCleared();
  }

  destroy() {
    this._timers.forEach((t) => t && t.remove(false));
    this._timers = [];
  }
}
