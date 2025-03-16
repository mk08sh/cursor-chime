export interface Note {
  frequency: number;
  duration: number;
}

export interface Melody {
  id: string;
  name: string;
  notes: Note[];
}

// Musical note frequencies (in Hz)
const FREQUENCIES = {
  G4: 392.00,
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  C6: 1046.50
};

export const MELODIES: Melody[] = [
  {
    id: 'simple',
    name: 'Simple Notification',
    notes: [
      { frequency: FREQUENCIES.C5, duration: 0.2 },
      { frequency: FREQUENCIES.E5, duration: 0.2 },
      { frequency: FREQUENCIES.G5, duration: 0.3 }
    ]
  },
  {
    id: 'achievement',
    name: 'Achievement Complete',
    notes: [
      { frequency: FREQUENCIES.G4, duration: 0.15 },
      { frequency: FREQUENCIES.C5, duration: 0.15 },
      { frequency: FREQUENCIES.E5, duration: 0.15 },
      { frequency: FREQUENCIES.G5, duration: 0.15 },
      { frequency: FREQUENCIES.C6, duration: 0.3 },
      { frequency: FREQUENCIES.G5, duration: 0.15 },
      { frequency: FREQUENCIES.E5, duration: 0.3 }
    ]
  },
  {
    id: 'progress',
    name: 'Progress Update',
    notes: [
      { frequency: FREQUENCIES.E5, duration: 0.1 },
      { frequency: FREQUENCIES.G5, duration: 0.1 },
      { frequency: FREQUENCIES.C6, duration: 0.2 },
      { frequency: FREQUENCIES.C6, duration: 0.1 },
      { frequency: FREQUENCIES.G5, duration: 0.3 }
    ]
  }
]; 