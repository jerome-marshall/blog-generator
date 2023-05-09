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
      {
        role: "user",
        content: `Write a blog post on “${body.title}”. Write it in a “${body.tone}” tone. Use transition words. Write over 100 words. it should be written as a news story. Include the following keywords: “${body.keywords}”. Create a good slug for this post and a meta description with a maximum of 100 words. and add it to the end of the blog post`,
      },
    ],
    temperature: 0,
  })

  const data = await response.data

  return new NextResponse(JSON.stringify({ message: data }))
}
