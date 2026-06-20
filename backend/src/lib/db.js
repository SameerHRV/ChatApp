import mongoose from "mongoose";
import { configdb } from "../config/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", () => {
      console.log("Error to connecting mongodb database");
    });

    const connectionInstance = await mongoose.connect(configdb.mongodbUri, {
      dbName: configdb.mongodbDbName,
    });
    console.log(
      "MONGODB CONNECTION !! HOST => ",
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connectDB;
