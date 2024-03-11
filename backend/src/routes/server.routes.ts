import express from "express";
const router = express.Router();

// controllers
import {
	checkServer
} from '../controllers/server.controller';

router.get('/check',
	checkServer);




export default router;
