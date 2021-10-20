const nodemailer = require("nodemailer");

// class EmailService {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       auth: {
//         user: process.env.ADMIN_EMAIL,
//         pass: process.env.ADMIN_PASSWORD,
//       },
//     });
//   }

//   async sendMail(from, to, subject, text, html) {
//     await this.transporter.sendMail({
//       from,
//       to,
//       subject,
//       text,
//       html,
//     });
//   }
// }

class EmailService {
  transporter;
  static init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });
  }

  static async sendMail(to, subject, text, html) {
    await this.transporter.sendMail({
      to,
      subject,
      text,
      html,
    });
  }
}

module.exports = EmailService;
