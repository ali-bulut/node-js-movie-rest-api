const express = require("express");
const {getAdmins, signUpAdmin, updateAdmin, deleteAdmin, loginAdmin} = require('../controllers/admin-controller'); 
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/', getAdmins);

router.post('/signup', signUpAdmin);

router.post('/login', loginAdmin);

router.use(checkAuth);

router.patch('/update/:adminId', updateAdmin);

router.delete('/delete/:adminId', deleteAdmin);

module.exports=router;