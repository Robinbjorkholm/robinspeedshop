import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
