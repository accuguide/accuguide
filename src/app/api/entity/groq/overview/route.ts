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
            "You are an AI that creates overviews with accessibility information of business entities based on its info and reviews.",
        },
        {
          role: "user",

          content: `Generate an overview of the business entity that is up to 5 sentences based on the provided business information and reviews ${JSON.stringify(body)}. Include information about the accessibility of the business entity based on reviews and other info about the place you can gather from the provided data. The overview should be concise and informative, highlighting key aspects of accessibility. The overview should also be concise. Also, in a sentence after the overview, list the important accessibility indicators that are present in the business entity in a json list that can be parsed by the client. The list should only contain indicators that are present in the business entity and should not contain any other information. The list should also contain indicators the place does not have. You also do not need to introduce the list, just provide it in a json format. The entire response should be a json format with a key named "overview" for the summary and a key named "indicators" for the list of indicators. The response should be in the following format: { "overview": "The overview of the business entity", "indicators": [{"indicator": "indicator1", "exists": true}, {"indicator": "indicator2", "exists": false}, {"indicator": "indicator3", "exists": true}] }`,
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
