import express, { Request, Response } from 'express';
import { createLoanApplication, getLoanApplications } from '../controllers/auth-controller';
import { sumTotalLoan } from '../controllers/statistics';

const router = express.Router();

router.post("/", createLoanApplication);

router.get("/", getLoanApplications);

router.get("/dashboard",sumTotalLoan)


export default router;
