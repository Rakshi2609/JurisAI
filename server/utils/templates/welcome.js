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
<body style="margin:0; padding:0; background:#0b0c1a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b0c1a;">
    <tr>
      <td align="center" style="padding: 36px 14px;">
        <!-- Gradient frame -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width:620px; background:linear-gradient(135deg,#7c3aed,#6d28d9,#4b0082); padding:2px; border-radius:18px; box-shadow: 0 14px 40px rgba(0,0,0,0.4);">
          <tr>
            <td style="background:#101233; border-radius:16px;">
              <table role="presentation" class="wrapper" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%; border-radius:16px; overflow:hidden;">

                <!-- Header / Hero -->
                <tr>
                  <td style="background: linear-gradient(135deg, #8b5cf6, #4b0082); padding: 36px 28px; color:#ffffff;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="left" style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                          <div style="display:inline-block; background: rgba(255,255,255,0.15); padding:6px 10px; border-radius:999px; font-size:11px; letter-spacing:.8px; text-transform:uppercase;">🎉 You’re in!</div>
                          <div style="font-size:30px; font-weight:800; line-height:1.2; margin-top:10px;">Welcome to JurisAI</div>
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
                    <h1 class="h1" style="margin:0 0 14px 0; font-size:24px; color:#ffffff;">We’re excited you’re here 👋</h1>
                    <p style="margin:0 0 12px 0; line-height:1.6; color:#d9d9ff;">Ask questions, explore laws, and learn from curated examples—all in one place.</p>

                    <!-- Feature cards (stack on mobile) -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:10px;">
                      <tr>
                        <td style="padding:0;">
                          <div style="display:inline-block; width:100%; max-width:176px; background:#171a45; border:1px solid #2b2d66; border-radius:12px; padding:14px; margin-right:8px; margin-bottom:10px; vertical-align:top;">
                            <div style="font-size:20px; margin-bottom:6px;">🤖</div>
                            <div style="font-weight:600; color:#ffffff;">JurisBot</div>
                            <div style="font-size:13px; color:#c7c7ff; margin-top:4px;">Chat about legal topics and get guided answers.</div>
                          </div>
                          <div style="display:inline-block; width:100%; max-width:176px; background:#171a45; border:1px solid #2b2d66; border-radius:12px; padding:14px; margin-right:8px; margin-bottom:10px; vertical-align:top;">
                            <div style="font-size:20px; margin-bottom:6px;">📚</div>
                            <div style="font-weight:600; color:#ffffff;">Scenarios</div>
                            <div style="font-size:13px; color:#c7c7ff; margin-top:4px;">Explore real-world cases to see law in action.</div>
                          </div>
                          <div style="display:inline-block; width:100%; max-width:176px; background:#171a45; border:1px solid #2b2d66; border-radius:12px; padding:14px; margin-bottom:10px; vertical-align:top;">
                            <div style="font-size:20px; margin-bottom:6px;">⚖️</div>
                            <div style="font-weight:600; color:#ffffff;">Relevant laws</div>
                            <div style="font-size:13px; color:#c7c7ff; margin-top:4px;">Understand which sections apply and why.</div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- CTAs -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                      <tr>
                        <td align="left">
                          <a href="#" target="_blank" rel="noopener"
                             style="background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; display:inline-block; font-weight:600; box-shadow:0 6px 20px rgba(124,58,237,0.35); margin-right:10px;">
                            Get Started
                          </a>
                          <a href="#" target="_blank" rel="noopener"
                             style="background:#1a1d4d; color:#cfcfff; text-decoration:none; padding:12px 16px; border-radius:10px; display:inline-block; font-weight:600; border:1px solid #2b2d66;">
                            Explore FAQs
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Tip box -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
                      <tr>
                        <td style="background:#141844; border:1px solid #2b2d66; border-radius:12px; padding:16px; color:#cfcfff;">
                          💡 <strong style="color:#b794f6;">Tip:</strong> Start with a simple question like “What is a deepfake?” and browse related scenarios.
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                      <tr>
                        <td style="height:1px; background:linear-gradient(90deg, transparent, #3a2a6f, transparent);"></td>
                      </tr>
                    </table>

                    <!-- Social / Footer -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:16px;">
                      <tr>
                        <td align="left" style="font-size:12px; color:#a4a4d6;">
                          Stay connected:
                          <a href="#" style="display:inline-block; text-decoration:none; margin-left:10px; background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#fff; width:28px; height:28px; line-height:28px; text-align:center; border-radius:50%; font-weight:700;">X</a>
                          <a href="#" style="display:inline-block; text-decoration:none; margin-left:6px; background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#fff; width:28px; height:28px; line-height:28px; text-align:center; border-radius:50%; font-weight:700;">IG</a>
                          <a href="#" style="display:inline-block; text-decoration:none; margin-left:6px; background:linear-gradient(135deg,#7c3aed,#6d28d9); color:#fff; width:28px; height:28px; line-height:28px; text-align:center; border-radius:50%; font-weight:700;">in</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:10px; font-size:12px; color:#9a9ad6;">
                          If you didn’t sign up for JurisAI, you can safely ignore this email.
                        </td>
                      </tr>
                    </table>
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

export default welcomeTemplate;
