const express=require("express");
const router=express.Router();
const authadmin=require('../controller/admin-controller');
const authmiddleware=require('../middleware/authmiddleware');
const adminmiddleware=require('../middleware/admin-middleware');

router.get('/user',authmiddleware,adminmiddleware,authadmin.getusersdata);
router.get('/user/:id',authmiddleware,adminmiddleware,authadmin.getsingleuserdata);
router.get('/contact',authmiddleware,adminmiddleware,authadmin.getcontactdata);
router.patch('/user/update/:id',authmiddleware,adminmiddleware,authadmin.updatesingleuserdata)
router.delete('/user/delete/:id',authmiddleware,adminmiddleware,authadmin.deleteuserdata);
router.delete('/contact/delete/:id',authmiddleware,adminmiddleware,authadmin.deletecontactdata);
    



module.exports= router;