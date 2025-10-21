// utils/templates/welcome.js
// Returns colorful, email-friendly HTML for a welcome email

export const welcomeTemplate = ({ name = 'there' } = {}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to JurisAI</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <style>
    /* Fallback styles for some clients */
    @media (max-width: 620px) {
      .wrapper { width: 100% !important; }
      .content { padding: 20px !important; }
      .h1 { font-size: 22px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f1021;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f1021;">
    <tr>
      <td align="center" style="padding: 30px 12px;">
        <table role="presentation" class="wrapper" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px; background:#11122b; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25);">

          <!-- Header / Hero -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed, #4b0082); padding: 34px 28px; color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                    <div style="font-size:12px; opacity:.9; letter-spacing:1px; text-transform:uppercase;">Welcome to</div>
                    <div style="font-size:28px; font-weight:800; line-height:1.2; margin-top:6px;">JurisAI</div>
                    <div style="margin-top:10px; font-size:15px; opacity:.95;">
                      Hi ${name}, your legal companion just got smarter. Let’s get you started.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content" style="padding: 28px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#e7e7ff;">
              <h1 class="h1" style="margin:0 0 12px 0; font-size:24px; color:#ffffff;">We’re excited you’re here 👋</h1>
              <p style="margin:0 0 10px 0; line-height:1.6;">Thanks for signing up for <strong style="color:#b794f6;">JurisAI</strong>! Ask questions, explore laws, and learn from curated examples—all in one place.</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:16px;">
                <tr>
                  <td style="padding:0;">
                    <div style="display:inline-block; background:#1f2040; border:1px solid #2b2d66; border-radius:10px; padding:14px 16px; margin-right:8px; margin-bottom:8px; color:#c7c7ff;">
                      ✅ Ask JurisBot anything
                    </div>
                    <div style="display:inline-block; background:#1f2040; border:1px solid #2b2d66; border-radius:10px; padding:14px 16px; margin-right:8px; margin-bottom:8px; color:#c7c7ff;">
                      📚 Explore legal scenarios
                    </div>
                    <div style="display:inline-block; background:#1f2040; border:1px solid #2b2d66; border-radius:10px; padding:14px 16px; margin-right:8px; margin-bottom:8px; color:#c7c7ff;">
                      ⚖️ Learn relevant laws
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
                <tr>
                  <td align="left">
                    <a href="#" target="_blank" rel="noopener"
                       style="background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; display:inline-block; font-weight:600; box-shadow:0 6px 20px rgba(124,58,237,0.35);">
                      Get Started
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tip box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
                <tr>
                  <td style="background:#16173a; border:1px solid #2b2d66; border-radius:12px; padding:16px; color:#cfcfff;">
                    💡 <strong style="color:#b794f6;">Tip:</strong> You can access JurisBot from the app’s top navigation and start by typing a simple question like “What is a deepfake?”
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <p style="margin:22px 0 0 0; font-size:12px; color:#a4a4d6;">
                If you didn’t sign up for JurisAI, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export default welcomeTemplate;
