
import mongoose from "mongoose";
import {  Request } from "express";
export default interface IDatabase {
    get:(model:string, req: Request)=> Promise<Array<mongoose.Model<any, {}, {}, {}>>>
    post:(modelName:string, req: Request)=> Promise<any> | String
    patch:(modelName:string, req: Request)=> Promise<any> | String
    getById:(modelName:string, req: Request)=> Promise<any> | String
    delete:(modelName:string, req: Request)=> Promise<String | undefined>
  }
  