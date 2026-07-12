/* ============================================================
   Difficulty — selected difficulty level + its multipliers.
   The player picks a level on the title screen; the choice
   persists. mods() returns the active multiplier set, which
   entities apply on top of the base balance:
     - Enemy: hp, speed, fire rate, bullet speed
     - Waves: density
     - Player: max health
     - Boss: health
   ============================================================ */

const Difficulty = {
  current: CONFIG.defaultDifficulty,

  load() {
    const k = SafeStorage.get(CONFIG.storage.difficulty, CONFIG.defaultDifficulty);
    if (CONFIG.difficulties[k]) this.current = k;
    return this.current;
  },

  set(key) {
    if (!CONFIG.difficulties[key]) return;
    this.current = key;
    SafeStorage.set(CONFIG.storage.difficulty, key);
  },

  mods() {
    return CONFIG.difficulties[this.current] || CONFIG.difficulties[CONFIG.defaultDifficulty];
  },
};
