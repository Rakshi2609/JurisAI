// Contact acknowledgement email template
// Usage: contactAckTemplate({ name: 'Alice', message: '...' })
export default function contactAckTemplate({ name = '', message = '' } = {}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thanks for contacting JurisAI</title>
    <style>
      @media (max-width:600px) { .wrapper { width:100% !important; } .hero { padding:20px !important; } }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#0b0c1a; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#e7e7ff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b0c1a;">
      <tr>
        <td align="center" style="padding:36px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width:620px; background:linear-gradient(135deg,#7c3aed,#6d28d9); padding:2px; border-radius:16px;">
            <tr>
              <td style="background:#0f1230; border-radius:14px;">
                <table role="presentation" class="wrapper" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-radius:14px; overflow:hidden;">
                  <tr>
                    <td class="hero" style="padding:28px; background:linear-gradient(135deg,#8b5cf6,#4b0082); color:#fff;">
                      <div style="font-size:20px; font-weight:700;">Thanks for contacting JurisAI</div>
                      <div style="margin-top:8px; font-size:14px; opacity:0.95;">Hi ${name || 'there'}, thanks for reaching out — we received your message and will get back to you shortly.</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px; background:#0f1330; color:#dfe3ff;">
                      <div style="font-size:13px; color:#bfc6ff; margin-bottom:10px;">Your message</div>
                      <div style="background:#121634; border:1px solid #2b2d66; border-radius:10px; padding:14px; color:#e7e7ff; line-height:1.5;">${(message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                        <tr>
                          <td>
                            <a href="#" target="_blank" rel="noopener" style="display:inline-block; padding:10px 16px; border-radius:8px; background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#fff; text-decoration:none; font-weight:600; box-shadow:0 8px 24px rgba(124,58,237,0.25);">Open JurisAI</a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin-top:18px; font-size:12px; color:#9aa0d9;">If you didn't submit this request, ignore this message or reply to this email.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:16px; text-align:center; font-size:12px; color:#9aa0d9; background:#0b0c1a;">
                      <div>— JurisAI team</div>
                      <div style="margin-top:8px;">&copy; ${new Date().getFullYear()} JurisAI</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
