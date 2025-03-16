export interface Note {
  frequency: number;
  duration: number;
}

export interface Melody {
  id: string;
  name: string;
  notes: Note[];
  singleNote: Note; // The note to play for single task completion
}

// Define some common musical frequencies (A4 = 440Hz as reference)
export const FREQUENCIES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25
};

// Define our melody options
export const MELODIES: Melody[] = [
  {
    id: 'simple',
    name: 'Simple Chime',
    singleNote: { frequency: FREQUENCIES.C5, duration: 0.2 },
    notes: [
      { frequency: FREQUENCIES.C4, duration: 0.2 },
      { frequency: FREQUENCIES.E4, duration: 0.2 },
      { frequency: FREQUENCIES.G4, duration: 0.2 },
      { frequency: FREQUENCIES.C5, duration: 0.4 },
    ]
  },
  {
    id: 'playful',
    name: 'Playful Tune',
    singleNote: { frequency: FREQUENCIES.E4, duration: 0.15 },
    notes: [
      { frequency: FREQUENCIES.E4, duration: 0.15 },
      { frequency: FREQUENCIES.G4, duration: 0.15 },
      { frequency: FREQUENCIES.E4, duration: 0.15 },
      { frequency: FREQUENCIES.C5, duration: 0.3 },
    ]
  },
  {
    id: 'success',
    name: 'Success Fanfare',
    singleNote: { frequency: FREQUENCIES.G4, duration: 0.2 },
    notes: [
      { frequency: FREQUENCIES.C4, duration: 0.1 },
      { frequency: FREQUENCIES.E4, duration: 0.1 },
      { frequency: FREQUENCIES.G4, duration: 0.1 },
      { frequency: FREQUENCIES.C5, duration: 0.1 },
      { frequency: FREQUENCIES.E5, duration: 0.3 },
    ]
  }
]; 