import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let actuators=[];
      if(req.query.type){
        actuators = await models.Actuator.find({type:req.query.type});
      }else{ actuators = await models.Actuator.find({});}
      res.status(200).send(new ApiResponse( res.statusCode.toString(), actuators));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await models.Actuator.findById({_id: req.params.id});
      if (actuator)
        res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acutator = new models.Actuator(req.body);
      await acutator.save();
      res.status(200).send(new ApiResponse( res.statusCode.toString(), acutator));
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await models.Actuator.findByIdAndUpdate(req.params.id, req.body,{new: true});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await models.Actuator.deleteOne({_id: req.params.id});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
    } catch (error) {
      next(error);
    }
  },
};