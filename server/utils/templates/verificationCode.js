// Email template for sending a 6-digit verification code
// Usage: verificationCodeTemplate({ name: 'Alice', code: '123456', expiresInMinutes: 10 })
export default function verificationCodeTemplate({ name = 'there', code = '------', expiresInMinutes = 10 } = {}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your JurisAI verification code</title>
    <style>
      @media (max-width: 600px) {
        .wrapper { width: 100% !important; }
        .code { font-size: 28px !important; letter-spacing: 6px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#0b0c1a;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b0c1a;">
      <tr>
        <td align="center" style="padding: 36px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width:620px; background:linear-gradient(135deg,#7c3aed,#6d28d9,#4b0082); padding:2px; border-radius:18px; box-shadow: 0 14px 40px rgba(0,0,0,0.4);">
            <tr>
              <td style="background:#101233; border-radius:16px;">
                <table role="presentation" class="wrapper" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-radius:16px; overflow:hidden;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6, #4b0082); padding: 28px; color:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                      <div style="font-size:26px; font-weight:800; line-height:1.2;">Verify your email</div>
                      <div style="margin-top:8px; font-size:14px; opacity:.95;">Hi ${name}, use the code below to verify your JurisAI account.</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 26px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#e7e7ff;">
                      <div style="margin:0 0 10px 0; font-size:14px; color:#d9d9ff;">Your verification code</div>
                      <div class="code" style="display:inline-block; background:#171a45; border:1px solid #2b2d66; border-radius:14px; padding:16px 22px; font-size:32px; letter-spacing:10px; font-weight:800; color:#ffffff;">
                        ${code}
                      </div>
                      <div style="margin-top:14px; font-size:12px; color:#a4a4d6;">This code expires in ${expiresInMinutes} minutes. Don’t share it with anyone.</div>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
                        <tr>
                          <td style="background:#141844; border:1px solid #2b2d66; border-radius:12px; padding:14px; color:#cfcfff;">
                            💡 Tip: If you didn’t request this, you can ignore this email.
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
                        <tr>
                          <td style="height:1px; background:linear-gradient(90deg, transparent, #3a2a6f, transparent);"></td>
                        </tr>
                      </table>

                      <div style="margin-top:12px; font-size:12px; color:#9a9ad6;">— The JurisAI Team</div>
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
