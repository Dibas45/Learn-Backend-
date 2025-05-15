const express = require("express");
const {getAllUsers,createUser,getUser,resizeUserPhoto,updateUser,deleteUser,updateMe,deleteMe,getMe} = require("../controllers/userController");
const {login,signup,forgotPassword,resetPassword,updatePassword,protect, restrictTo,logout} = require("../controllers/authController");


const router=express.Router();

router.post("/signup",signup)
router.post("/login",login);
router.get("/logout",logout); // Logout route

router.post("/forgotPassword",forgotPassword);
router.patch("/resetPassword/:token",resetPassword);
router.patch("/updatePassword",resizeUserPhoto,protect,updatePassword);

router.use(protect); // Protect all routes after this middleware

router.get("/me",getMe,getUser);
router.patch("/updateMe",updateMe);
router.delete("/deleteMe",deleteMe);

router.use(restrictTo("admin")); // Restrict all routes after this middleware
router
.route("/")
.get(getAllUsers)
.post(createUser);

router
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser);



module.exports=router; 