
const nodemailer = require("nodemailer");
let config = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSCODE
    }
}
let transporter = nodemailer.createTransport(config);

async function createMail(body, recieveremail, subject) {
    let message = {
        from: process.env.MAIL,
        to: recieveremail,
        subject: subject,
        html: body
    }
    return transporter.sendMail(message).then(() => {
        // console.log(config, 'tab data check');
        return true;
    }).catch((err) => {
        console.log(err, '60');
        return false;
    })
}
module.exports = createMail;