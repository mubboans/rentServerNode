const { CreateModel, schema } = require("./Model");



const Payment = CreateModel("Payment", {
    houseid: {
        type: String,
        required: [true, "house name Required"],
        trim: true,
    },
    housedetail: {
        type: schema.Types.ObjectId, ref: "Property",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Price Required"],
        trim: true,
    },
    maintainance: {
        type: Number,
    },
    maintainanceremark: {
        type: String,
    },
    electricbill: {
        type: Number,
    },
    electricbillremark: {
        type: String,
    }
});
module.exports = Payment;