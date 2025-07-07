import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot check for spam protection
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ message: 'Spam detected' }, { status: 422 })
    }

    // Validation
    const errors: { [key: string]: string } = {}

    if (!name?.trim()) {
      errors.name = 'Name is required'
    }

    if (!email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!subject?.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!message?.trim()) {
      errors.message = 'Message is required'
    } else if (message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 })
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    // Email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background-color: #2d3748; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 20px;">New Contact Submission</h1>
              <p style="margin: 8px 0 0; color: #cbd5e0; font-size: 14px;">Portfolio Contact Form</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              
              <!-- Contact Info -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px;">Contact Details</p>
                <div style="padding: 16px; background-color: #f7fafc; border-left: 3px solid #4a5568; border-radius: 4px;">
                  <h3 style="margin: 0 0 8px; font-size: 16px; color: #2d3748;">${name}</h3>
                  <p style="margin: 0; font-size: 14px; color: #718096;">${email}</p>
                </div>
              </div>
              
              <!-- Subject -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                <h2 style="margin: 0; font-size: 18px; color: #2d3748;">${subject}</h2>
              </div>
              
              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 12px; font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                <div style="background-color: #f7fafc; padding: 20px; border-radius: 4px; border-left: 3px solid #cbd5e0;">
                  <p style="margin: 0; font-size: 15px; color: #4a5568; line-height: 1.6; white-space: pre-line;">${message.trim()}</p>
                </div>
              </div>
              
              <!-- Timestamp -->
              <div style="text-align: center; padding: 16px; background-color: #f7fafc; border-radius: 4px;">
                <p style="margin: 0; font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px;">Received</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #718096;">${new Date().toLocaleString()}</p>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">This message was sent through your portfolio contact form.</p>
            </div>
            
          </div>
        </body>
      </html>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: process.env.MAIL_CONTACT_EMAIL || process.env.MAIL_USERNAME,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlTemplate,
      replyTo: email,
    })

    return NextResponse.json(
      { message: "Message sent successfully! I'll get back to you soon." },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Sorry, there was an error sending your message. Please try again later.' },
      { status: 500 }
    )
  }
}