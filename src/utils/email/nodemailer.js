const nodemailer = require("nodemailer");

async function sendEmail(body) {
  const transporter = new nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.SMTP_FROMADDRESS,
    subject: body.subject,
    to: body.to,
    html: body.message,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err instanceof Error) {
      console.error(`Cannot sent email to ${mailOptions.to} because of ${err.message}`);
      return;
    }
    console.log(`Email sent to ${mailOptions.to} with status: ${info.response}`);
  })
}

module.exports = sendEmail;