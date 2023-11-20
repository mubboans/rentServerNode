require('dotenv').config();
const port = process.env.PORT;
const db = require('./src/dbConfig/dbConfig')
const mongoDBUrl = process.env.DBURL;
const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const notFound = require('./src/utils/route_not_Found');
const apiErrorResponse = require('./src/error/errorHandler')
const app = express();
// const checkUserisAdmin = require('./src/middleware/admincheck')
app.use(bodyParser.json());
app.use(fileupload());
const auth_route = require('./src/route/authRoute')
const non_auth_route = require('./src/route/nonAuthRoute');
const { verifyUserToken } = require('./src/middleware/requestValidator');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))
app.get('/life-check', (req, res) => {
    // res.render('donation')
    res.status(200).send('Hello World!  From Mubashir');
})
// app.use('/apna-rent/v1', auth_route);
// app.use('/apna-rent/v1', verifyUserToken, non_auth_route)

app.use(apiErrorResponse);
app.use(notFound)
app.listen(port, async () => {
    try {
        await db(mongoDBUrl)
        console.log(`Listening on port ${port}`);
    }
    catch (err) {
        console.log(err, 'error');
    }
})