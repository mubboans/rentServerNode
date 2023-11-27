const mongoose = require('mongoose');
const db = (dburl) => {
    mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB Atlas' + dburl);
    }).catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
}


module.exports = db;