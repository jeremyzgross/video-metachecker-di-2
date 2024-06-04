import { _registerUser, _loginUser } from "../1_Models/model.login.register.js";

import { generateToken } from "../0_Config/config.js";

import { Request, Response, NextFunction } from 'express';


export const registerUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userData = req.body
    const result = await _registerUser(userData)
    const id: number = result.user.id;
    generateToken(res, id);
    res.json(result.user)
  } catch (error){
    console.error('Error register user', error)
    next(error)
  }
}

export const loginUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userLogin = req.body
    console.log(userLogin);
    
    const result = await _loginUser(userLogin)
    const first_name :string = result.user.first_name
    const id :number = result.user.id
     generateToken(res, id); // Generate token after successful login
    res.json({ id, first_name, })
  }catch(error){
    console.error('Error login')
    next(error)
  }
}


