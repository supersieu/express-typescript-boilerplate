import { EventEmitter } from "stream";
import IDatabase from "../interface/IDatabase";
import Authenticator from "./Authenticator";

import mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";
import models from "../models";
import { UserLoginSchema } from "@/types/userSchema";

import Sensor from "@/models/sensor";
import User from "@/models/user";
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

export class Database extends EventEmitter implements IDatabase {
  auth = new Authenticator();
  constructor() {
    super();
  }
  private getModel(table: string) {
    switch (table) {
      case "actuator": {
        return models.Actuator;
        break;
      }
      case "sensor": {
        return models.Sensor;
        break;
      }
      case "user": {
        return models.User;
        break;
      }
      default: {
        return "model non trouvé";
        break;
      }
    }
  }

  public async get(model: string, req: Request) {
    const token = req.get("Authorization");
    if (token) {
      if (this.auth.authenticate(token)) {
        let Model = this.getModel(model);
        let datas = Array<mongoose.Model<any, {}, {}, {}>>();
        if (!(typeof Model === "string")) {
          if (req.query.type) {
            datas = await Model.find({ type: req.query.type });
          } else {
            datas = await Model.find({});
          }
          if (Model == Sensor) {
            let sensors = new Sensor();
            sensors = datas;
            for (const element of sensors) {
              element.value = convert(element.rawValue, element.type);
            }
            return sensors;
          }
        }
        return datas;
      }
    }
    return "non autorisé";
  }
  async getById(modelName: string, req: Request) {
    const token = req.get("Authorization");
    if (token) {
      if (this.auth.authenticate(token)) {
        let Model = this.getModel(modelName);

        if (!(typeof Model === "string")) {
          const model = await Model.findById({ _id: req.params.id });

          if (model) {
            if (Model == Sensor) {
              let sensor = new Sensor();
              sensor = model;
              sensor.value = convert(sensor.rawValue, sensor.type);
            }
            return model;
          }
          return "model non trouvé";
        }
        return Model;
      }
    }
    return "non autorisé";
  }
  public async post(modelName: string, req: Request) {
    let Model = this.getModel(modelName);
    if (!(typeof Model === "string")) {
      if (Model == User) {
        const body = req.body;
        body.password = await this.auth.signup(body.password);
        let user = new User(body);
        await user.save();
        let datas = {
          message: "created",
          id: user.id,
        };
        return datas;
      } else {
        const token = req.get("Authorization");
        if (token) {
          if (this.auth.authenticate(token)) {
            const model = new Model(req.body);
            await model.save();
            let datas = {
              message: "created",
              id: model.id,
            };
            return datas;
          }
        }
        return "non autorisé";
      }
    }
  }
  public async patch(modelName: string, req: Request) {
    const token = req.get("Authorization");
    if (token) {
      if (this.auth.authenticate(token)) {
        let Model = this.getModel(modelName);
        if (!(typeof Model === "string")) {
          const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          return model;
        }
      }
    }
    return "non autorisé";
  }

  async delete(modelName: string, req: Request) {
    const token = req.get("Authorization");
    if (token) {
      if (this.auth.authenticate(token)) {
        let Model = this.getModel(modelName);
        if (!(typeof Model === "string")) {
          await Model.deleteOne({ _id: req.params.id });
          return "succes";
        }
      }
    }
    return "non autorisé";
  }

  public async login(model: string, req: Request) {
    const userLogin = UserLoginSchema.parse(req.body);
    const user = await models.User.findOne({ email: userLogin.email }).select(
      "+password"
    );
    if (user) {
      const token = await this.auth.login(userLogin.password, user.password, {
        id: user.id,
        username: user.username,
      });
      const data = { message: "success", token: token };
      return data;
    }
  }
}
