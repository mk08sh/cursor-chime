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
    }
  }

  private ensureAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  public playNote(melody: Melody) {
    this.ensureAudioContext();
    if (!this.audioContext || !this.gainNode) return;

    // Initialize the index if it doesn't exist
    if (!(melody.id in this.currentNoteIndex)) {
      this.currentNoteIndex[melody.id] = 0;
    }

    const currentNote = melody.notes[this.currentNoteIndex[melody.id]];
    if (currentNote) {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gainNode);
      oscillator.frequency.value = currentNote.frequency;
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + currentNote.duration);

      // Increment the index for next time
      this.currentNoteIndex[melody.id] = (this.currentNoteIndex[melody.id] + 1) % melody.notes.length;
    }
  }

  public playMelody(melody: Melody) {
    this.ensureAudioContext();
    if (!this.audioContext || !this.gainNode) return;

    let currentTime = this.audioContext.currentTime;

    melody.notes.forEach((note) => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gainNode!);
      oscillator.frequency.value = note.frequency;
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      currentTime += note.duration;
    });

    // Reset the single note index after playing full melody
    this.currentNoteIndex[melody.id] = 0;
  }
}

const audioEngine = typeof window !== 'undefined' ? new AudioEngine() : null;
export default audioEngine; 