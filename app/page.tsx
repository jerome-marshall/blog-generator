import Generator from "@/components/Generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-200">
      <div className="container mx-auto max-w-4xl px-5 py-10 md:px-6 md:py-20">
        <h1 className="text-center text-3xl font-bold text-slate-950 md:text-5xl">
          Blog/News generator
        </h1>
        <Generator />
      </div>
    </main>
  );
}
