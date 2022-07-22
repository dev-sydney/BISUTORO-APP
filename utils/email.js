const nodemailer = require('nodemailer');
const HtmlToText = require('html-to-text');
const welcomeTemplate = require('./../emailTemplates/emailTemplate');

class Email {
  constructor(user, url) {
    this.user = user;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Sydney Agbenu ${process.env.EMAIL_FROM}`;
    // console.log(this.user);
  }
  createNewTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid transport
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
        port: process.env.SENDGRID_PORT,
      });
    }
    //mailtrap transport
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  /**
   * This function is responsible for setting some sendMail options of the transporter and calls the function that sends the email to the client
   * @param {String} subject The subject of the email
   * @param {String} action The text that will be rendered inside the call to action btn inside of the actual email itself
   * @param  {...any} paragraphs The text that will be contained inside of the email
   */
  async send(subject, action, ...paragraphs) {
    //HTML Email template
    let html = welcomeTemplate(
      subject,
      this.firstName,
      this.url,
      action,
      paragraphs[0],
      paragraphs[1]
    );
    //define the options
    const msgOptions = {
      from: this.from,
      to: this.user.email,
      subject,
      html,
      text: HtmlToText.htmlToText(html),
    };
    //Create the transport and send the email
    await this.createNewTransport().sendMail(msgOptions);
  }
  //SEND THE WELCOME EMAIL WHENEVER A USER SIGNS UP
  async sendWelcomeMail() {
    let firstParagraph = 'Welcome to Bisutoro, we are excited to have you 🎊🥳';
    let secondParagraph = `We're all like family here, so upload your user photo so we can get to know you better!`;

    await this.send(
      'Welcome to the bisutoro Family!',
      'Upload your photo',
      firstParagraph,
      secondParagraph
    );
  }
  //SEND A PASSWORD RESET EMAIL WHENEVER A USER FORGETS THEIR PASSWORD
  async sendPasswordResetMail() {
    let firstParagraph = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${this.url}`;
    await this.send(
      'Password Reset Valid for only 10 minutes',
      'Reset your password',
      firstParagraph
    );
  }
}

module.exports = Email;
