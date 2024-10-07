import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import loanRoutes from './routes/loanRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/loans", loanRoutes);

const PORT = 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error: ", error);
    process.exit(1);
  });
