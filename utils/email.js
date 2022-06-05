const nodemailer = require('nodemailer');

class Email {
  constructor(user, msg) {
    this.user = user;
    this.msg = msg;
    // console.log(this.user);

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail() {
    const msgOptions = {
      from: `<Sydney Tetteh> ${process.env.EMAIL_FROM}`,
      to: this.user.email,
      subject: 'Reset password, valid for only 10 minutes',
      text: this.msg,
    };
    //console.log('sending...');
    await this.transporter.sendMail(msgOptions);
  }
}

module.exports = Email;
