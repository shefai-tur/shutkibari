import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string,
) => {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Shutki Ecommerce" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - Shutki Ecommerce",

    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome to Shutki Ecommerce, ${name}!</h2>

        <p>
          Thank you for creating your account.
          Please verify your email address.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#000;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>
          This verification link will expire in 15 minutes.
        </p>
      </div>
    `,
  });
};