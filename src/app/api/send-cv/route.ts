// app/api/send-cv/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const cvPath = path.join(process.cwd(), 'public', 'cv', 'ASHAIN_REXON_CV_Formatted.docx');
    const cvBuffer = fs.readFileSync(cvPath);

    const { error } = await resend.emails.send({
      from: 'RexOS 98 <onboarding@resend.dev>',
      to: email,
      subject: "Ashain's CV",
      html: `<p>Hi,</p><p>Thanks for your interest — my CV is attached.</p><p>Best,<br/>Ashain</p>`,
      attachments: [
        {
          filename: 'ASHAIN_REXON_CV_Formatted.docx',
          content: cvBuffer,
        },
      ],
    });

    if (error) {
      // Resend returns a named error rather than throwing — check for rate limiting specifically
      const isRateLimited =
        error.name === 'rate_limit_exceeded' ||
        error.message?.toLowerCase().includes('rate limit') ||
        error.message?.toLowerCase().includes('daily');

      if (isRateLimited) {
        return NextResponse.json(
          { error: "I've hit today's email limit — please try again tomorrow, or reach out directly." },
          { status: 429 }
        );
      }

      console.error('resend error:', error);
      return NextResponse.json({ error: 'Something went wrong sending the email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('send-cv error:', err);
    return NextResponse.json({ error: 'Something went wrong sending the email.' }, { status: 500 });
  }
}