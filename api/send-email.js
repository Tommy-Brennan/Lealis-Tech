import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, lastName, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'devTeam@lealisTech.com',
      to: 'tommybrennan11@gmail.com',
      subject: 'testing form submission',
      html: `
        <h2>New Message</h2>
        <p>${firstName} ${lastName}</p>
        <p>${email}</p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}