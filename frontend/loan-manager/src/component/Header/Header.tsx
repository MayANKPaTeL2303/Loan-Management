import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import "./Header.css";

interface HeaderProps {
  className?: string; 
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const redirecttohome = () => {
    navigate("/");
  };

  const [totalLoanAmount, setTotalLoanAmount] = useState<number>(0);
  const [totalUser,setTotalUser] = useState<number>(0);
  const [totalUniqueUser, setTotalUniqueUser] = useState<number>(0);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/loans/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch sum');
        }
        const data = await response.json();
        const sum = data.totalLoanAmount;
        const totaluser = data.totalUsers;
        const totaluniqueuser = data.totalUniqueUsers;
        setTotalUniqueUser(totaluniqueuser)
        setTotalUser(totaluser)
        setTotalLoanAmount(sum);
      } catch (error) {
        console.error('Error fetching loans sum:', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="header-container">
      <header className={className}>
        <div className="header-balance">
          <div className="header-balance">
            <span className="title">Active Loans</span>
            <span className="amount"> {totalUser}</span>
          </div>
          <div className="header-balance">
            <span className="title">Total Borrowers</span>
            <span className="amount">{totalUniqueUser} </span>
          </div>
          <div className="header-balance">
            <span className="title">Total Loans Amount</span>
            <span className="amount">{totalLoanAmount}</span>
          </div>
          <div className="header-balance">
            <span className="title">Cash Distributed</span>
            <span className="amount">{totalLoanAmount}</span>
          </div>
          <div className="header-balance">
            {/* Assumption that the initial amount is 100000000(10 crores) */}
            <span className="title">Remaining Cash</span>
            <span className="amount">{100000000 - totalLoanAmount}</span>
          </div>
        </div>
        <button onClick={redirecttohome} className="header-button">
          Get A Loan
        </button>
      </header>
    </div>
  );
};

export default Header;
