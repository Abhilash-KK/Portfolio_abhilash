let isMuted = localStorage.getItem('sfx-muted') === 'true';

export const getMuteState = () => isMuted;

export const setMuteState = (state) => {
  isMuted = state;
  localStorage.setItem('sfx-muted', state);
  window.dispatchEvent(new CustomEvent('sfx-mute-change', { detail: isMuted }));
};

const playSynth = (frequency, duration, type = 'sine', gainVal = 0.1) => {
  if (isMuted) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may be blocked by user gesture before interaction
  }
};

export const playTick = () => playSynth(1600, 0.04, 'sine', 0.02);
export const playClick = () => playSynth(800, 0.08, 'triangle', 0.05);
export const playHover = () => playSynth(1800, 0.06, 'sine', 0.015);
export const playKeyboard = () => playSynth(1000 + Math.random() * 200, 0.03, 'sine', 0.01);
export const playSuccess = () => {
  if (isMuted) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(900, now + 0.08);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(now + 0.2);
  } catch (e) {}
};
