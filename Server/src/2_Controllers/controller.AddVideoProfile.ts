import { _addVideoProfile } from "../1_Models/model.AddVideoProfile";
import { Request, Response, NextFunction } from 'express';

export const addVideoProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videoProfileMetadata = req.body;
    const result = await _addVideoProfile(videoProfileMetadata);

    // Convert bitrate and audio_bitrate strings to arrays
    result.bitrate = parseNumRange(result.bitrate);
    result.audio_bitrate = parseNumRange(result.audio_bitrate);

    res.json(result);
  } catch (error) {
    console.error('Error adding profile', error);
    next(error);
  }
};

// parse numrange string into an array of numbers
const parseNumRange = (numRangeString: string): number[] => {
    if (!numRangeString || numRangeString === '[]') {
        return [];
    }
    const range = numRangeString.slice(1, -1).split(',').map(num => parseInt(num));
    return range;
};