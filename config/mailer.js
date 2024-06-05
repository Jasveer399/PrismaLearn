import nodemailer from "nodemailer";
import dotenv from "dotenv";
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c5f598bd27668f",
      pass: "accc8cf45adcd5"
    }
  });

export const sendEmail = async (sender, subject) => {
  const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #007bff;">Hello, World!</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              This is a sample email body. You can customize this HTML to suit your needs.
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
              Best regards,<br/>
              Your Company Name
            </p>
          </div>
        </body>
      </html>
    `;

  const info = await transport.sendMail({
    from: process.env.FROM_EMAIL, // sender address
    to: sender, // list of receivers
    subject: subject, // Subject line
    html: htmlContent, // html body
  });
};
