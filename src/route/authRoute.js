const express = require("express");
const { getCategory, postCategory, updateCategory, deleteCategory } = require("../controller/CategoryController");
const { getTenant, postTenant, updateTenant, deleteTenant } = require("../controller/TenantController");
const { getProperty, postProperty, updateProperty, deleteProperty } = require("../controller/PropertyController");
const { getPayment, postPayment, updatePayment, deletePayment } = require("../controller/Payment");
const route = express.Router();

route.route('/category').get(getCategory).post(postCategory).put(updateCategory).delete(deleteCategory);
route.route('/tenant').get(getTenant).post(postTenant).put(updateTenant).delete(deleteTenant);
route.route('/property').get(getProperty).post(postProperty).put(updateProperty).delete(deleteProperty);
route.route('/payment').get(getPayment).post(postPayment).put(updatePayment).delete(deletePayment);

module.exports = route;