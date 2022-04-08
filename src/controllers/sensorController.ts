import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";
import { SensorPostSchema, SensorUpdateSchema } from "../types/sensorSchema";

function convert(rawValue: number, type: String) {
  switch (type) {
    case "TEMPERATURE":
      return (75 * rawValue) / 1023 - 20 + " °C";
    case "HUMIDITY":
      return (100 * rawValue) / 1023 + " %HR";
    case "BARO":
      return (200 * rawValue) / 1023 + 950 + " hPa";
    case "PROXIMITY":
      if (rawValue) {
        return "Actif";
      } else {
        return "Inactif";
      }
    default:
      return "Invalide sensor";
  }
}

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let sensors = [];
      if (req.query.type) {
        sensors = await models.Sensor.find({ type: req.query.type });
      } else {
        sensors = await models.Sensor.find({});
      }

      for (const element of sensors) {
        element.value = convert(element.rawValue, element.type);
      }
      res.status(200).json(new ApiResponse(res.statusCode.toString(), sensors));
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.findById({ _id: req.params.id });
      if (sensor) {
        sensor.value = convert(sensor.rawValue, sensor.type);
        res
          .status(200)
          .json(new ApiResponse(res.statusCode.toString(), sensor));
      }
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.rawValue = req.body.rawValue ? 1 : 0;
      const SensorPost = SensorPostSchema.parse(req.body);
      const sensor = new models.Sensor(SensorPost);
      await sensor.save();
      res.status(200).json(
        new ApiResponse(res.statusCode.toString(), {
          message: "created",
          id: sensor.id,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.rawValue = req.body.rawValue ? 1 : 0;
      const SensorUpdate = SensorUpdateSchema.parse(req.body);
      const sensor = await models.Sensor.findByIdAndUpdate(
        req.params.id,
        SensorUpdate,
        { new: true }
      );
      res.status(200).json(new ApiResponse(res.statusCode.toString(), sensor));
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await models.Sensor.deleteOne({ _id: req.params.id });
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
