import FormData from 'form-data'
import Mailgun from 'mailgun.js'

/*
 * Password reset
 */

export async function emailResetPassword({ user, url }) {
  if (process.env.EMAIL_PROVIDER_NUMBER == '1') {
    email1ResetPassword(user, url);
  } else if (process.env.EMAIL_PROVIDER_NUMBER == '2') {
    email2ResetPassword(user, url);
  }
}

async function email1ResetPassword(user, url) {
  // this try-catch block is needed when nodemailer is not installed in production mode
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL1_HOST,
      port: parseInt(process.env.EMAIL1_PORT),
      secure: ((process.env.EMAIL1_SECURE).toLowerCase() === 'true'), 
      auth: {
        user: process.env.EMAIL1_USER,
        pass: process.env.EMAIL1_PASSWORD,
      },
    });
    
    let template = require("fs").readFileSync("./src/lib/email/reset_password.html", "utf8")
      .replace("{url}", url)
      .replace("{user.email}", user.email);

    (async () => {
      const info = await transporter.sendMail({
        from: process.env.EMAIL1_FROM,
        to: user.email,
        subject: "Reset password",
        text: template, // Plain-text version of the message
        html: template, // HTML version of the message
      });

      console.log("Message sent:", info.messageId);
    })();
  } catch(error) {
    console.error(error);
  }
}

async function email2ResetPassword(user, url) {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.EMAIL2_API_KEY || '',
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
}









/*
 * Email Verification
 */

export async function emailVerifyEmail({ user, url }) {
  if (process.env.EMAIL_PROVIDER_NUMBER == '1') {
    email1VerifyEmail(user, url);
  } else if (process.env.EMAIL_PROVIDER_NUMBER == '2') {
    email2VerifyEmail(user, url);
  }
}

async function email1VerifyEmail(user, url) {
  // this try-catch block is needed when nodemailer is not installed in production mode
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL1_HOST,
      port: parseInt(process.env.EMAIL1_PORT),
      secure: ((process.env.EMAIL1_SECURE).toLowerCase() === 'true'), 
      auth: {
        user: process.env.EMAIL1_USER,
        pass: process.env.EMAIL1_PASSWORD,
      },
    });
    
    let template = require("fs").readFileSync("./src/lib/email/confirm_email.html", "utf8")
      .replace("{url}", url)
      .replace("{user.email}", user.email);

    (async () => {
      const info = await transporter.sendMail({
        from: process.env.EMAIL1_FROM,
        to: user.email,
        subject: "Accuguide - Email Verification",
        text: template, // Plain-text version of the message
        html: template, // HTML version of the message
      });

      console.log("Message sent:", info.messageId);
    })();
  } catch(error) {
    console.error(error);
  }
}

async function email2VerifyEmail(user, url) {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.EMAIL2_API_KEY || '',
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
}
