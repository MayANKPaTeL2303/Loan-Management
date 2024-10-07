import mongoose from 'mongoose';

const URI: string | undefined = process.env.MONGODB_URI;

const connectdb = async (): Promise<void> => {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }
    await mongoose.connect(URI);
    console.log("Successful connection to database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectdb;
