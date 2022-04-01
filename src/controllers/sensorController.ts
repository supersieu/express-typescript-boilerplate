import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensors = await models.Sensor.find({});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensors));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.findById({_id: req.params.id});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensor));
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acutator = new models.Sensor(req.body);
      await acutator.save();
      res.status(200).send(new ApiResponse( res.statusCode.toString(), acutator));
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.findByIdAndUpdate(req.params.id, req.body,{new: true});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensor));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.deleteOne({_id: req.params.id});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensor));
    } catch (error) {
      next(error);
    }
  },
};