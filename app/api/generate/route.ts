import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const wordCount = 300;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an expert in writting blogs/news articles. The user will give you the title/description about the blog. You should write the blog. Dont reply to any questions and start writing the blog. Write in markdown with proper headings, sub-headings and within ${wordCount} words`,
      },
      {
        role: "user",
        content: `Write a blog post on “${body.title}”. Write it in a “${
          body.tone
        }” tone. Use transition words. it should be written as a news story and includes the following keywords: “${
          body.keywords
        }”. ${body.description ? body.description : ""}`,
      },
    ],
    top_p: 1,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new NextResponse(stream);
}
