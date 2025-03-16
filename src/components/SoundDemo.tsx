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

  const playNote = async () => {
    if (!audioEngine || !selectedMelody.notes.length || isPlayingNote || isPlayingMelody) return;
    
    setIsPlayingNote(true);
    const duration = await audioEngine.playNote(selectedMelody);
    
    // Use a more precise timing mechanism
    const endTime = performance.now() + duration;
    const checkCompletion = () => {
      if (performance.now() >= endTime) {
        setIsPlayingNote(false);
      } else {
        requestAnimationFrame(checkCompletion);
      }
    };
    requestAnimationFrame(checkCompletion);
  };

  const playMelody = async () => {
    if (!audioEngine || !selectedMelody.notes.length || isPlayingNote || isPlayingMelody) return;
    
    setIsPlayingMelody(true);
    const duration = await audioEngine.playMelody(selectedMelody);
    
    // Use a more precise timing mechanism
    const endTime = performance.now() + duration;
    const checkCompletion = () => {
      if (performance.now() >= endTime) {
        setIsPlayingMelody(false);
      } else {
        requestAnimationFrame(checkCompletion);
      }
    };
    requestAnimationFrame(checkCompletion);
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