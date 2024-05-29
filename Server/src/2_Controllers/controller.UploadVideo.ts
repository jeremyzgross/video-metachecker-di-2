import { _uploadVideo } from "../1_Models/model.UploadVideo";

import { Request, Response, NextFunction } from 'express';

export const UploadVideo = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const filePath = req.file!.path
    const allVideoData = await _uploadVideo(filePath)
     const resJSON = {
      uploadedVideo: filePath,
      allVideoData: allVideoData
    }
    res.json(resJSON)
  }catch (error) {
    console.error('Error getting metadata:', error)
    res.status(500).send('Error getting metadata')
    next(error);
  }
}