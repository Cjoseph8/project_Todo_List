const nodemailer = require("nodemailer");
require("dotenv").config();

//const asyncHandler = require("express-async-handler");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.service,
    port: 587,
    secure: false,
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailpassWord,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.mailUser,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log("Message sent: %s", info.messageId);
    
  }
  main().catch(console.error);
};


module.exports = { sendEmail };