const express = require("express");
const { Login, Register, ForgotPassword, SendOTP } = require("../controller/authController");
const { getCategory, postCategory, updateCategory, deleteCategory } = require("../controller/CategoryController");
const route = express.Router();

route.route('/category').get(getCategory).post(postCategory).put(updateCategory).delete(deleteCategory);

module.exports = route;