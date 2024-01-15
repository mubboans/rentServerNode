const { CreateModel } = require("./Model");



const Property = CreateModel("Property", {
    housename: {
        type: String,
        required: [true, "house name Required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description Required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price Required"],
        trim: true,
    },
    aggreementDate: {
        type: Date,
    },
    deposit: {
        type: Number,
    },
    status: {
        type: String,
        required: [true, "Status Required"],
        trim: true,
    },
    remarks: {
        type: String,
    }
});
module.exports = Property;