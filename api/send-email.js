import { Resend } from 'resend';

export default async function handler(req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('API KEY:', process.env.RESEND_API_KEY);
  console.log("KEY EXISTS:", !!process.env.RESEND_API_KEY);

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, lastName, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tommybrennan11@gmail.com',
      subject: 'testing form submission',
      html: `
        <h2>New Message</h2>
        <p>${firstName} ${lastName}</p>
        <p>${email}</p>
        <p>${message}</p>
      `
    });

    console.log("RESEND RESULT:", result);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}