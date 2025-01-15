import nodemailer from "nodemailer";

export const sendCreatePasswordEmail = async (email: string, userId: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const createPasswordUrl = `${process.env.FRONTEND_URL}/create-password?userId=${userId}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Create Your Account Password",
    html: `<p>Click the link below to create your password:</p>
           <a href="${createPasswordUrl}">${createPasswordUrl}</a>`,
  };

  await transporter.sendMail(mailOptions);
};
