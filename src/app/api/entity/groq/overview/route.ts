import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI that creates an overview of a business entity based on its info and reviews.",
        },
        {
          role: "user",

          content: `Generate and overview of the business entity that is up to 5 sentences based on the provided business information and reviews ${JSON.stringify(body)}`,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });
  }
  const chatCompletion = await getGroqChatCompletion();
  return NextResponse.json(
    { message: chatCompletion.choices[0].message?.content || "" },
    { status: 200 },
  );
}
