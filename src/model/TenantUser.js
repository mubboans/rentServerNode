const mongoose = require('mongoose');
const schema = mongoose.Schema


const TenantUserModel = new schema({
    name: {
        type: String,
        trim: true,
        // unique: true,
    },
    password: {
        type: String,

        trim: true,
    },
    confirmpassword: {
        type: String,

        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    contact: {
        type: Number,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                const regex = /^[6-9]\d{9}$/;
                return regex.test(value);
            },
            message: 'Invalid contact number. Please provide a 10-digit number starting from 6 to 9.',
        },
    },

    DOB: {
        type: Date,
        min: '1980-01-01',
    },
    createdBy: {
        type: schema.Types.ObjectId, ref: "Users",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })
TenantUserModel.virtual("age").get(function () {
    const today = new Date();
    const DOB = this.DOB;
    let age = today.getFullYear() - DOB.getFullYear();
    if (today.getMonth < DOB.getMonth || today.getMonth() == DOB.getMonth && today.getDate() < DOB.getDate()) {
        age--;
    }
    return age;
})
module.exports = mongoose.model('TenantUser', TenantUserModel)