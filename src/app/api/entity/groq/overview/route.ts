import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
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

            content: `Generate a concise, accessibility-focused overview (up to 4 sentences) of the business entity based on the provided information and reviews: ${JSON.stringify(body)}. Focus on accessibility features and other key details from the data. After the overview, provide a JSON list of accessibility indicators with their presence status. The response should be in the following format: { "overview": "The overview of the business entity", "indicators": [{"indicator": "indicator1", "exists": true}, {"indicator": "indicator2", "exists": false}] }. Ensure the list includes only indicators explicitly mentioned in the data. For each indicator, "exists" should be true if that indicator is present at the location, and false if the indicator is not present. Only include documented indicators. Only include indicators relevant to accessibility. Indicator names should be kept short and have proper formatting, where each word is capitalized and separated by a space, rather than by an underscore. Utilize your web search built in tool to find accessibility information about the entity based on the name and location of the entity. In your response, do not provide the hours or the full address of the entity. Just provide the JSON response without any additional text. `,
          },
        ],

        model: 'groq/compound',
      })
    }
    const chatCompletion = await getGroqChatCompletion()

    // Only return response if successful
    if (
      chatCompletion &&
      chatCompletion.choices &&
      chatCompletion.choices[0]?.message?.content
    ) {
      return NextResponse.json(
        { message: chatCompletion.choices[0].message.content },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { error: 'No valid response from Groq API' },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Error in Groq overview API:', error)
    return NextResponse.json(
      { error: 'Failed to generate overview' },
      { status: 500 },
    )
  }
}
