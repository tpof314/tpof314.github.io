/* ============================================================
   SFX — procedural sound effects via the Web Audio API.
   No audio files: every sound is synthesized at runtime from
   oscillators and filtered noise, matching the project's
   zero-asset, generated-in-code approach.

   Browsers block audio until a user gesture, so unlock() must be
   called from a tap/click (done on the title Start button). All
   play calls are no-ops until then, and no-ops if muted or if the
   browser has no Web Audio support.
   ============================================================ */

const SFX = {
  ctx: null,
  master: null,
  _noiseBuf: null,
  muted: false,
  _lastShoot: 0,
  _lastBossHit: 0,

  _vol() { return CONFIG.sfx.masterVolume; },

  ensureContext() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this._vol();
      this.master.connect(this.ctx.destination);
      this._noiseBuf = this._makeNoise(1.0);
    } catch (e) {
      this.ctx = null;
    }
    return this.ctx;
  },

  // Call from a user gesture (tap/click) to start/resume audio.
  unlock() {
    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(function () {});
  },

  setMuted(m) {
    this.muted = !!m;
    if (this.master) this.master.gain.value = this.muted ? 0 : this._vol();
  },

  _ready() {
    if (this.muted) return null;
    const ctx = this.ensureContext();
    if (!ctx) return null;
    if (ctx.state === 'suspended') ctx.resume().catch(function () {});
    return ctx;
  },

  _makeNoise(seconds) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  },

  // Oscillator with an attack/decay gain envelope and optional pitch ramp.
  _tone(o) {
    const ctx = this._ready();
    if (!ctx) return;
    const t0 = ctx.currentTime + (o.delay || 0);
    const dur = o.dur;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = o.type || 'square';
    osc.frequency.setValueAtTime(o.freq, t0);
    if (o.freqEnd) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.freqEnd), t0 + dur);
    const peak = o.gain != null ? o.gain : 0.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack || 0.005));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = function () { try { osc.disconnect(); g.disconnect(); } catch (e) {} };
  },

  // Filtered white-noise burst (explosions, damage).
  _noise(o) {
    const ctx = this._ready();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const dur = o.dur;
    const src = ctx.createBufferSource();
    src.buffer = this._noiseBuf;
    const filt = ctx.createBiquadFilter();
    filt.type = o.filterType || 'lowpass';
    filt.frequency.setValueAtTime(o.filterFreq || 1200, t0);
    if (o.filterEnd) filt.frequency.exponentialRampToValueAtTime(Math.max(50, o.filterEnd), t0 + dur);
    const g = ctx.createGain();
    const peak = o.gain != null ? o.gain : 0.3;
    g.gain.setValueAtTime(peak, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
    src.onended = function () { try { src.disconnect(); filt.disconnect(); g.disconnect(); } catch (e) {} };
  },

  // ---- Public sounds ---------------------------------------

  shoot() {
    const now = performance.now();
    if (now - this._lastShoot < CONFIG.sfx.shootThrottleMs) return;
    this._lastShoot = now;
    this._tone({ type: 'square', freq: 880, freqEnd: 420, dur: 0.07, gain: 0.05, attack: 0.002 });
  },

  hit() { // player loses health
    this._tone({ type: 'sawtooth', freq: 300, freqEnd: 90, dur: 0.18, gain: 0.14 });
    this._noise({ dur: 0.12, gain: 0.10, filterFreq: 900 });
  },

  shield() { // shield absorbs a hit
    this._tone({ type: 'sine', freq: 1200, freqEnd: 1700, dur: 0.12, gain: 0.10, attack: 0.003 });
  },

  explosion(size) {
    const map = {
      small:  { dur: 0.18, gain: 0.18, f: 1400, fe: 200, thump: 120 },
      medium: { dur: 0.30, gain: 0.24, f: 1100, fe: 150, thump: 90 },
      large:  { dur: 0.45, gain: 0.30, f: 900,  fe: 100, thump: 70 },
      boss:   { dur: 0.80, gain: 0.40, f: 800,  fe: 60,  thump: 50 },
    };
    const p = map[size] || map.small;
    this._noise({ dur: p.dur, gain: p.gain, filterType: 'lowpass', filterFreq: p.f, filterEnd: p.fe });
    this._tone({ type: 'sine', freq: p.thump * 2, freqEnd: p.thump * 0.6, dur: p.dur * 0.9, gain: p.gain * 0.6 });
  },

  powerup(kind) {
    const base = kind === 'score' ? 660 : kind === 'shield' ? 520 : 440;
    const notes = kind === 'score' ? [base, base * 1.5] : [base, base * 1.26, base * 1.5];
    for (let i = 0; i < notes.length; i++) {
      this._tone({ type: 'triangle', freq: notes[i], dur: 0.12, gain: 0.16, delay: i * 0.06, attack: 0.005 });
    }
  },

  bossHit() {
    const now = performance.now();
    if (now - this._lastBossHit < CONFIG.sfx.bossHitThrottleMs) return;
    this._lastBossHit = now;
    this._tone({ type: 'square', freq: 1200, freqEnd: 800, dur: 0.05, gain: 0.06, attack: 0.001 });
  },

  bossDeath() {
    this._noise({ dur: 1.0, gain: 0.42, filterFreq: 1200, filterEnd: 60 });
    this._tone({ type: 'sawtooth', freq: 220, freqEnd: 40, dur: 1.0, gain: 0.26 });
  },

  uiClick() {
    this._tone({ type: 'square', freq: 600, freqEnd: 900, dur: 0.06, gain: 0.08 });
  },
};
