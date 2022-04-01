import { NextFunction, Request, Response } from "express";
import models from "../models";
import { ApiResponse } from "../modules/Response";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.find({}, function(err, users) {
            
            if(err){
              next(err)
            }
            else{
              res.status(200).send(new ApiResponse( "test", users));
            }  
          });
      return;
    } catch (error) {
      next(error);
    }
  },
  get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.findById({_id: req.params.id}, function(err: any, user: any) {
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( "test", user));
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
        const user1 = new models.User(req.body);
         user1.save(function(err: any, user: any){
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( "test", user));
          }
         });
        
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.findByIdAndUpdate(req.params.id, req.body,function(err: any, user: any){
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
          }
        })
    } catch (error) {
      
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
        models.User.deleteOne({_id: req.params.id},function(err: any, user: any){
          if(err){
            next(err)
          }
          else{
            res.status(200).send(new ApiResponse( res.statusCode.toString(), user));
          }
        })
      return;
    } catch (error) {
      next(error);
    }
  },
};