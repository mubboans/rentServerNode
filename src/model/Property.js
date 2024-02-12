const { CreateModel, schema } = require("./Model");



const Property = CreateModel("Property", {
    categoryDetail: {
        type: schema.Types.ObjectId, ref: "Category",
        required: true,
    },
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
    },
    createdBy: {
        type: schema.Types.ObjectId, ref: "User",
        required: [true, 'Created by Required'],
    }
});
module.exports = Property;