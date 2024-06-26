const mongoose = require('mongoose');
const schema = mongoose.Schema


const UserModel = new schema({
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
    role: {
        type: String,
        enum: ['owner', 'user', 'admin', 'rental', 'tenant'],
        default: 'owner'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profileImg: {
        type: String,
        default: 'https://ucarecdn.com/0d26e991-266c-491f-a842-6e2874527e9a/userprofile.jpg'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })
UserModel.virtual("age").get(function () {
    const today = new Date();
    const DOB = this.DOB;
    let age = today.getFullYear() - DOB.getFullYear();
    if (today.getMonth < DOB.getMonth || today.getMonth() == DOB.getMonth && today.getDate() < DOB.getDate()) {
        age--;
    }
    return age;
})
module.exports = mongoose.model('Users', UserModel)