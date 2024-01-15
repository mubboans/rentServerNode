const express = require("express");
const { Login, Register, ForgotPassword, SendOTP, RegisterTenant } = require("../controller/authController");
const route = express.Router();

route.post('/auth/login', Login);
route.post('/auth/register', Register);
route.post('/auth/forgot-password', ForgotPassword);
route.post('/auth/otp', SendOTP);
route.patch('/auth/tenantsignup', RegisterTenant)

module.exports = route;