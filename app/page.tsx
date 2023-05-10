"use client"

import Generator from "@/components/Generator"

export default function Home() {
  return (
    <main className="bg-slate-200 min-h-screen">
      <div className="container px-6 max-w-4xl mx-auto pt-20">
        <h1 className="text-slate-950 text-6xl font-bold text-center">
          {" "}
          Blog/News generator
        </h1>
        <Generator />
      </div>
    </main>
  )
}
