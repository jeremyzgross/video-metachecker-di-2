import { _getAllVideoProfilesForUser } from "../1_Models/model.GetAllProfilesforUser";
import { Request, Response, NextFunction } from 'express';

export const GetAllVideoProfilesForUser = async( req: Request, res: Response, next: NextFunction)=>{
  try{
     const userId = parseInt(req.params.user_id, 10);

     const allVideoProfiles = await _getAllVideoProfilesForUser(userId)
     if (!allVideoProfiles) {
      return res.status(404).json({ error: 'Video profile not found' });
  }
   res.status(200).json(allVideoProfiles);
}catch (error) {
    console.error('something went wrong with getting all the profiles', error)
    next(error);
  }
}