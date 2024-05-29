import { _deleteVideoProfile } from "../1_Models/model.DeleteVideoProfile";
import { Request, Response, NextFunction } from 'express';

export const DeleteVideoProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user_id and profile_id from request parameters
    const userId = parseInt(req.params.user_id, 10);
    const profileId = parseInt(req.params.profile_id, 10);

    // Delete the video profile using the IDs
    const success = await _deleteVideoProfile(userId, profileId);

    // If no rows were affected, return a 404 status
    if (!success) {
      return res.status(404).json({ error: 'Video profile not found' });
    }

    // Return a success response
    res.status(200).json({ message: 'Video profile deleted successfully' });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};