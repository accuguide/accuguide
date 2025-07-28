import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an AI that creates overviews with accessibility information of business entities based on its info and reviews.',
        },
        {
          role: 'user',

          content: `Generate a concise overview (up to 5 sentences) of the business entity based on the provided information and reviews: ${JSON.stringify(body)}. Focus on accessibility features and other key details from the data. After the overview, provide a JSON list of accessibility indicators with their presence status. The response should be in the following format: { "overview": "The overview of the business entity", "indicators": [{"indicator": "indicator1", "exists": true}, {"indicator": "indicator2", "exists": false}] }. Ensure the list includes only indicators explicitly mentioned in the data. Just provide the JSON response without any additional text.`,
        },
      ],

      model: 'llama-3.3-70b-versatile',
    })
  }
  const chatCompletion = await getGroqChatCompletion()
  return NextResponse.json(
    { message: chatCompletion.choices[0].message?.content || '' },
    { status: 200 },
  )
}
