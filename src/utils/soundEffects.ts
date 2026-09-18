/**
 * Sound synthesis using Web Audio API and Text-to-Speech using Web Speech API
 * Designed for gentle, delightful child-friendly feedback without external audio assets.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft cheerful click/pop
  public playPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Magical Chime when wheel rotates or stops
  public playChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.45);
      });
    } catch {
      // Ignore audio error
    }
  }

  // Birds chirping for Spring
  public playSpringBirds() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const chirps = [1760, 2200, 2637, 2093];
      chirps.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const startTime = this.ctx.currentTime + idx * 0.12;
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.linearRampToValueAtTime(freq + 400, startTime + 0.05);
        osc.frequency.linearRampToValueAtTime(freq - 200, startTime + 0.1);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.11);
      });
    } catch {
      // Ignore
    }
  }

  // Water splash / ripples for Summer
  public playSummerSplash() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const freqs = [350, 480, 620, 840, 500];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, start + 0.07);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.16);
      });
    } catch {
      // Ignore
    }
  }

  // Autumn leaf crunch / rustle
  public playAutumnLeaves() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Filtered noise pulse
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Winter soft breeze / crystalline chime
  public playWinterWind() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bells = [880, 1318.5, 1760];
      bells.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.14;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.65);
      });
    } catch {
      // Ignore
    }
  }

  // Cute cheerful squirrel chirp / chuckle
  public playSquirrelChirp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // 3 quick chirpy notes with pitch bend
      const freqs = [1200, 1600, 2100];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.07;

        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.35, start + 0.05);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.065);
      });
    } catch {
      // Ignore
    }
  }

  // Triumphant Fanfare for quiz & activity completion
  public playSuccessFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + idx * 0.09;
        const dur = idx === notes.length - 1 ? 0.6 : 0.2;

        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + dur + 0.05);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();

/**
 * Pre-rendered Romanian Narration Audio Map
 * Natural, gentle, and friendly female Romanian voice with accurate diction for young kids (4-7 years).
 * Pre-generated as standard MP3s for 0ms instant playback across any browser, phone, tablet, or desktop.
 */
const NARRATION_AUDIO_MAP: Record<string, string> = {
  // Story Chapters
  story_1: '/audio/narration/story_1.mp3',
  story_2: '/audio/narration/story_2.mp3',
  story_3: '/audio/narration/story_3.mp3',
  story_4: '/audio/narration/story_4.mp3',
  story_5: '/audio/narration/story_5.mp3',
  story_6: '/audio/narration/story_6.mp3',

  // Seasons
  season_primavara: '/audio/narration/season_primavara.mp3',
  season_vara: '/audio/narration/season_vara.mp3',
  season_toamna: '/audio/narration/season_toamna.mp3',
  season_iarna: '/audio/narration/season_iarna.mp3',

  // Quiz Questions
  quiz_1: '/audio/narration/quiz_1.mp3',
  quiz_2: '/audio/narration/quiz_2.mp3',
  quiz_3: '/audio/narration/quiz_3.mp3',
  quiz_4: '/audio/narration/quiz_4.mp3',

  // Parent Guide Questions
  parent_q1: '/audio/narration/parent_q1.mp3',
  parent_q2: '/audio/narration/parent_q2.mp3',
  parent_q3: '/audio/narration/parent_q3.mp3',
  parent_q4: '/audio/narration/parent_q4.mp3',

  // Nuca Companion Jokes & Lines
  nuca_1: '/audio/narration/nuca_1.mp3',
  nuca_2: '/audio/narration/nuca_2.mp3',
  nuca_3: '/audio/narration/nuca_3.mp3',
  nuca_4: '/audio/narration/nuca_4.mp3',
  nuca_5: '/audio/narration/nuca_5.mp3',
  nuca_6: '/audio/narration/nuca_6.mp3',
};

/**
 * Text-to-Speech service delivering instant, natural Romanian female narration
 * on any device and browser (iOS Safari, Android Chrome, Mac, Windows, Linux).
 */
export class SpeechService {
  private static isSpeaking: boolean = false;
  private static activeAudio: HTMLAudioElement | null = null;
  private static activeUtterance: SpeechSynthesisUtterance | null = null;
  private static preloadedAudios: Map<string, HTMLAudioElement> = new Map();
  private static isInitialized: boolean = false;

