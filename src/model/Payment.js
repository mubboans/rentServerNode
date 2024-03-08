const { CreateModel, schema } = require("./Model");



const Payment = CreateModel("Payment", {
    tenantdetail: {
        type: schema.Types.ObjectId, ref: "TenantUser",
        required: [true, "Tenant detail is required"],
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
        type: String,
    },
    electricbillremark: {
        type: String,
    },
    mode: {
        type: String,
    },
    type: {
        type: String,
    },
    collectedOn: {
        type: String,
    },
    createdBy: {
        type: schema.Types.ObjectId, ref: "User",
    }
});
module.exports = Payment;