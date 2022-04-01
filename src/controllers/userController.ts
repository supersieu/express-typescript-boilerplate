import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await models.User.find({})
        res.status(200).send(new ApiResponse( res.statusCode.toString(), users));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await models.User.findById({_id: req.params.id})
        if(user){
          res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
        }
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new models.User(req.body);
        await user.save()
        res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await models.User.findByIdAndUpdate(req.params.id, req.body,{new: true})
        res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await models.User.deleteOne({_id: req.params.id})
        res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
    } catch (error) {
      next(error);
    }
  },
};