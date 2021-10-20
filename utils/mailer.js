const nodemailer = require("nodemailer");

const randomPassword = () => {
  const d = new Date();
  console.log(d.getTime());
  return d.getTime().toString().slice(0, 6);
};

exports.mailer = async function sendMail(
  subject = "From Thuancutee (:",
  receivers = ""
) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  // send mail with defined transport object
  const mailContent = randomPassword();
  const info = await transporter.sendMail({
    // from: "123@gmail.com",
    to: receivers,
    subject,
    text: mailContent, //
    html: `<b>${mailContent}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
