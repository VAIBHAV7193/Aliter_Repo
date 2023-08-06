const express = require('express');
const { Create_User_Controller, Login_Controller, forgotPassword, Update_User, Delete_User, Get_All_User, Get_Single_User } = require('../Controller/authController');
const requireSignIn = require('../middleware/authMiddleware');

//created a router object 
const router = express.Router();
//register route
router.route('/registeruser').post(Create_User_Controller);
//login route
router.route('/loginuser').post(Login_Controller);
//forgot password route
router.route('/forgotpassword').post(forgotPassword);
//update user route and also added authentication
router.route('/updateuser/:id').put(requireSignIn,Update_User)
//delete user route and added authentication
router.route('/deleteuser/:id').delete(requireSignIn,Delete_User)
//get all user route
router.route('/getuser').get(Get_All_User)
//get single user route
router.route('/getuser/:id').get(Get_Single_User)





module.exports = router;