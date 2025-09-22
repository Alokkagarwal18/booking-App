import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.log("DB Connection Error:", err));

    await mongoose.connect(process.env.MONGODB_URI, {
  
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
