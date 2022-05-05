import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";
import { Database } from "../modules/Database";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  UserPostSchema,
  UserLoginSchema,
  UserUpdateSchema,
} from "../types/userSchema";
import { load } from "ts-dotenv";
import { clear } from "console";
import { emit } from "process";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});
let database=new Database;
export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.get("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(),data));
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.getById("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.post("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.patch("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data));

      
      
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=await database.delete("user",req);
      res.status(200).json(new ApiResponse(res.statusCode.toString(), data?.toString));

      
      
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
