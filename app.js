require('dotenv').config();
const port = process.env.PORT;
const db = require('./src/dbConfig/dbConfig')
const mongoDBUrl = process.env.DBURL;
const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
var morgan = require('morgan');
// const { faker } = require('@faker-js/faker');
const app = express();

const auth_route = require('./src/route/authRoute')
const non_auth_route = require('./src/route/nonAuthRoute');

const apiErrorHandler = require('./src/error/apiError');
const { ValidateRequestWihToken } = require('./src/utils/jwt');
const route_not_Found = require('./src/utils/route_not_found');



app.use(morgan('combined',))
const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'], // Add any other headers that you want to expose
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(fileupload());
app.get('/life-check', (req, res) => {
    // res.render('donation')
    res.status(200).send('Hello World!  From Mubashir');
})
app.use('/apna-rent/v1', cors(corsOptions), non_auth_route);
app.use('/apna-rent/v1', ValidateRequestWihToken, auth_route)

// app.use(apiErrorResponse);
app.use(apiErrorHandler);
console.log('running after the return');
app.use(route_not_Found)
// async function createRandomUsers(count = 10) {
//     try {
//         let userArr = [];
//         for (var i = 0; i < count; i++) {
//             let pass = faker.internet.password();
//             console.log('random', '7' + getRandomNumber(6, 9) + getRandomNumber(0, 9) + getRandomNumber(100000, 999999),) + '0';
//             let obj = {
//                 name: faker.person.fullName(),
//                 password: pass,
//                 confirmpassword: pass,
//                 email: faker.internet.email(),
//                 contact: '7' + getRandomNumber(6, 9) + getRandomNumber(0, 9) + getRandomNumber(100000, 999999) + '0',
//                 DOB: '1980/12/20'
//             }
//             userArr.push(obj);
//         }

//         await User.create(userArr)
//         console.log('Users Created');
//     } catch (error) {
//         console.log('Error creating user: ' + error.message);
//     }
// }
// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// createRandomUsers(20);
app.listen(port, async () => {
    try {
        console.log(mongoDBUrl, 'mongoDBUrl');
        await db(mongoDBUrl)
        console.log(`Listening on port ${port}`);
    }
    catch (err) {
        console.log(err, 'error');
    }
})

