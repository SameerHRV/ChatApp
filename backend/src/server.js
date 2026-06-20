import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./lib/db.js";
import job from "./lib/cron.js";

const startServer = async () => {
  try {
    const port = config.port;

    connectDB()
      .then(() => {
        app.listen(port, () => {
          console.log(`server start at port http://localhost:${port}`);
        });
      })
      .catch((error) => {
        console.log("Mongo db connection failed", error);
      });
    if (process.env.NODE_ENV === "production") {
      job.start();
    }
  } catch (error) {
    console.log("Server error", error);
  }
};

startServer();
