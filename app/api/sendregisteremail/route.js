import { Resend } from "resend";
import { render } from "@react-email/render"; // Ensure this is correctly installed
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    
    console.log("Sending email to", name, email);

    // Define the email HTML template
    const emailHtml = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #ff7900;
          }
          .footer {
            font-size: 12px;
            color: #777;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Welcome to Foode Alert, ${name}!</h2>
          <p>Thank you for signing up for Foode Alert. You are now subscribed to receive updates from your favorite food trucks.</p>
          <p>Stay tuned for notifications about their latest locations, menu updates, and special offers.</p>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Happy eating! 🍽️</p>
          <br>
          <p>Best,</p>
          <p>The Foode Alert Team</p>
          <div class="footer">
            <p>&copy; 2025 Foode Alert. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email using Resend API
    const data = await resend.emails.send({
      from: "Vamsi Tej Chowdary <hello@vamsitejchowdary.com>",
      to: email,
      subject: "Welcome to Foode Alert!",
      html: emailHtml,
      headers: {
        "Reply-To": "dabbarvy@mail.uc.edu"
      }
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}