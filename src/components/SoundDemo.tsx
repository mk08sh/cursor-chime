'use client';

import { useState, useEffect } from 'react';
import { MELODIES, Melody } from '@/types/audio';
import audioEngine from '@/utils/audioEngine';

export default function SoundDemo() {
  const [selectedMelody, setSelectedMelody] = useState<Melody>(MELODIES[0]);
  const [isPlayingNote, setIsPlayingNote] = useState(false);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const playNote = () => {
    if (!audioEngine || !selectedMelody.notes.length) return;
    setIsPlayingNote(true);
    audioEngine.playNote(selectedMelody);
    setTimeout(() => setIsPlayingNote(false), selectedMelody.notes[0].duration * 1000);
  };

  const playMelody = () => {
    if (!audioEngine || !selectedMelody.notes.length) return;
    setIsPlayingMelody(true);
    audioEngine.playMelody(selectedMelody);
    const totalDuration = selectedMelody.notes.reduce((sum, note) => sum + note.duration, 0);
    setTimeout(() => setIsPlayingMelody(false), totalDuration * 1000);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="bg-question-block p-6 rounded-lg border-4 border-black shadow-mario">
          <div className="text-center font-mario text-2xl mb-6 text-black">
            SELECT MELODY STYLE
          </div>
          <div className="space-y-3">
            {MELODIES.map((melody) => (
              <button
                key={melody.id}
                onClick={() => setSelectedMelody(melody)}
                className={`w-full p-4 bg-mushroom-beige border-4 border-black rounded-lg font-mono flex justify-between items-center text-black
                  ${selectedMelody.id === melody.id ? 'bg-white' : 'hover:bg-white'}`}
              >
                <span className="flex items-center">
                  {selectedMelody.id === melody.id && (
                    <span className="w-3 h-3 bg-mario-red rounded-full mr-3" />
                  )}
                  {melody.name}
                </span>
                <span>{melody.notes.length} NOTES</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={playNote}
            disabled={isPlayingNote || isPlayingMelody}
            className={`p-4 rounded-lg font-mario text-white border-4 border-black shadow-mario transition-all
              ${isPlayingNote 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-mario-red hover:brightness-110 active:translate-y-1 active:shadow-none'
              }`}
          >
            SINGLE TASK CHIME
          </button>

          <button
            onClick={playMelody}
            disabled={isPlayingNote || isPlayingMelody}
            className={`p-4 rounded-lg font-mario text-white border-4 border-black shadow-mario transition-all
              ${isPlayingMelody
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pipe-green hover:brightness-110 active:translate-y-1 active:shadow-none'
              }`}
          >
            PROJECT COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
} 