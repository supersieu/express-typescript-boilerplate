import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  UserPostSchema,
  UserLoginSchema,
  UserUpdateSchema,
} from "../types/userSchema";
import { load } from "ts-dotenv";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await models.User.find({});
      res.status(200).json(new ApiResponse(res.statusCode.toString(), users));
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await models.User.findById({ _id: req.params.id });
      if (user) {
        res.status(200).json(new ApiResponse(res.statusCode.toString(), user));
      }
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPost = UserPostSchema.parse(req.body);
      userPost.password = await argon2.hash(userPost.password);
      const user = new models.User(userPost);
      await user.save();
      res.status(200).json(
        new ApiResponse(res.statusCode.toString(), {
          message: "created",
          id: user.id,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userUpdate = UserUpdateSchema.parse(req.body);
      const user = await models.User.findByIdAndUpdate(
        req.params.id,
        userUpdate,
        { new: true }
      );
      res.status(200).json(new ApiResponse(res.statusCode.toString(), user));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await models.User.deleteOne({ _id: req.params.id });
      res
        .status(200)
        .json(
          new ApiResponse(res.statusCode.toString(), { message: "success" })
        );
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userLogin = UserLoginSchema.parse(req.body);
      const user = await models.User.findOne({ email: userLogin.email }).select(
        "+password"
      );
      if (user) {
        if (await argon2.verify(user.password, userLogin.password)) {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            env.SECRET_KEY
          );
          const data = { message: "success", token: token };
          res
            .status(200)
            .json(new ApiResponse(res.statusCode.toString(), data));
        } else {
          res.status(401);
          next();
        }
      } else {
        res.status(404);
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
