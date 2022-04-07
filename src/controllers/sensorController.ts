import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

function convert(rawValue: number, type: String){
  switch(type){
    case "TEMPERATURE":
      return (75 * rawValue)/1023 -20;
    case "HUMIDITY":
      return (100 * rawValue)/1023;
    case "BARO":
      return (200 * rawValue)/1023 + 950;
    case "PROXIMITY":
      if(rawValue){
        return "Actif";
      }
      else{
        return "Inactif";
      }
    default:
      return "Invalide sensor"
  }
}

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensors = await models.Sensor.find({type:req.query.type});
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensors));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.findById({_id: req.params.id});
      if (sensor)
        res.status(200).send(new ApiResponse( res.statusCode.toString(), sensor));
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = new models.Sensor(req.body);
      await sensor.save();
      res.status(200).send(new ApiResponse( res.statusCode.toString(), sensor));
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