const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/edituser/:id', userController.editUser);
router.patch('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);



module.exports =  router;