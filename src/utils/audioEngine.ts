import { Note, Melody } from '@/types/audio';

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    // Do not initialize in constructor - wait for user interaction
  }

  private initAudioContext() {
    // Only initialize if we're in the browser and AudioContext exists
    if (typeof window !== 'undefined' && typeof window.AudioContext !== 'undefined') {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
      }
      
      // Resume context if suspended (needed for some browsers)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
  }

  async playNote(note: Note) {
    try {
      // Initialize context on first user interaction
      this.initAudioContext();
      
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
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }

  async playMelody(melody: Melody) {
    try {
      // Initialize context on first user interaction
      this.initAudioContext();
      
      if (!this.audioContext) return;

      let currentTime = 0;
      
      for (const note of melody.notes) {
        setTimeout(() => {
          this.playNote(note);
        }, currentTime * 1000);
        
        currentTime += note.duration;
      }

      return new Promise(resolve => setTimeout(resolve, currentTime * 1000));
    } catch (error) {
      console.error('Error playing melody:', error);
    }
  }
}

// Create the singleton instance
const audioEngine = new AudioEngine();

// Only export if we're in the browser
export default typeof window !== 'undefined' ? audioEngine : null; 