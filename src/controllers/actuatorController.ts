import { Database } from "@/modules/Database";
import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";
import {
  ActuatorPostSchema,
  ActuatorUpdateSchema,
} from "../types/actuatorSchema";
let database=new Database;
var xss = require("xss");
export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.get("actuator",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.getById("actuator",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.post("actuator",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const data=await database.patch("actuator",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.delete("actuator",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {message:data}));
      return;
    } catch (error) {
      next(error);
    }
  },
};
