"use client";

import Generator from "@/components/Generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-200">
      <div className="container mx-auto max-w-4xl px-6 py-20">
        {/* <h1 className="text-center text-6xl font-bold text-slate-950">
          Blog/News generator
        </h1> */}
        <Generator />
      </div>
    </main>
  );
}
