// lib/email.ts
// Email sending via Resend
// Install: npm install resend
// Get free API key: resend.com (100 emails/day free)

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

// ─── AMBASSADOR CONFIRMATION ──────────────────────────────────────────────────

export async function sendAmbassadorConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  await resend.emails.send({
    from: "Connexode <noreply@connexode.com>",   // update with your verified domain
    to: email,
    subject: "We received your ambassador application — Connexode",
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#040C18;font-family:'Inter',Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 20px">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:#082038;border-radius:16px;border:1px solid rgba(126,200,216,0.12);overflow:hidden">

                <!-- Header bar -->
                <tr>
                  <td style="background:#188080;height:4px"></td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 32px">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#188080;font-weight:500">
                      Connexode · Campus Ambassador Program
                    </p>
                    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#E8F4F8;line-height:1.3">
                      Application received, ${name}.
                    </h1>
                    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.7)">
                      We have got your campus ambassador application. Our team reviews
                      applications within <strong style="color:#7EC8D8">3–5 business days</strong>.
                    </p>
                    <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.7)">
                      Sign in to your Connexode dashboard anytime to check your
                      live status — you will see it update from
                      <strong style="color:#7EC8D8">Pending → Under Review → Approved</strong>
                      without needing to email us.
                    </p>

                    <!-- CTA button -->
                    <a href="https://connexode.vercel.app/auth/signin"
                      style="display:inline-block;background:#188080;color:#E8F4F8;text-decoration:none;
                             font-size:14px;font-weight:600;padding:12px 28px;border-radius:100px">
                      Track my application →
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 40px 32px;border-top:1px solid rgba(126,200,216,0.08)">
                    <p style="margin:0;font-size:12px;color:rgba(126,200,216,0.3)">
                      Connexode · Campus Talent Network · Pakistan<br>
                      <a href="https://connexode.vercel.app" style="color:rgba(126,200,216,0.3)">connexode.vercel.app</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─── INTERNSHIP CONFIRMATION ──────────────────────────────────────────────────

export async function sendInternshipConfirmation({
  name,
  email,
  track,
}: {
  name: string;
  email: string;
  track: string;
}) {
  await resend.emails.send({
    from: "Connexode <noreply@connexode.com>",
    to: email,
    subject: `Internship application received (${track}) — Connexode`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#040C18;font-family:'Inter',Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 20px">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:#082038;border-radius:16px;border:1px solid rgba(126,200,216,0.12);overflow:hidden">

                <tr>
                  <td style="background:#188080;height:4px"></td>
                </tr>

                <tr>
                  <td style="padding:40px 40px 32px">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#188080;font-weight:500">
                      Connexode · Internship Program
                    </p>
                    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#E8F4F8;line-height:1.3">
                      Application received, ${name}.
                    </h1>

                    <!-- Track badge -->
                    <div style="display:inline-block;background:rgba(24,128,128,0.15);
                                border:1px solid rgba(24,128,128,0.3);border-radius:100px;
                                padding:6px 16px;margin-bottom:24px">
                      <span style="font-size:13px;font-weight:600;color:#7EC8D8">
                        Track: ${track}
                      </span>
                    </div>

                    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.7)">
                      We have got your internship application for the
                      <strong style="color:#7EC8D8">${track}</strong> track.
                      Our team reviews within <strong style="color:#7EC8D8">3–5 business days</strong>.
                    </p>
                    <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.7)">
                      Once approved, your dashboard will unlock your 8-week roadmap,
                      task submissions, and mentor feedback — all in one place.
                    </p>

                    <a href="https://connexode.vercel.app/auth/signin"
                      style="display:inline-block;background:#188080;color:#E8F4F8;text-decoration:none;
                             font-size:14px;font-weight:600;padding:12px 28px;border-radius:100px">
                      Track my application →
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 40px 32px;border-top:1px solid rgba(126,200,216,0.08)">
                    <p style="margin:0;font-size:12px;color:rgba(126,200,216,0.3)">
                      Connexode · Campus Talent Network · Pakistan<br>
                      <a href="https://connexode.vercel.app" style="color:rgba(126,200,216,0.3)">connexode.vercel.app</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─── STATUS UPDATE EMAIL ──────────────────────────────────────────────────────

export async function sendStatusUpdate({
  name,
  email,
  type,
  status,
}: {
  name: string;
  email: string;
  type: "ambassador" | "internship";
  status: "APPROVED" | "REJECTED" | "UNDER_REVIEW";
}) {
  const messages = {
    UNDER_REVIEW: {
      subject: "Your application is under review — Connexode",
      heading: "Your application is being reviewed.",
      body: "Our team is currently reviewing your application. You will hear back within 1–2 more days.",
    },
    APPROVED: {
      subject: `Congratulations — your ${type} application is approved!`,
      heading: "You are in. Welcome to Connexode.",
      body: "Your application has been approved. Sign in now to access your dashboard and get started.",
    },
    REJECTED: {
      subject: "Connexode application update",
      heading: "Application update",
      body: "Thank you for applying. Unfortunately we could not approve your application at this time. You are welcome to re-apply in the next round.",
    },
  };

  const msg = messages[status];

  await resend.emails.send({
    from: "Connexode <noreply@connexode.com>",
    to: email,
    subject: msg.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#040C18;font-family:'Inter',Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px">
            <table width="560" cellpadding="0" cellspacing="0"
              style="background:#082038;border-radius:16px;border:1px solid rgba(126,200,216,0.12);overflow:hidden">
              <tr><td style="background:${status === "APPROVED" ? "#188080" : "rgba(24,128,128,0.4)"};height:4px"></td></tr>
              <tr><td style="padding:40px">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#188080">Connexode</p>
                <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#E8F4F8">${msg.heading}</h1>
                <p style="margin:0 0 8px;font-size:14px;color:rgba(126,200,216,0.7)">Hi ${name},</p>
                <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.7)">${msg.body}</p>
                ${status === "APPROVED" ? `
                <a href="https://connexode.vercel.app/auth/signin"
                  style="display:inline-block;background:#188080;color:#E8F4F8;text-decoration:none;
                         font-size:14px;font-weight:600;padding:12px 28px;border-radius:100px">
                  Go to my dashboard →
                </a>` : ""}
              </td></tr>
              <tr><td style="padding:20px 40px 28px;border-top:1px solid rgba(126,200,216,0.08)">
                <p style="margin:0;font-size:12px;color:rgba(126,200,216,0.3)">Connexode · connexode.vercel.app</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}
