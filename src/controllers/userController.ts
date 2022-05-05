import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../modules/Response";
import { Database } from "../modules/Database";

let database=new Database;
export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.get("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(),{data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.getById("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.post("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.patch("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.delete("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), {data}));
      return;
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.login("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;      
    } catch (error) {
      next(error);
    }
  },
};
