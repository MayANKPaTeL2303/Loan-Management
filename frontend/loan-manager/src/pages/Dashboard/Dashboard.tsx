import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import LoanTable from '../../component/LoanTable/LoanTable';
import './Dashboard.css'; 


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

const Dashboard: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]); // State to store loans

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/loans');
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        const data = await response.json();
        setLoans(data); 
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="dashboard">
      <Header className="header" />
      <div className="container">
        <div className="button-group">
          <button className="button">Borrow Cash</button>
          <button className="button">Transact</button>
          <button className="button">Deposit Cash</button>
        </div>
        <LoanTable loans={loans} />
      </div>
    </div>
  );
};

export default Dashboard;
