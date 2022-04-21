import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";
import {
  ActuatorPostSchema,
  ActuatorUpdateSchema,
} from "../types/actuatorSchema";
var xss = require("xss");
export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let actuators = [];
      if (req.query.type) {
        actuators = await models.Actuator.find({ type: req.query.type });
      } else {
        actuators = await models.Actuator.find({});
      }
      res
        .status(200)
        .json(new ApiResponse(res.statusCode.toString(), actuators));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await models.Actuator.findById({ _id: req.params.id });
      if (actuator)
        res
          .status(200)
          .json(new ApiResponse(res.statusCode.toString(), actuator));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ActuatorPost = ActuatorPostSchema.parse(req.body);
      const acutator = new models.Actuator(ActuatorPost);
      await acutator.save();
      res
        .status(200)
        .json(
          new ApiResponse(res.statusCode.toString(), {
            message: "created",
            id: acutator.id,
          })
        );
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const ActuatorUpdate = ActuatorUpdateSchema.parse(req.body);
      const actuator = await models.Actuator.findByIdAndUpdate(
        req.params.id,
        ActuatorUpdate,
        { new: true }
      );
      res
        .status(200)
        .json(new ApiResponse(res.statusCode.toString(), actuator));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await models.Actuator.deleteOne({ _id: req.params.id });
      res
        .status(200)
        .json(
          new ApiResponse(res.statusCode.toString(), { message: "success" })
        );
    } catch (error) {
      next(error);
    }
  },
};
