import SoundDemo from '@/components/SoundDemo';

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-blue py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-4 border-black p-6 rounded-lg mb-8 shadow-mario">
          <h1 className="text-4xl font-mario text-mario-red text-center mb-6">
            CURSOR CHIME DEMO
          </h1>
          <div className="font-mono space-y-2 text-black">
            <p><span className="font-bold">Single task chime:</span> Plays a single note part of a bigger melody</p>
            <p><span className="font-bold">Project Deployed:</span> Entire Melody Plays</p>
          </div>
        </div>

        <SoundDemo />
      </div>
    </main>
  );
}
