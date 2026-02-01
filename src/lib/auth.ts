import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { db } from '@/lib/db' // your drizzle instance
import * as schema from '@/lib/db/auth-schema' // Import your schema object

export const auth = betterAuth({
  plugins: [nextCookies()],
  user: {
    deleteUser: {
      enabled: true,
    },
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
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const mailgun = new Mailgun(FormData)
      const mg = mailgun.client({
        username: 'api',
        key: process.env.EMAIL_API_KEY || '',
      })

      try {
        await mg.messages.create('mailgun.accuguide.org', {
          from: 'support@accuguide.org',
          to: [user.email],
          subject: 'Accuguide - Password Reset',
          template: 'accuguide password recover',
          'h:X-Mailgun-Variables': JSON.stringify({
            reset_url: url,
            user_email: user.email,
          }),
        })
      } catch (error) {
        console.error('Failed to send password reset email:', error)
        throw error
      }
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const mailgun = new Mailgun(FormData)
      const mg = mailgun.client({
        username: 'api',
        key: process.env.EMAIL_API_KEY || '',
      })

      try {
        await mg.messages.create('mailgun.accuguide.org', {
          from: 'support@accuguide.org',
          to: [user.email],
          subject: 'Accuguide - Email Verification',
          template: 'accuguide email verify',
          'h:X-Mailgun-Variables': JSON.stringify({
            verify_url: url,
            user_email: user.email,
          }),
        })
      } catch (error) {
        console.error('Failed to send email verification email:', error)
        throw error
      }
    },
    sendOnSignIn: true,
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
