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
    const modelInput = {
      entity: {
        name: body.entity.name,
        type: body.entity.displayType,
        description: body.entity.description,
        location: [
          body.entity.city,
          body.entity.state,
          body.entity.country,
        ].filter(Boolean),
      },
      reviews: (body.reviews ?? []).map(
        (review: { rating: number; comment: string }) => ({
          rating: review.rating,
          comment: review.comment,
        }),
      ),
      indicators: (body.indicators ?? []).map(
        (indicator: { indicator: string; exists: boolean | null }) => ({
          indicator: indicator.indicator,
          exists: indicator.exists,
        }),
      ),
    }

    async function getGroqChatCompletion() {
      return groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Create an accurate, public-facing accessibility summary for a business using the supplied data and web search results for the named entity and location.

Return valid JSON only with this shape:
{"overview":"string","indicators":[{"indicator":"string","exists":true}],"score":0}

Rules:
- Write an accessibility-focused overview of at most four concise sentences. Do not include hours or a full address.
- Include only accessibility indicators explicitly supported by the supplied data or reliable search results, including documented barriers. Do not infer that an unmentioned feature is absent.
- Use short, title-cased indicator names and set "exists" to false only when a source explicitly says the feature is unavailable.
- Balance positive and negative evidence from reviews, indicators, and search results.
- Score accessibility and disability inclusivity from 0 to 100: low 0-33, medium 34-66, high 67-100. Missing basic features and negative reports should lower the score.`,
          },
          {
            role: 'user',
            content: JSON.stringify(modelInput),
          },
        ],
        model: 'groq/compound-mini',
        compound_custom: {
          tools: {
            enabled_tools: ['web_search'],
          },
        },
      })
    }
    const chatCompletion = await getGroqChatCompletion()
    console.log(JSON.stringify(body))
    // Only return response if successful
    if (
      chatCompletion &&
      chatCompletion.choices &&
      chatCompletion.choices[0]?.message?.content
    ) {
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
        { error: `[api/groq/overview POST] error` },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: `[api/groq/overview POST] error: ${error}` },
      { status: 500 },
    )
  }
}