  /**
   * Preload all narration audios into memory on application boot
   * so tapping any narration button plays in 0ms with zero loading delay.
   */
  public static initPreload(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    try {
      Object.entries(NARRATION_AUDIO_MAP).forEach(([key, url]) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = url;
        this.preloadedAudios.set(key, audio);
      });
    } catch {
      // Ignore in environments without Audio support
    }
  }

  /**
   * Resolves text or audioKey to a preloaded or server-backed Romanian audio URL
   */
  public static resolveAudioSource(text: string, audioKey?: string): { url: string; key?: string } {
    if (audioKey && NARRATION_AUDIO_MAP[audioKey]) {
      return { url: NARRATION_AUDIO_MAP[audioKey], key: audioKey };
    }

    const t = text.toLowerCase();

    // Story pages detection
    if (t.includes('pădurea cea mare') || t.includes('roata fermecată') && t.includes('trăia o veveriță')) {
      return { url: NARRATION_AUDIO_MAP.story_1, key: 'story_1' };
    }
    if (t.includes('primul sfert') || t.includes('copacii făceau muguri') || (t.includes('muguri') && t.includes('primăverii'))) {
      return { url: NARRATION_AUDIO_MAP.story_2, key: 'story_2' };
    }
    if (t.includes('al doilea sfert') || (t.includes('soarele ardea') && t.includes('verii'))) {
      return { url: NARRATION_AUDIO_MAP.story_3, key: 'story_3' };
    }
    if (t.includes('al treilea sfert') || (t.includes('frunzele copacilor') && t.includes('toamnei'))) {
      return { url: NARRATION_AUDIO_MAP.story_4, key: 'story_4' };
    }
    if (t.includes('al patrulea sfert') || (t.includes('zăpadă albă') && t.includes('iernii'))) {
      return { url: NARRATION_AUDIO_MAP.story_5, key: 'story_5' };
    }
    if (t.includes('cercul care nu se oprește') || t.includes('după iarnă, roata nu se oprea') || t.includes('minunea')) {
      return { url: NARRATION_AUDIO_MAP.story_6, key: 'story_6' };
    }

    // Season descriptions in Magic Wheel
    if (t.includes('primăverii') && (t.includes('înflorește') || t.includes('muguri') || t.includes('martie'))) {
      return { url: NARRATION_AUDIO_MAP.season_primavara, key: 'season_primavara' };
    }
    if (t.includes('verii') && (t.includes('soarele arde') || t.includes('cald') || t.includes('iunie'))) {
      return { url: NARRATION_AUDIO_MAP.season_vara, key: 'season_vara' };
    }
    if (t.includes('toamnei') && (t.includes('frunzele') || t.includes('alune') || t.includes('septembrie'))) {
      return { url: NARRATION_AUDIO_MAP.season_toamna, key: 'season_toamna' };
    }
    if (t.includes('iernii') && (t.includes('zăpadă') || t.includes('scorbura') || t.includes('decembrie'))) {
      return { url: NARRATION_AUDIO_MAP.season_iarna, key: 'season_iarna' };
    }

    // Quiz questions
    if (t.includes('ce anotimp urmează imediat după toamnă')) {
      return { url: NARRATION_AUDIO_MAP.quiz_1, key: 'quiz_1' };
    }
    if (t.includes('ce face veverița nuca') && t.includes('vară')) {
      return { url: NARRATION_AUDIO_MAP.quiz_2, key: 'quiz_2' };
    }
    if (t.includes('ce strânge nuca de zor')) {
      return { url: NARRATION_AUDIO_MAP.quiz_3, key: 'quiz_3' };
    }
    if (t.includes('nu se oprește niciodată') && t.includes('de ce')) {
      return { url: NARRATION_AUDIO_MAP.quiz_4, key: 'quiz_4' };
    }

    // Parent Guide
    if (t.includes('afară pe geam')) {
      return { url: NARRATION_AUDIO_MAP.parent_q1, key: 'parent_q1' };
    }
    if (t.includes('când ajunge la iarnă') && t.includes('vară')) {
      return { url: NARRATION_AUDIO_MAP.parent_q2, key: 'parent_q2' };
    }
    if (t.includes('de ce crezi că roata lui nuca nu se oprește')) {
      return { url: NARRATION_AUDIO_MAP.parent_q3, key: 'parent_q3' };
    }
    if (t.includes('dacă roata e acum la toamnă')) {
      return { url: NARRATION_AUDIO_MAP.parent_q4, key: 'parent_q4' };
    }

    // Nuca Companion Jokes
    if (t.includes('ghindele')) return { url: NARRATION_AUDIO_MAP.nuca_1, key: 'nuca_1' };
    if (t.includes('număr florile')) return { url: NARRATION_AUDIO_MAP.nuca_2, key: 'nuca_2' };
    if (t.includes('mustățile')) return { url: NARRATION_AUDIO_MAP.nuca_3, key: 'nuca_3' };
    if (t.includes('lăbuțe')) return { url: NARRATION_AUDIO_MAP.nuca_4, key: 'nuca_4' };
    if (t.includes('visez la soare')) return { url: NARRATION_AUDIO_MAP.nuca_5, key: 'nuca_5' };
    if (t.includes('magia timpului')) return { url: NARRATION_AUDIO_MAP.nuca_6, key: 'nuca_6' };

    // Dynamic endpoint for any other text
    return { url: `/api/tts?text=${encodeURIComponent(text.trim())}` };
  }

  /**
   * Plays Romanian female narration instantly with 0ms delay
   */
  public static speak(
    text: string,
    onEnd?: () => void,
    onStart?: () => void,
    audioKey?: string
  ): void {
    if (soundEngine.getMuted()) {
      if (onEnd) onEnd();
      return;
    }

    // Stop any currently playing speech immediately
    this.stop();

    const { url, key } = this.resolveAudioSource(text, audioKey);

    // Try preloaded instant audio first
    let audio: HTMLAudioElement | null = null;
    if (key && this.preloadedAudios.has(key)) {
      audio = this.preloadedAudios.get(key)!;
    } else {
      audio = new Audio(url);
    }

    if (audio) {
      this.activeAudio = audio;
      this.isSpeaking = true;

      const cleanup = () => {
        this.isSpeaking = false;
        this.activeAudio = null;
        if (audio) {
          audio.onended = null;
          audio.onerror = null;
          audio.onpause = null;
        }
      };

      audio.onended = () => {
        cleanup();
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        cleanup();
        // Fallback to Web Speech API if audio asset fails
        this.speakFallbackWebSpeech(text, onEnd, onStart);
      };

      audio.currentTime = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        if (onStart) onStart();
        playPromise.catch((_err) => {
          // If browser policy blocked playback, fallback to speech synthesis
          cleanup();
          this.speakFallbackWebSpeech(text, onEnd, onStart);
        });
      } else {
        if (onStart) onStart();
      }
      return;
    }

    // If Audio element creation failed, fallback to Web Speech API
    this.speakFallbackWebSpeech(text, onEnd, onStart);
  }

  /**
   * Fallback Web Speech synthesis configured specifically for Romanian female voice
   */
  private static speakFallbackWebSpeech(
    text: string,
    onEnd?: () => void,
    onStart?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || soundEngine.getMuted()) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.88; // Gentle storytelling pace
      utterance.pitch = 1.12; // Natural, friendly female pitch

      // Select female Romanian voice if present in the browser
      const voices = window.speechSynthesis.getVoices();
      const roVoices = voices.filter((v) => v.lang.startsWith('ro') || v.lang.includes('RO'));
      const femaleRoVoice = roVoices.find((v) =>
        v.name.toLowerCase().includes('ioana') ||
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('carmen') ||
        v.name.toLowerCase().includes('daria') ||
        v.name.toLowerCase().includes('maria')
      ) || roVoices[0];

      if (femaleRoVoice) {
        utterance.voice = femaleRoVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  /**
   * Immediately stops any playing speech/audio
   */
  public static stop(): void {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.activeAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
      this.activeUtterance = null;
    }

    this.isSpeaking = false;
  }

  public static getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

// Automatically initiate background preloading upon module load
if (typeof window !== 'undefined') {
  SpeechService.initPreload();
}

