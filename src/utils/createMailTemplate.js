const Mailgen = require('mailgen');

const createMailgenBody = (body) => {
    let mailGenerator = new Mailgen({
        theme: "default", product: {
            link: process.env.FRONT_URL,
            name: 'Apna Rent', logo: "https://ucarecdn.com/3cd319fc-7bf7-4f2c-ac88-7e7766ca386d/apnarentlogo.jpg", logoHeight: '100px'
        }
    });
    let emailBody = mailGenerator.generate(body)
    return emailBody;
}

module.exports = createMailgenBody