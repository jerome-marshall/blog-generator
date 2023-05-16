import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const sendData = (data: string) => {
    res.write(data);
  };

  sendData("");

  const model = new ChatOpenAI({
    streaming: true,
    temperature: 0.5,
    callbacks: [
      {
        handleLLMNewToken: sendData,
        handleLLMEnd: () => {
          sendData("");
        },
      },
    ],
  });

  const chatTemplate = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are an expert in writting blogs/news articles. Given the title/description 
      and tone of the blog, write a blog/news article about it and give more emphasis to the keywords provided. Do NOT make things up.

      If title/description is undefined, use the keywords as the title/description. If keywords and title/description is undefined, reply asking for the necessary info. If Tone is undefined, use a neutral tone.

      Answer in Markdown format with proper headings, sub-headings.`
    ),
    HumanMessagePromptTemplate.fromTemplate(
      `Title: {title}
      Keywords: {keywords}
      Description: {description}
      Tone: {tone}`
    ),
  ]);

  const chatPrompt = await chatTemplate.formatPromptValue({
    title: body.title,
    keywords: body.keywords,
    description: body.description,
    tone: body.tone,
  });

  const chatMessages = await chatPrompt.toChatMessages();

  try {
    const res = await model.call(chatMessages);
    console.log("response", res);
  } catch (error) {
    console.error("error", error);
  } finally {
    res.end();
  }
}
