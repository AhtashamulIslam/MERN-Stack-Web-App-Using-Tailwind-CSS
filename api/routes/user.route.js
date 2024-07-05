import express from "express";
import { test,updateUser} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
         // Once the user is verified, the next() will be invoked updateUser and user 
            // will be attatched to the request body as user.
export default router