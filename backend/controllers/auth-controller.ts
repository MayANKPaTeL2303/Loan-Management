import { Request, Response } from 'express';
import UserLoanModel from '../model/user-loan';

export const createLoanApplication = async (req: Request, res: Response) => {
  try {
    const { username, loanamount, loantenure, employmentstatus, employmentaddress, reasonforloan, consent1, consent2 } = req.body;
    if(consent1 && consent2)
    {
      const newLoan = new UserLoanModel({ username, loanamount, loantenure,employmentstatus, employmentaddress, reasonforloan,consent1, consent2 });
      await newLoan.save();
    }
    
    res.status(201).json({ message: 'Loan application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit loan application.', error });
  }
};

// Get all loan applications (for dashboard)
export const getLoanApplications = async (req: Request, res: Response) => {
  try {
    const loans = await UserLoanModel.find();
    res.status(200).json(loans)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve loan applications.', error });
  }
};

