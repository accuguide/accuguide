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
        description:
          typeof body.entity.description === 'string'
            ? body.entity.description.trim().slice(0, 1_000)
            : '',
        location: [
          body.entity.city,
          body.entity.state,
          body.entity.country,
        ].filter(Boolean),
      },
      reviews: (body.reviews ?? [])
        .filter(
          (review: { comment?: unknown }) =>
            typeof review.comment === 'string' && review.comment.trim(),
        )
        .slice(0, 20)
        .map((review: { rating: number; comment: string }) => ({
          rating: review.rating,
          comment: review.comment.trim().slice(0, 500),
        })),
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
            content: `Create an accurate, public-facing accessibility summary using the supplied business data and reliable web-search results for the named business and location.

            Return valid JSON only:
            {"overview":"string","indicators":[{"indicator":"string","exists"}],"score":0}

            Rules:

            Write an accessibility-focused overview in no more than four concise sentences. Do not include business hours or the full address.
            Report only accessibility features or barriers explicitly supported by the supplied data or reliable sources. Never infer that an unmentioned feature is absent.
            Use concise, Title Case indicator names. Set "exists": false only when a source explicitly states that a feature is unavailable.
            Balance positive and negative evidence, including reviews and documented barriers.
            Score accessibility and disability inclusivity from 0–100 using this general scale: 0–33 low, 34–66 medium, 67–100 high. Be reasonably liberal: 100 means all documented needs are met; around 80 means most are met; below 50 is appropriate when basic wheelchair accessibility is absent. Consider the score as a 0–10 rating converted to 0–100.`,
          },
          {
            role: 'user',
            content: JSON.stringify(modelInput),
          },
        ],
        model: 'openai/gpt-oss-20b',
        tool_choice: 'auto',
        tools: [
          {
            type: 'browser_search',
          },
        ],

        reasoning_effort: 'medium',
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
