import {EventEmitter} from "stream";
import IDatabase from "../interface/IDatabase";

import mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";
import models from "../models";

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
    public  async get(model:string, req: Request){
        
        
       let datas=Array<mongoose.Model<any, {}, {}, {}>>();
            let Model=this.getModel(model)
            
            if (!(typeof Model === "string")) {
                    if (req.query.type) {
                        datas = await Model.find({ type: req.query.type });
                      } else {
                        datas = await Model.find({});
                      }
              }
              
            return datas;
    }
    public async post(modelName:string, req: Request){
            let datas=new mongoose.Model();
            let Model=this.getModel(modelName)
            if (!(typeof Model === "string")) {
                    const model = new Model(req.body);
                    await model.save();
                    datas={
                        message: "created",
                        id: model.id,
                      };
                    return datas
            }
    }
    public async patch(modelName:string, req: Request){
        let datas=new mongoose.Model();
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
    async getById(modelName:string, req: Request){
        let datas=new mongoose.Model();
        let Model=this.getModel(modelName)
        if (!(typeof Model === "string")) {
            const model = await Model.findById({ _id: req.params.id });
                if (model){
                    return model;
                }else{
                    return "model non trouvé"
                }
        }
    }
    async delete(modelName:string, req: Request){
        let datas=new mongoose.Model();
        let Model=this.getModel(modelName)
        if (!(typeof Model === "string")) {
                await Model.deleteOne({ _id: req.params.id });
                return "succes"
        }
    }

}


