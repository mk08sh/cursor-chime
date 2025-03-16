import { Note, Melody } from '@/types/audio';

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private currentNoteIndex: { [key: string]: number } = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.5; // Set a consistent volume
    }
    
    // Resume context if it's suspended (needed for some browsers)
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  private ensureAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  public async playNote(melody: Melody): Promise<number> {
    this.ensureAudioContext();
    if (!this.audioContext || !this.gainNode) return 0;

    // Initialize the index if it doesn't exist
    if (!(melody.id in this.currentNoteIndex)) {
      this.currentNoteIndex[melody.id] = 0;
    }

    const currentNote = melody.notes[this.currentNoteIndex[melody.id]];
    if (currentNote) {
      const oscillator = this.audioContext.createOscillator();
      const noteGain = this.audioContext.createGain();
      
      // Connect the oscillator through a separate gain node for envelope control
      oscillator.connect(noteGain);
      noteGain.connect(this.gainNode);

      // Set up the note
      oscillator.frequency.value = currentNote.frequency;
      
      // Add a slight envelope to prevent clicking
      const now = this.audioContext.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(1, now + 0.01);
      noteGain.gain.linearRampToValueAtTime(0, now + currentNote.duration - 0.01);

      // Play the note
      oscillator.start(now);
      oscillator.stop(now + currentNote.duration);

      // Increment the index for next time
      this.currentNoteIndex[melody.id] = (this.currentNoteIndex[melody.id] + 1) % melody.notes.length;

      // Return the actual duration
      return currentNote.duration * 1000;
    }

    return 0;
  }

  public async playMelody(melody: Melody): Promise<number> {
    this.ensureAudioContext();
    if (!this.audioContext || !this.gainNode) return 0;

    let currentTime = this.audioContext.currentTime;
    const totalDuration = melody.notes.reduce((sum, note) => sum + note.duration, 0);

    melody.notes.forEach((note, index) => {
      const oscillator = this.audioContext.createOscillator();
      const noteGain = this.audioContext.createGain();
      
      oscillator.connect(noteGain);
      noteGain.connect(this.gainNode!);

      oscillator.frequency.value = note.frequency;

      // Add envelope to each note
      noteGain.gain.setValueAtTime(0, currentTime);
      noteGain.gain.linearRampToValueAtTime(1, currentTime + 0.01);
      noteGain.gain.linearRampToValueAtTime(0, currentTime + note.duration - 0.01);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      
      currentTime += note.duration;
    });

    // Reset the single note index after playing full melody
    this.currentNoteIndex[melody.id] = 0;

    // Return the total duration in milliseconds
    return totalDuration * 1000;
  }
}

const audioEngine = typeof window !== 'undefined' ? new AudioEngine() : null;
export default audioEngine; 