import Image from "next/image";
import SoundDemo from '@/components/SoundDemo';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Task Completion Sounds
          </h1>
          <p className="text-lg text-gray-600">
            Experience different notification sounds for task and project completion.
            Select a melody and try both single note and full melody playback.
          </p>
        </div>
        
        <SoundDemo />
      </div>
    </main>
  );
}
