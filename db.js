import mongoose from"mongoose";

const URL = process.env.MONGODB_URL || process.env.MONGO_URI;
if (!URL) {
  throw new Error(
    "Missing MongoDB connection URL. Set MONGODB_URL (or MONGO_URI) in your .env."
  );
}

export const connectDB=async()=>{
    try{
        await mongoose.connect(URL);
        console.log("connected to database");
    }catch(error){
        console.error("connection fail",error);
        process.exit(1);
    }
}

export default connectDB;