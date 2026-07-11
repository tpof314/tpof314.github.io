/* ============================================================
   SafeStorage — localStorage that never throws.
   On some browsers (Android Chrome with site data blocked,
   Safari Private mode, file:// in certain configs) touching
   localStorage raises a SecurityError. Unguarded, that error
   during boot stops the game from starting at all. This wrapper
   swallows failures and falls back to an in-memory store so the
   game always runs (just without persistence).
   ============================================================ */

const SafeStorage = {
  _mem: {},
  _ok: null,

  _available() {
    if (this._ok !== null) return this._ok;
    try {
      const k = '__ss_test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      this._ok = true;
    } catch (e) {
      this._ok = false;
    }
    return this._ok;
  },

  get(key, fallback = null) {
    try {
      if (this._available()) {
        const v = window.localStorage.getItem(key);
        return v === null ? fallback : v;
      }
    } catch (e) { /* ignore */ }
    return key in this._mem ? this._mem[key] : fallback;
  },

  set(key, value) {
    this._mem[key] = String(value);
    try {
      if (this._available()) window.localStorage.setItem(key, String(value));
    } catch (e) { /* ignore */ }
  },
};
