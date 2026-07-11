/* ============================================================
   Stage wave definitions.
   buildStageWaves(stage) returns an ordered list of waves for a
   given stage, with enemy counts scaled by that stage's density.
   Each wave: { delay, spawns:[ {type,count,gap,pattern} ] }.
   Patterns: 'spread' | 'stream' | 'vform' | 'random' | 'center'.
   Kept data-light: the shape of the stage is authored here, the
   difficulty ramp comes from CONFIG.stageScaling.
   ============================================================ */

function buildStageWaves(stage) {
  const d = (CONFIG.stageScaling[stage] || { density: 1 }).density;
  const n = (c) => Math.max(1, Math.round(c * d));

  return [
    { delay: 700,  spawns: [
        { type: 'grunt',  count: n(5), gap: 350, pattern: 'spread' } ] },

    { delay: 1200, spawns: [
        { type: 'weaver', count: n(4), gap: 450, pattern: 'stream' } ] },

    { delay: 1300, spawns: [
        { type: 'grunt',  count: n(4), gap: 300, pattern: 'vform'  },
        { type: 'gunner', count: n(1), gap: 0,   pattern: 'center' } ] },

    { delay: 1400, spawns: [
        { type: 'weaver', count: n(3), gap: 420, pattern: 'spread' },
        { type: 'grunt',  count: n(4), gap: 300, pattern: 'random' } ] },

    { delay: 1500, spawns: [
        { type: 'gunner', count: n(2), gap: 900, pattern: 'spread' },
        { type: 'grunt',  count: n(5), gap: 250, pattern: 'random' } ] },
  ];
}
