// app/api/contact/route.ts
// Contact form API — sends two emails:
// 1. Notification to admin (you) with full message details
// 2. Auto-reply to sender confirming receipt
// Uses Resend (same as application emails)

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

// ── Your email — update this ──────────────────────────────────────────────────
const ADMIN_EMAIL = "ahmadkha8143@gmail.com";
const FROM_EMAIL  = "Connexode <noreply@connexode.com>"; // update with verified domain

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 }
      );
    }

    const sentAt = new Date().toLocaleString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    // ── 1. Admin notification email ───────────────────────────────────────
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject: `[Connexode Contact] ${subject} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#040C18;font-family:'Inter',Arial,sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:40px 20px">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:#082038;border-radius:16px;border:1px solid rgba(126,200,216,0.12);overflow:hidden">

                <tr><td style="background:#188080;height:4px"></td></tr>

                <tr><td style="padding:32px 40px">
                  <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#188080;font-weight:500">
                    New contact form submission
                  </p>
                  <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#E8F4F8">
                    ${subject}
                  </h2>

                  <!-- Sender details -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="background:rgba(4,12,24,0.5);border:1px solid rgba(126,200,216,0.1);border-radius:10px;margin-bottom:24px">
                    ${[
                      ["From",      name],
                      ["Email",     email],
                      ["Subject",   subject],
                      ["Sent at",   sentAt],
                    ].map(([label, val], i, arr) => `
                    <tr>
                      <td style="padding:12px 16px;font-size:11px;color:rgba(126,200,216,0.45);
                                 border-bottom:${i < arr.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none"};
                                 width:100px;vertical-align:top">${label}</td>
                      <td style="padding:12px 16px;font-size:13px;color:#E8F4F8;
                                 border-bottom:${i < arr.length - 1 ? "1px solid rgba(126,200,216,0.06)" : "none"}">${val}</td>
                    </tr>`).join("")}
                  </table>

                  <!-- Message -->
                  <p style="margin:0 0 8px;font-size:11px;color:rgba(126,200,216,0.4);letter-spacing:1px;text-transform:uppercase">
                    Message
                  </p>
                  <div style="background:rgba(4,12,24,0.5);border:1px solid rgba(126,200,216,0.1);
                              border-radius:10px;padding:16px;font-size:14px;color:rgba(126,200,216,0.75);
                              line-height:1.7;white-space:pre-wrap">
                    ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                  </div>

                  <!-- Reply button -->
                  <div style="margin-top:24px">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                      style="display:inline-block;background:#188080;color:#E8F4F8;text-decoration:none;
                             font-size:13px;font-weight:600;padding:11px 24px;border-radius:100px">
                      Reply to ${name} →
                    </a>
                  </div>
                </td></tr>

                <tr><td style="padding:16px 40px 24px;border-top:1px solid rgba(126,200,216,0.08)">
                  <p style="margin:0;font-size:11px;color:rgba(126,200,216,0.25)">
                    Connexode Admin · connexode.vercel.app
                  </p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── 2. Auto-reply to sender ───────────────────────────────────────────
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      email,
      subject: `We got your message — Connexode`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#040C18;font-family:'Inter',Arial,sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:40px 20px">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:#082038;border-radius:16px;border:1px solid rgba(126,200,216,0.12);overflow:hidden">

                <tr><td style="background:#188080;height:4px"></td></tr>

                <tr><td style="padding:40px">
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;
                             color:#188080;font-weight:500">Connexode</p>
                  <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#E8F4F8">
                    Message received, ${name}.
                  </h2>
                  <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.65)">
                    Thanks for reaching out. We have received your message about
                    <strong style="color:#7EC8D8">"${subject}"</strong> and will
                    get back to you within <strong style="color:#7EC8D8">1–2 business days</strong>.
                  </p>
                  <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:rgba(126,200,216,0.5)">
                    While you wait, feel free to explore our programs or follow us on social media.
                  </p>

                  <!-- Quick links -->
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:8px">
                        <a href="https://connexode.vercel.app/join"
                          style="display:inline-block;background:#188080;color:#E8F4F8;text-decoration:none;
                                 font-size:13px;font-weight:600;padding:10px 20px;border-radius:100px">
                          Join Connexode
                        </a>
                      </td>
                      <td>
                        <a href="https://connexode.vercel.app/services"
                          style="display:inline-block;background:transparent;color:#7EC8D8;text-decoration:none;
                                 font-size:13px;font-weight:500;padding:10px 20px;border-radius:100px;
                                 border:1px solid rgba(126,200,216,0.25)">
                          Our services
                        </a>
                      </td>
                    </tr>
                  </table>
                </td></tr>

                <tr><td style="padding:16px 40px 24px;border-top:1px solid rgba(126,200,216,0.08)">
                  <p style="margin:0;font-size:11px;color:rgba(126,200,216,0.25)">
                    Connexode · Campus Talent Network · Pakistan<br>
                    <a href="https://connexode.vercel.app"
                      style="color:rgba(126,200,216,0.25)">connexode.vercel.app</a>
                  </p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
