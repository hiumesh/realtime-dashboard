import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const transporter = nodemailer.createTransport({
  host: process.env?.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(mailOptions: MailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
