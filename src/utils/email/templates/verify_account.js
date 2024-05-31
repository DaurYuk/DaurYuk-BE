const sendEmail = require("../nodemailer");

function sendVerifyAccountLink(verifyToken, toAddress) {
  const link = `${process.env.BASE_URL}/verify-account?token=${verifyToken}`;

  return sendEmail({
    to: toAddress,
    subject: "DaurYuk Account Registration Verification",
    message: `Hello our new customer, <br><br>Thanks for registering to our service. Before you using our services, please verify your account into this <a href="${link}">link</a>.<br><br>If is not working, you can paste to your browser.<br><a href=${link}>${link}</a>`
  })
}

module.exports = sendVerifyAccountLink;