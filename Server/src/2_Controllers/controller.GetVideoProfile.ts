import { _getVideoProfile } from "../1_Models/model.GetVideoProfile";
import { Request, Response, NextFunction } from 'express';


export const GetVideoProfile = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const userId = parseInt(req.params.user_id, 10);
    const profileId = parseInt(req.params.profile_id, 10);

    const videoProfile = await _getVideoProfile(userId, profileId);

    if (!videoProfile) {
      return res.status(404).json({ error: 'Video profile not found' });
    }
     res.status(200).json(videoProfile);
  }catch (error) {
    console.error('something went wrong with getting the profile', error)
    next(error);
  }
}