import { _registerUser } from "../1_Models/model.login.register.js";

import express, { Request, Response, NextFunction } from 'express';


export const registerUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userData = req.body
    const result = await _registerUser(userData)
    res.json(result.user)
  } catch (error){
    console.error('Error register user', error)
    next(error)
  }
}