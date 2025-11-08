import { eq } from 'drizzle-orm'
import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'

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
            content: `You are an AI that generates overviews with accessibility information of business entities based on its info and reviews. This accessibility information includes an overview, accessibility indicators, and an accessibility score from 0 to 100. Respond using only this format:
              { 
                "overview": "The overview of the business entity", 
                "indicators": [
                  {
                    "indicator": "indicator1",
                    "exists": true
                  },
                  {
                    "indicator": "indicator2",
                    "exists": false
                  }
                ],
                "score": # }
              `,
          },
          {
            role: 'user',
            content: `Generate a concise, accessibility-focused overview (up to 4 sentences) of the business entity based on the provided information and reviews: ${JSON.stringify(body)}. Focus on accessibility features and other key details from the data. After the overview, provide a JSON list of accessibility indicators with their presence status. After the indicators, provide a numerical accessibility score from 0 to 100. The response should be in the format provided in the system instruction: . Ensure perfect adherence to the JSON structure provided. Ensure the list includes only indicators explicitly mentioned in the data. For each indicator, "exists" should be true if that indicator is present at the location, and false if the indicator is not present. Only include documented indicators. Only include indicators relevant to accessibility. Indicator names should be kept short and have proper formatting, where each word is capitalized and separated by a space, rather than by an underscore. Utilize your web search built in tool to find accessibility information about the entity based on the name and location of the entity. When using your websearch, consider negative aspects of the accessibility of the place as well. In your response, do not provide the hours or the full address of the entity. Just provide the JSON response without any additional text. The decision of the score should be made based on the sentiments of reviews given to you as well as existent indicators and general accessibility information about the entity found online. Consider accessibility features that exist and do not exist in calculating scores. You do not need to be super convservative with the score - if there are sufficient positive indicators and reviews, the score can be high. If there are significant negative indicators or lack of accessibility features, the score should be lower. Balance the score based on both positive and negative aspects mentioned in the reviews and indicators. Also consider inclusivity of various types of disabilities when determining the score. If a place has a variety of accessibility features that cater to different disabilities, the score can be higher. Consider low accessibility, medium accessibility, and high accessibility levels when determining the score. If a place has very few or no accessibility features, the score should be low (0-33). If a place has some accessibility features but is missing key elements, the score should be medium (34-66). If a place has comprehensive accessibility features and positive reviews regarding accessibility, the score should be high (67-100). A lack of basic accessibility features should significantly lower the score. Negative reviews mentioning accessibility issues should also decrease the score accordingly. Focus on creating a balanced and fair score that accurately reflects the overall accessibility of the business entity based on the provided data. This will be public facing information, so ensure it is accurate and responsible.`,
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
      console.log(
        'Groq chat completion response:',
        chatCompletion.choices[0].message.content,
      )
      const newSummary = JSON.parse(chatCompletion.choices[0].message.content)
      await db
        .update(entityTable)
        .set({
          aiSummary: newSummary.overview,
          aiIndicators: newSummary.indicators,
          aiScore: newSummary.score,
          aiUpdatedAt: new Date(),
        })
        .where(eq(entityTable.id, body.entity.id))
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
