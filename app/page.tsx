"use client"

import Generator from "@/components/Generator"

export default function Home() {
  return (
    <main className="bg-slate-200">
      <div className="max-w-5xl mx-auto pt-20">
        <h1 className="text-slate-950 text-6xl font-bold"> Blog/News generator</h1>
        <Generator />
      </div>
    </main>
  )
}
