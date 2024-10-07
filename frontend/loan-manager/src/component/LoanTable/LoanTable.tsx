import React from 'react';
import './LoanTable.css'; 

interface Loan {
  username: string;
  loanamount: string;
  loantenure: string;
  employmentstatus: string;
  reasonforloan: string;
  employmentaddress: string;
  consent1: boolean;
  consent2: boolean;
}

interface LoanTableProps {
  loans: Loan[];
}

const LoanTable: React.FC<LoanTableProps> = ({ loans }) => {
  return (
    <div className="overflow-x-auto">
      <table className="loan-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Loan Amount</th>
            <th>Loan Tenure</th>
            <th>Employment Status</th>
            <th>Reason for Loan</th>
            <th>Employment Address</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.username}</td>
              <td>{loan.loanamount}</td>
              <td>{loan.loantenure}</td>
              <td className={`status-${loan.employmentstatus.toLowerCase()}`}>{loan.employmentstatus}</td>
              <td>{loan.reasonforloan}</td>
              <td>{loan.employmentaddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
