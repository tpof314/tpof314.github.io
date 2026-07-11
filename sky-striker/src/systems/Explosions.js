/* ============================================================
   Explosions — tiered procedural burst effects.
   No sprite sheets required: each explosion = a particle burst
   + an expanding shockwave ring, scaled by size. Larger sizes
   add camera shake. Sizes: 'small' | 'medium' | 'large' | 'boss'.

   (When real explosion sprite sheets are added later, swap the
   internals of play() for an animated sprite; call sites stay.)
   ============================================================ */

class Explosions {
  constructor(scene) {
    this.scene = scene;

    // One reusable particle emitter (spark texture), emitting on demand.
    this.emitter = scene.add.particles(0, 0, 'spark', {
      speed: { min: 60, max: 240 },
      lifespan: { min: 250, max: 550 },
      scale: { start: 1, end: 0 },
      alpha: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false,
    });
    this.emitter.setDepth(20);

    this.presets = {
      small:  { count: 8,  ringScale: 1.2, ringMs: 260, tint: 0xffd36b, shake: 0 },
      medium: { count: 16, ringScale: 2.0, ringMs: 340, tint: 0xffa23e, shake: 0.004 },
      large:  { count: 26, ringScale: 3.0, ringMs: 420, tint: 0xff6b3e, shake: 0.008 },
      boss:   { count: 46, ringScale: 4.5, ringMs: 600, tint: 0xff5b5b, shake: 0.02 },
    };
  }

  play(x, y, size = 'small', tintOverride) {
    const p = this.presets[size] || this.presets.small;
    const tint = tintOverride != null ? tintOverride : p.tint;

    // Particle burst
    this.emitter.setParticleTint(tint);
    this.emitter.emitParticleAt(x, y, p.count);

    // Expanding shockwave ring
    const ring = this.scene.add.image(x, y, 'ring').setDepth(19);
    ring.setTint(tint);
    ring.setScale(0.2);
    this.scene.tweens.add({
      targets: ring,
      scale: p.ringScale,
      alpha: 0,
      duration: p.ringMs,
      ease: 'Cubic.out',
      onComplete: () => ring.destroy(),
    });

    // Camera shake for bigger blasts
    if (p.shake > 0) this.scene.cameras.main.shake(180, p.shake);

    // Hook: this.scene.sfx('explosion'); <- when SFX assets land
  }
}
