import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Form.css'

interface FormData {
  username: string;
  loanamount: string;
  loantenure: string;
  employmentstatus: string;
  reasonforloan: string;
  employmentaddress: string;
  consent1: boolean;
  consent2: boolean;
}

const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    loanamount: '',
    loantenure: '',
    employmentstatus: '',
    reasonforloan: '',
    employmentaddress: '',
    consent1: false,
    consent2: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/loans", formData);
      console.log("Loan application submitted successfully")
      alert("Loan application submitted successfully!");
      navigate('/dashboard')
    } catch (error) {
      console.error("Error submitting loan application", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">APPLY FOR A LOAN</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Full name as it appears on bank account</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full name as it appears on bank account"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loanamount" className="block text-sm font-medium text-gray-700">How much do you need?</label>
            <input
              type="text"
              id="loanamount"
              name="loanamount"
              value={formData.loanamount}
              onChange={handleChange}
              placeholder="How much do you need?"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-group">
            <label htmlFor="loantenure" className="block text-sm font-medium text-gray-700">Loan tenure (in months)</label>
            <input
              type="text"
              id="loantenure"
              name="loantenure"
              value={formData.loantenure}
              onChange={handleChange}
              placeholder="Loan tenure (in months)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="employmentstatus" className="block text-sm font-medium text-gray-700">Employment status</label>
            <input
              type="text"
              id="employmentstatus"
              name="employmentstatus"
              value={formData.employmentstatus}
              onChange={handleChange}
              placeholder="Employment status"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-group">
            <label htmlFor="reasonforloan" className="block text-sm font-medium text-gray-700">Reason for loan</label>
            <textarea
              id="reasonforloan"
              name="reasonforloan"
              value={formData.reasonforloan}
              onChange={handleChange}
              placeholder="Reason for loan"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="employmentaddress" className="block text-sm font-medium text-gray-700">Employment address</label>
            <input
              type="text"
              id="employmentaddress"
              name="employmentaddress"
              value={formData.employmentaddress}
              onChange={handleChange}
              placeholder="Employment address"
              required
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="form-group-checkbox flex items-start">
            <input
              type="checkbox"
              id="consent1"
              name="consent1"
              checked={formData.consent1}
              onChange={handleChange}
            />
            <label htmlFor="consent1" className="ml-2 block text-sm text-gray-700">
              I have read the important information and accept that by completing the application I will be bound by the terms.
            </label>
          </div>
          <div className="form-group-checkbox flex items-start">
            <input
              type="checkbox"
              id="consent2"
              name="consent2"
              checked={formData.consent2}
              onChange={handleChange}
            />
            <label htmlFor="consent2" className="ml-2 block text-sm text-gray-700">
              Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies.
            </label>
          </div>
        </div>

        <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
