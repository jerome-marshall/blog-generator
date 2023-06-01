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
        content: `You are an expert in writting blogs/news articles. The user will give you the title/description about the blog. You should write the blog not less than 500 words. Dont reply to any questions and start writing the blog. Write in markdown with proper headings, sub-headings. If the topic/description/keywords is not given or is not clear, ask the user to clarify.`,
      },
      {
        role: "user",
        content: `Write a blog post on “${body.title || ""}”. Write it in a “${
          body.tone || "neutral"
        }” tone. Use transition words. it should be written as a news story and includes the following keywords: “${
          body.keywords || ""
        }”. ${body.description || ""}`,
      },
    ],
    top_p: 1,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  try {
    const stream = await OpenAIStream(payload);

    // const response = await openai.createChatCompletion(payload);

    // const data = await response.data;

    // return new NextResponse(JSON.stringify({ message: data }));
    return new NextResponse(stream);
  } catch (error) {
    console.log("🚀 ~ file: route.ts:44 ~ POST ~ error:", error);

    return new NextResponse(JSON.stringify({ message: error }));
  }
}
