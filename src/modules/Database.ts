import {EventEmitter} from "stream";
import IDatabase from "../interface/IDatabase";
import argon2 from "argon2";

import mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";
import models from "../models";
import { UserLoginSchema } from "@/types/userSchema";

import jwt from "jsonwebtoken";

import { load } from "ts-dotenv";
import Sensor from "@/models/sensor";
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
const env = load({
    DATABASE_URL: String,
    SECRET_KEY: String,
  });

export class Database extends EventEmitter implements IDatabase{
    constructor(){
        super()
    }
    private getModel(table:string){
        switch(table) { 
            case "actuator": { 
               return models.Actuator 
               break; 
            } 
            case "sensor": { 
                return models.Sensor
               break; 
            } 
            case "user": { 
                return models.User
                break; 
             } 
            default: { 
               return "model non trouvé" 
               break; 
            } 
         } 

    }
    public  async login(model:string, req: Request){

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
                return data;
             
            }
        } 
    }
    
    public  async get(model:string, req: Request){
        
        
       let datas=Array<mongoose.Model<any, {}, {}, {}>>();
            let Model=this.getModel(model)
            
            if (!(typeof Model === "string")) {
                    if (req.query.type) {
                        datas = await Model.find({ type: req.query.type });
                      } else {
                        datas = await Model.find({});
                      }
                      if(Model==Sensor){
                        let sensors=new Sensor;
                        sensors=datas;
                        for (const element of sensors) {
                            element.value = convert(element.rawValue, element.type);
                        }
                        return sensors
                      }
                      
              }
              
            return datas;
    }
    async getById(modelName:string, req: Request){
        let Model=this.getModel(modelName)
        
        if (!(typeof Model === "string")) {
            
            
            const model = await Model.findById({ _id: req.params.id });
            
                if (model){
                    if (Model==Sensor) {
                        let sensor=new Sensor;
                        sensor=model;
                        sensor.value = convert(sensor.rawValue, sensor.type);
                    }
                    return model;
                }
                    return "model non trouvé"
                
        }
        
        return Model;
    }
    public async post(modelName:string, req: Request){
            
            let Model=this.getModel(modelName)
            if (!(typeof Model === "string")) {
                    const model = new Model(req.body);
                    await model.save();
                    let datas={
                        message: "created",
                        id: model.id,
                      };
                    return datas
            }
    }
    public async patch(modelName:string, req: Request){
        
        let Model=this.getModel(modelName)
        if (!(typeof Model === "string")) {      
            const model = await Model.findByIdAndUpdate(
                  req.params.id,
                  req.body,
                  { new: true }
                );
            return model;
        }
    }
    
    async delete(modelName:string, req: Request){
        
        let Model=this.getModel(modelName)
        if (!(typeof Model === "string")) {
                await Model.deleteOne({ _id: req.params.id });
                return "succes"
        }
    }

}


