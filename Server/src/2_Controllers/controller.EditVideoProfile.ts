import { _updateVideoProfile, VideoProfileMetadata} from "../1_Models/model.EditVideoProfile";

import { Request, Response, NextFunction } from 'express';


export const UpdateVideoProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user_id and profile_id from request parameters
    const userId = parseInt(req.params.user_id, 10);
    const profileId = parseInt(req.params.profile_id, 10);

    // Extract updates from request body
    const updates: Partial<VideoProfileMetadata> = req.body;

    // Update the video profile using the IDs and updates
    const success = await _updateVideoProfile(userId, profileId, updates);

    // If no rows were affected, return a 404 status
    if (!success) {
      return res.status(404).json({ error: 'Video profile not found' });
    }

    // Return a success response
    res.status(200).json({ message: 'Video profile updated successfully' });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};