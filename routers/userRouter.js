const express = require('express');
const { createUser,
     login,
     signOut, 
    verifyEmail, 
    resendVerificationEmail,
     changePassword, 
    resetPassword,
     forgotPassword, 
    getAllUsers, 
    deleteUser,
     getOneUser 

} = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/authorization');
const router = express.Router();

// Get all users route for Admin
router.get('/user/all', authenticate, isAdmin, getAllUsers);
// get one user
router.get('/user/one/:userId', getOneUser);
// Delete a user for admin
router.delete('/user/one/:userId', authenticate, isAdmin, deleteUser);

router.route('/user/sign-up').post(createUser)

router.route('/user/log-in').post(login)

router.route('/log-out/:userId').post(authenticate, signOut)

router.route("/user/verifyemail/:token")
    .get(verifyEmail);

router.route("/user/resendverificationemail")
    .post(resendVerificationEmail);

router.route('/user/change-password/:token')
    .post(changePassword);

router.route('/user/reset-password/:token')
    .post(resetPassword);

router.route('/user/forgot-password')
    .post(forgotPassword);

module.exports = router;
