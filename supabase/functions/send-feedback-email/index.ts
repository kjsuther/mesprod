```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend';

console.log('Hello from Functions!');

serve(async (req) => {
  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const recipientEmail = Deno.env.get('FEEDBACK_RECIPIENT_EMAIL');

    if (!recipientEmail) {
      throw new Error('FEEDBACK_RECIPIENT_EMAIL environment variable is not set.');
    }

    // Expect a POST request from a Supabase database trigger
    const { record } = await req.json();

    if (!record) {
      return new Response(JSON.stringify({ error: 'No record found in request body.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const { name, email, category, message, contact_phone } = record;

    const emailBody = `
      New Feedback Submission:

      Name: ${name}
      Email: ${email}
      Category: ${category}
      Message:
      ${message}
      ${contact_phone ? `\nContact Phone: ${contact_phone}` : ''}
    `;

    const { data, error } = await resend.emails.send({
      from: 'Feedback Form <onboarding@resend.dev>', // IMPORTANT: Replace with your verified Resend domain
      to: [recipientEmail],
      subject: `New Feedback: ${category} from ${name}`,
      text: emailBody,
    });

    if (error) {
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    console.log('Email sent successfully:', data);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
```