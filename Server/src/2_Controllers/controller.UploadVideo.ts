import { _uploadVideo } from "../1_Models/model.UploadVideo";
import { Request, Response, NextFunction } from 'express';
import { db } from "../0_Config/config";
import { compareVideoMetadataFunction } from "./compareVideoMetadataFunction";
import { ResJSON, videoProfileInterface } from "../Interfaces/interface";
import fs from 'fs';

export const UploadVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filePath = req.file!.path;
    const user_id = parseInt(req.body.user_id, 10);
    const profile_id = parseInt(req.body.profile_id, 10);
    const allVideoData = await _uploadVideo(filePath);
    
    // After processing the video, delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully:', filePath);
      }
    });

    const resJSON: ResJSON = {
      uploadedVideo: filePath,
      allVideoData: allVideoData
    };

    const videoProfileInterface = await checkVideo(resJSON, user_id, profile_id);

    if (!videoProfileInterface) {
      return res.status(404).json({ error: 'Video profile not found' });
    }

    const QCResults = compareVideoMetadataFunction(resJSON, videoProfileInterface);

    res.json({ QCResults, resJSON, videoProfileInterface });
  } catch (error) {
    console.error('Error getting metadata:', error);
    res.status(500).send('Error getting metadata');
    next(error);
  }
};

const checkVideo = async (resJSON: ResJSON, user_id: number, profile_id: number): Promise<videoProfileInterface | null> => {
  try {
    const profileToUse = await db('video_metadata')
      .select('codec_name', 'profile', 'width', 'height', 'field_order', 'r_frame_rate', 'duration', 'bitrate', 'audio_codec_name', 'sample_rate', 'channels', 'channel_layout', 'audio_bitrate')
      .where({ user_id, id: profile_id })
      .first();

    if (!profileToUse) {
      console.error("Profile not found for user_id:", user_id, "and profile_id:", profile_id);
      return null;
    }

    return profileToUse;
  } catch (error) {
    console.error("Error checking video:", error);
    throw error;
  }
};
