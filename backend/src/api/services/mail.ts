import { User } from "@/types/api/common";
import { generateOtp, generateTokenHash } from "../utils/token";
import { sendEmail } from "../utils/mail";
import { MailOptions } from "nodemailer/lib/json-transport";

export async function sendConfirmationEmail(user: User) {
  const otp = generateOtp(6);
  const token = generateTokenHash(user.email, otp);
  const sentAt = new Date();

  const email: MailOptions = {
    to: user.email,
    subject: "Email Confirmation",
    text: `
    Hello ${user.email},
    Please confirm your email by clicking the following link:
    http://localhost:3000/auth/verify/${token}
    `,
  };

  await sendEmail(email);

  return {
    otp,
    token,
    sentAt,
  };
}
