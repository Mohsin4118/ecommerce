import express from "express";
import {isAdmin, requireSignin} from '../middlewares/authMiddleware.js'
import {registerController,
        loginController,
        testController,
        forgetPasswordController,
        updateProfileController,
        getOrderController
    } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', requireSignin,isAdmin, testController)
router.post('/forget-password', forgetPasswordController)
router.get('/user-auth', requireSignin, (req, res)=>{
res.status(200).send({ok:true})
})
router.get('/admin-auth', requireSignin, isAdmin, (req, res)=>{
    res.status(200).send({ok:true})
    })
router.put('/profile', requireSignin, updateProfileController)
//get order controller
router.get('/orders', requireSignin, getOrderController)

export default router