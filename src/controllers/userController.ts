import { NextFunction, Request, Response } from "express";
import models from "../models";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.find({}, function(err, users) {
            res.send(users);  
          });
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.findById({_id: req.params.id}, function(err: any, user: any) {
            res.send(user);
          });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const user1 = new models.User(req.body);
        await user1.save();
        res.send(user1)
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await models.User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(user)
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
        await models.User.deleteOne({_id: req.params.id})
      return;
    } catch (error) {
      next(error);
    }
  },
};