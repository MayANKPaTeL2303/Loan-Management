import { Request, Response } from 'express';
import UserLoanModel from '../model/user-loan';

export const sumTotalLoan = async (req: Request, res: Response) => {
  try {
    const totalUsers = await UserLoanModel.countDocuments(); 
    const uniqueUsers = await UserLoanModel.distinct('username');
    const totalUniqueUsers = uniqueUsers.length;

    const totalloanamount = await UserLoanModel.collection.aggregate([
      {
        $group: {
          _id: null,       
          total: { $sum: {$toDouble: "$loanamount"} }  
        }
      }
    ]).toArray();

    if (totalloanamount.length > 0) {
      const totalLoanAmount = totalloanamount[0].total;
      res.json({ totalLoanAmount,totalUsers,totalUniqueUsers });
    } else {
      res.status(404).json({ message: "No loan data found" });
    }
  } catch (error) {
    console.error("Error calculating total loan amount:", error);
    res.status(500).json({ error: "An error occurred while calculating the total loan amount." });
  }
};
