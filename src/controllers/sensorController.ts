import { Database } from "@/modules/Database";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../modules/Response";

let database=new Database;

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.get("sensor",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.getById("sensor",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body.rawValue === "boolean"){
        req.body.rawValue = req.body.rawValue ? 1 : 0;
      }
      const data=await database.post("sensor",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body.rawValue === "boolean"){
        req.body.rawValue = req.body.rawValue ? 1 : 0;
      }
      const data=await database.patch("sensor",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.delete("sensor",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {message:data}));
      return;
    } catch (error) {
      next(error);
    }
  },
};
