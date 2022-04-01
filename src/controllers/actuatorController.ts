import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.Actuator.find({}, function(err, actuators) {
            if(actuators.length==0){
                res.status(400).send(new ApiResponse( res.statusCode.toString(), actuators,new Error("Auccun actuator disponible")));
            }
            if(err){
              next(err)
            }
            else{
              res.status(200).send(new ApiResponse( res.statusCode.toString(), actuators));
            }  
          });
      return;
    } catch (error) {
     // next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.Actuator.findById({_id: req.params.id}, function(err: any, actuator: any) {
            if(actuator==null){
                res.status(404).send(new ApiResponse( res.statusCode.toString(), actuator,new Error("Auccun actuator trouvé pour cet id")));
            }
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
          }
          });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const acutator1 = new models.Actuator(req.body);
         acutator1.save(function(err: any, acutator: any){
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), acutator));
          }
         });
        
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.Actuator.findByIdAndUpdate(req.params.id, req.body,{new: true},function(err: any, actuator: any){
            
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
          }
        })
    } catch (error) {
      
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.Actuator.deleteOne({_id: req.params.id},function(err: any, actuator: any){
          if(err){
            res.status(400).send(new ApiResponse( res.statusCode.toString(), actuator,new Error("Auccun actuator trouvé pour cet id")));
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), actuator));
          }
        })
      return;
    } catch (error) {
      next(error);
    }
  },
};