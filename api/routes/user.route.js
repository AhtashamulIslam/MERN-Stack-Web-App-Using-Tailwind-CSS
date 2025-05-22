import express from "express";
import { test,updateUser,deleteUser,signOut,getUsers,getUser} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
         // Once the user is verified, the next() will be invoked updateUser and user 
            // will be attatched to the request body as user.
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signOut)
router.get('/getusers',verifyToken,getUsers) // We will display a list of users. 
router.get('/:userId',getUser) // Here we get the user for public routes like comment sections. 

export default router

