import { Note, Melody } from '@/types/audio';

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    // Only initialize if we're in the browser
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  private initAudioContext() {
    // Ensure we're in the browser and AudioContext is available
    if (typeof window !== 'undefined' && typeof window.AudioContext !== 'undefined') {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  private ensureContext() {
    if (typeof window === 'undefined') return;
    
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      this.initAudioContext();
    }
  }

  async playNote(note: Note) {
    if (typeof window === 'undefined') return;
    
    this.ensureContext();
    if (!this.audioContext || !this.gainNode) return;

    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(note.frequency, this.audioContext.currentTime);
    
    oscillator.connect(this.gainNode);
    
    // Add a slight fade in/out to prevent clicks
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.01);
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + note.duration);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + note.duration);
  }

  async playMelody(melody: Melody) {
    if (typeof window === 'undefined') return;
    
    this.ensureContext();
    if (!this.audioContext) return;

    let currentTime = 0;
    
    for (const note of melody.notes) {
      setTimeout(() => {
        this.playNote(note);
      }, currentTime * 1000);
      
      currentTime += note.duration;
    }

    return new Promise(resolve => setTimeout(resolve, currentTime * 1000));
  }
}

// Create the singleton instance only on the client side
export const audioEngine = typeof window !== 'undefined' ? new AudioEngine() : null; 