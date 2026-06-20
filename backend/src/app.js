import { clerkMiddleware } from "@clerk/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import config from "./config/config.js";

const app = express();

const limit = "50mb";

app.use(
  cors({
    origin: config.cors,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: limit,
    extended: true,
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: limit,
  }),
);
app.use(cookieParser());
app.use(clerkMiddleware());
const publicPath = path.join(process.cwd(), "public");

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

import { globalAsnycErrorHandler } from "./utils/globalAsnycErrorHandler.js";

// error handler
app.use(globalAsnycErrorHandler);

export default app;
