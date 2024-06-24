const express=require("express");

const router=express.Router();

const authcontroll= require("../controller/auth-controller");
const schema=require("../validaters/auth-validaters");
const validate= require("../middleware/validate-middleware");
const authmiddleware=require("../middleware/authmiddleware");



router.post("/register",validate(schema.signupSchema),authcontroll.register);
router.post("/login", validate(schema.loginSchema),authcontroll.login);
router.post("/contact",validate(schema.contactSchema),authcontroll.contactform);
router.get("/services",authcontroll.services);
router.get("/user",authmiddleware,authcontroll.user);


module.exports= router;
