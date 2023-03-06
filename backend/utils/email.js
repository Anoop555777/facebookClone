const nodemailer = require('nodemailer');
const fs = require('fs');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.first_name;
    this.url = url;
    this.from = 'Anoop Singh <ajbsiht99@gmail.com>';
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'Gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      // secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    let html = fs.readFileSync(
      `${__dirname}/../views/${template}.html`,
      'utf-8'
    );

    if (template === 'welcome') {
      html = html.replace('{%NAME%}', this.firstName);
      html = html.replace('{%url%}', this.url);
    }

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendVerified() {
    await this.send('welcome', `Please verified it you ${this.firstName}`);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'your password reset token valid for 10 min only'
    );
  }
};
