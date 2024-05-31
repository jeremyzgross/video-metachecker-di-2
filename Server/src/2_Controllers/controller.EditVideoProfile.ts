import { _updateVideoProfile} from "../1_Models/model.EditVideoProfile";
import { VideoProfileMetadata } from "../Interfaces/interface";

import { Request, Response, NextFunction } from 'express';


export const UpdateVideoProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // extract user_id and profile_id from params
    const userId = parseInt(req.params.user_id, 10);
    const profileId = parseInt(req.params.profile_id, 10);

    /** Extract video metadataupdates from request body 
     * example:
     *  {
   "profile_name": "updated profile via PUT",
  "codec_name": "new_codec_name",
  "width": 1920,
  "height": 1080
*}
etc
*/
    const updates: Partial<VideoProfileMetadata> = req.body;

    // Update the video profile using the IDs and updates
    const success = await _updateVideoProfile(userId, profileId, updates);

    // return a 404 status if nothing changed
    if (!success) {
      return res.status(404).json({ error: 'Video profile not found' });
    }

    // Return a success response
    res.status(200).json({ message: 'Video profile updated successfully' });
  } catch (error) {
    next(error);
  }
};