const express = require('express');
const userRoute = express.Router();
const UserController = require('../Controllers/userController');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

userRoute.route('/signup').post(upload.single('profile-file'),UserController.addData);
userRoute.route('/login').get(UserController.loginUser);
userRoute.route('/update').post(UserController.updateUser);
userRoute.route('/getAllUsers').get(UserController.getAllUser);
// userRoute.route('/login').post(UserController.verifyData);
module.exports = userRoute;