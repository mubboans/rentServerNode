const express = require("express");
const { Login, Register, ForgotPassword, SendOTP } = require("../controller/authController");
const route = express.Router();

route.post('/auth/login', Login);
route.post('/auth/register', Register);
route.post('/auth/forgot-password', ForgotPassword);
route.post('/auth/otp', SendOTP);

module.exports = route;