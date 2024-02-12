const { CreateModel, schema } = require("./Model");



const Tenant = CreateModel("Tenant", {
    userDetail: {
        type: schema.Types.ObjectId, ref: "Users",

    },
    houseDetail: {
        type: schema.Types.ObjectId, ref: "Property",
    },
    ouststanding_balance: {
        type: String,
    },
    createdBy: {
        type: schema.Types.ObjectId, ref: "Users",
    },
    otherdetail: {
        type: String,
    }
});
module.exports = Tenant;