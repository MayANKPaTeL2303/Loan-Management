import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    loanamount: string,
    loantenure: string,
    employmentstatus: string,
    reasonforloan: string,
    employmentaddress: string,
    consent1: boolean,
    consent2: boolean
  }

const UserLoanSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  loanamount: {
    type: String,
    required: [true, "Loan Amount is required"],
  },
  loantenure: {
    type: String,
    required: [true,"Loan tenure is required"],
  },
  employmentstatus: {
    type: String,
    required: true,
  },
  reasonforloan: {
    type: String,
    required: true,
  },
  employmentaddress: {
    type: String,
    required: true,
  },
  consent1: {
    type: Boolean,
    default: false,
  },
  consent2: {
    type: Boolean,
    default: false,
  },
});

const UserLoanModel = (mongoose.models.User as mongoose.Model<User>) ||
mongoose.model<User>('UserLoan', UserLoanSchema);

export default UserLoanModel;
