const express = require("express");
const {getAdmins, addAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin-controller'); 

const router = express.Router();

router.get('/', getAdmins);

router.post('/', addAdmin);

router.patch('/:adminId', updateAdmin);

router.delete('/:adminId', deleteAdmin);

module.exports=router;