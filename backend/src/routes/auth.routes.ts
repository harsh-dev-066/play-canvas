import express from "express";
const router = express.Router();
import { authenticateUser } from '../middlewares/authentication.middleware'

// controllers
import {
	Register, Login, Logout
} from '../controllers/auth.controller';

router.post('/register',
	Register);

router.post(
	'/login',
	Login
);
router.get(
	'/logout',
	authenticateUser,
	Logout
);


export default router;
