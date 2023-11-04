import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("Mongoose URI not provided");

  if (isConnected) return console.log();

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    isConnected = true;

    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.log(error);
  }
};
