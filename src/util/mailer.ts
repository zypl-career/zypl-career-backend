import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'verify@zypl.ai',
    pass: '!Zypl12345678',
  },
});
