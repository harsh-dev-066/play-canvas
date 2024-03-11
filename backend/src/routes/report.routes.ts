import express from "express";
const router = express.Router();

// middlewares
import { processMulter, upload } from '../middlewares/image.upload.middleware'
import { authenticateUser } from '../middlewares/authentication.middleware'

// controllers
import {
	createReport,
	getReportById,
	getReportList,
	deleteReport
} from '../controllers/report.controller';

router.post('/create',
	authenticateUser,
	processMulter.single('image'),
	upload,
	createReport);

router.get(
	'/get-report/:reportId',
	authenticateUser,
	getReportById
);

router.post(
	'/get-all',
	authenticateUser,
	getReportList
);

router.delete(
	'/delete/:reportId',
	authenticateUser,
	deleteReport
);

export default router;
