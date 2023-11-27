const Mailgen = require('mailgen');
const nodemailer = require("nodemailer");
let config = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSCODE
    }
}
let transporter = nodemailer.createTransport(config);
let mailGenerator = new Mailgen({
    theme: "default", product: {
        link: 'https://mailgen.js/',
        name: 'Apna Rent', logo: "https://ucarecdn.com/3cd319fc-7bf7-4f2c-ac88-7e7766ca386d/apnarentlogo.jpg", logoHeight: '100px'
    }
});
async function createMail(body, recieveremail, subject) {
    let emailBody = mailGenerator.generate(body)

    let message = {
        from: process.env.MAIL,
        to: recieveremail,
        subject: subject,
        html: emailBody
    }
    return transporter.sendMail(message).then(() => {
        console.log(config, 'tab data check');
        return true;
    }).catch((err) => {
        console.log(err, '60');
        return false;
    })
}
module.exports = createMail;