'use client';

import { useState, useEffect } from 'react';
import { MELODIES, Melody } from '@/types/audio';
import { audioEngine } from '@/utils/audioEngine';

export default function SoundDemo() {
  const [selectedMelody, setSelectedMelody] = useState<Melody>(MELODIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const playNote = async () => {
    if (!audioEngine) return;
    setIsPlaying(true);
    await audioEngine.playNote(
      selectedMelody.singleNote.frequency,
      selectedMelody.singleNote.duration
    );
    setIsPlaying(false);
  };

  const playMelody = async () => {
    if (!audioEngine) return;
    setIsPlaying(true);
    await audioEngine.playMelody(selectedMelody);
    setIsPlaying(false);
  };

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Sound Notification Demo</h1>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Melody
          </label>
          <select
            className="w-full p-2 border rounded-md bg-white"
            value={selectedMelody.id}
            onChange={(e) => {
              const melody = MELODIES.find(m => m.id === e.target.value);
              if (melody) setSelectedMelody(melody);
            }}
          >
            {MELODIES.map((melody) => (
              <option key={melody.id} value={melody.id}>
                {melody.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={playNote}
            disabled={isPlaying}
            className={`p-4 rounded-lg text-white text-center transition-all
              ${isPlaying 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
              }`}
          >
            Play Single Note
          </button>

          <button
            onClick={playMelody}
            disabled={isPlaying}
            className={`p-4 rounded-lg text-white text-center transition-all
              ${isPlaying
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              }`}
          >
            Play Full Melody
          </button>
        </div>

        {isPlaying && (
          <div className="text-center text-sm text-gray-500">
            Playing sound...
          </div>
        )}
      </div>
    </div>
  );
} 