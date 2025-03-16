import SoundDemo from '@/components/SoundDemo';

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-blue p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mario text-black mb-4">CURSOR CHIME DEMO</h1>
          <div className="bg-white border-4 border-black rounded-lg p-6 font-mono text-black">
            <p className="mb-4">
              Each time you complete a task, press the SINGLE TASK CHIME button to hear the next note in the sequence.
            </p>
            <p>
              When you finish your project, celebrate with the PROJECT DEPLOYED melody!
            </p>
          </div>
        </div>
        <SoundDemo />
      </div>
    </main>
  );
}
