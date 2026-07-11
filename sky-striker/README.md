# Sky Striker — Phaser 3 Project Scaffold

A lightweight, mobile-first vertical arcade shoot-'em-up. This is the
**project setup / runnable skeleton** — the foundation is in place and
playable; enemies, power-ups, and bosses attach to it in the next phase.

## Run it

**Fastest (desktop):** double-click `index.html` — it opens in your browser
and runs. No build step, no install. (Requires an internet connection the
first time so Phaser can load from its CDN.)

**Recommended (for mobile testing):** serve the folder over a local web
server, then open the URL on your phone (same Wi-Fi):

```bash
# from inside the sky-striker/ folder, pick one:
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://<your-computer-ip>:8000` on your phone.

> Phaser is loaded from a CDN and all art is generated procedurally in code,
> so there are **no asset files to download** and nothing to bundle.

## What works right now

- Responsive **portrait** scaling (FIT + center) for any phone/desktop screen
- Scene flow: **Boot → Preload (loading bar) → Title → Game → Game Over/Victory**
- **Unified pointer control**: jet follows the mouse on desktop and the finger
  on mobile (lifted above the fingertip), with smooth easing and bounds clamp
- **Auto-fire** with the full **5-level weapon pattern** table wired in
- **Weapon-level decay timer** (drops a level after ~25s without a pickup)
- **Three enemy archetypes**: Grunt (dives + straight shots), Weaver (sine-wave,
  evasive), Gunner (slow, fires *aimed* shots, drops power-ups)
- **Data-driven wave manager**: 5 waves per stage, escalating enemy count /
  speed / health per stage; "clear everything" gates stage completion
- **Power-ups** dropped by Gunners: Weapon-up, Shield (absorbs hits), Score
- **Collisions**: bullets↔enemies, ram damage, enemy-bullets↔player, pickups
- **Tiered explosions**: procedural bursts + shockwave ring + camera shake,
  sized by what died (small/medium/large)
- **Shield** system with a visible bubble around the ship
- **Stage progression** across all 5 stages → Victory screen
- **Bosses** — 5 unique bosses (distinct silhouettes), one per stage. Each
  slides in, sweeps/hovers, and runs a **3-phase attack script** (phases at
  100%/66%/33% HP) layering patterns like spread, aimed volleys, radial rings,
  rotating spirals and falling barrages. A **boss health bar** shows in the HUD,
  and a **staggered explosion death sequence** (with flash + shake) clears the
  stage. Clearing the final boss triggers Victory.
- **Parallax starfield**, engine thrust particles, persisted mute + high score
- **HUD**: health bar, score, stage, weapon level, shield count, boss bar
- **Crash overlay** + safe storage for cross-browser resilience

## Project structure

```
sky-striker/
├── index.html
├── css/style.css
├── README.md
└── src/
    ├── config.js           # ALL tuning (enemies, waves, powerups, bosses...)
    ├── main.js
    ├── data/stages.js      # per-stage wave definitions
    ├── entities/
    │   ├── Bullet.js  EnemyBullet.js  Enemy.js
    │   ├── enemies/ Grunt.js  Weaver.js  Gunner.js
    │   ├── PowerUp.js  Boss.js  Player.js
    ├── systems/
    │   ├── Background.js  TextureFactory.js  Explosions.js
    │   ├── WaveManager.js  Storage.js
    └── scenes/
        ├── BootScene.js  PreloadScene.js  TitleScene.js
        ├── GameScene.js  HUDScene.js      GameOverScene.js
```

## Next phase

1. **SFX** — shoot / explosion / power-up / boss-hit / boss-death (mute toggle
   already wired; audio was intentionally deferred)
2. Optional polish: per-boss intro cards, distinct boss movement flourishes,
   enemy object-pooling if profiling shows GC pressure

## Tuning

Open `src/config.js` — fire rates, weapon patterns' feel, decay timer,
follow easing, touch offset, health, and colors are all there.
