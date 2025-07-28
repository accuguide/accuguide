import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db' // your drizzle instance
import { nextCookies } from 'better-auth/next-js'
import * as schema from '@/lib/db/auth-schema' // Import your schema object

export const auth = betterAuth({
  plugins: [nextCookies()],
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const apiUrl = process.env.EMAIL_API_URL
      const apiKey = process.env.EMAIL_API_KEY
      const params = new URLSearchParams({
        api_key: apiKey ?? '',
        type: 'reset',
        recipient: user.email,
        link: url,
      })
      await fetch(`${apiUrl}/mail?${params.toString()}`)
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
