// import express
const express = require('express');
// create new router
const router = express.Router();
// passport for authentication
const passport = require('passport');

// controller
const employeeController = require('../controllers/employeeController');

// to render the dashboard for an employee
router.get('/', passport.checkAuthentication, passport.isEmployee, employeeController.employee);

// for giving feedback to a fellow employee
router.post('/addReview', passport.checkAuthentication, passport.isEmployee, employeeController.addReview);

// export the router 
module.exports = router;