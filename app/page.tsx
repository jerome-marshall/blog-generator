"use client"

import { useMutation } from "@tanstack/react-query"

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Why should I live in coimbatore? What are the pros and cons?",
    }),
  })

  const data = await response.json()
  return data
}

export default function Home() {
  const { mutate, data } = useMutation({
    mutationFn: getData,
  })
  console.log("🚀 ~ file: page.tsx:24 ~ Home ~ data:", data)

  return (
    <main>
      <div>
        <h1>Estate Blog/News generator</h1>
        <div>
          <p>Prompt</p>
          <input type="text" />
        </div>
        <div>
          <p>Content</p>
          <p className="content">
            {data?.message?.choices?.map((choice, i) => (
              <span key={i}>{choice?.message?.content}</span>
            ))}
          </p>
        </div>
        <button
          onClick={() => {
            mutate()
          }}
        >
          make call
        </button>
      </div>
    </main>
  )
}
