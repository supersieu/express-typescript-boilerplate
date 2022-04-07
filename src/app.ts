import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";

// Routers
import userRouter from "./routes/userRouter";
import actuatorRouter from "./routes/actuatorRouter";
import sensorRouter from "./routes/sensorRouter";
const {ApiResponse} = require('./modules/Response');
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/actuator", actuatorRouter);
app.use("/sensor", sensorRouter);
// catch 404
app.use(function (req: Request, res: Response, next: NextFunction) {
  // handle it how it pleases you
  res.status(404).json({ message: "not_found" });
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(new ApiResponse(res.statusCode,undefined, err));
});

export default app;
