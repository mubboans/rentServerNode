const express = require("express");
const { sendMail } = require("../controller/User_controller");
const { Login, Register, ForgotPassword, SendOTP, RegisterTenant } = require("../controller/authController");
const route = express.Router();

route.post('/auth/login', Login);
route.post('/auth/register', Register);
route.post('/auth/forgot-password', ForgotPassword);
route.post('/auth/otp', SendOTP);
route.post('/auth/macontact', sendMail);
route.patch('/auth/tenantsignup', RegisterTenant)

module.exports = route;