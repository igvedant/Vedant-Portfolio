const { Resend } = require('resend');

/**
 * Dispatches an instant email notification using Resend API to igvedant01@gmail.com
 * Form content is strictly sent via email and saved to MongoDB - never logged to server console.
 */
const sendContactNotification = async ({ name, email, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADMIN_EMAIL || 'igvedant01@gmail.com';

  if (!apiKey) {
    // If API key is not yet set in .env, silently return so submission continues smoothly
    return { success: false, reason: 'RESEND_API_KEY not configured' };
  }

  try {
    const resend = new Resend(apiKey);

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 8px; background-color: #ffffff; color: #18181b;">
        <div style="border-bottom: 2px solid #18181b; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 20px; color: #18181b;">New Portfolio Message</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #71717a;">Received via your live MERN portfolio contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #71717a; width: 100px;">Sender:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #18181b; font-weight: 500;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #71717a;">Email:</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #71717a;">Received:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #71717a;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
          </tr>
        </table>

        <div style="background-color: #f4f4f5; border-radius: 6px; padding: 16px; border: 1px solid #e4e4e7; margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a;">Message Body:</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #18181b;">${escapeHtml(message)}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #e4e4e7; padding-top: 16px;">
          <a href="mailto:${escapeHtml(email)}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #18181b; color: #fafafa; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; text-decoration: none;">Reply Directly to ${escapeHtml(name)}</a>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      html: emailHtml,
    });

    return { success: true, data };
  } catch (err) {
    // Return error without exposing message content
    return { success: false, error: err.message };
  }
};

const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

module.exports = { sendContactNotification };
