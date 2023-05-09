import { NextRequest, NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: NextRequest) {
  const body = await req.json()

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in writting blogs about Real Esate/property - Buying/Selling/Renting. The user will give you the title/description about the blog. You should write the blog. Dont reply to any questions, just start writing the blog.",
      },
      { role: "user", content: body.prompt },
    ],
    temperature: 0,
  })

  const data = await response.data

  return new NextResponse(JSON.stringify({ message: data }))
}
