import { _uploadVideo } from "../1_Models/model.UploadVideo";
import { Request, Response, NextFunction } from 'express';
import { db } from "../0_Config/config";
import { compareVideoMetadataFunction } from "./compareVideoMetadataFunction";
import fs from 'fs';

// interface VideoMetadata {
//   video: any; 
// }
// interface AudioMetadata {
//   audio: any; 
// }
// interface ResJSON {
//   uploadedVideo: string;
//   allVideoData: {
//     video: VideoMetadata;
//     audio: AudioMetadata;
//   };
// }

interface VideoMetadata {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: string;
  codec_tag_string: string;
  codec_tag: string;
  width: number;
  height: number;
  coded_width: number;
  coded_height: number;
  closed_captions: number;
  film_grain: number;
  has_b_frames: number;
  sample_aspect_ratio: string;
  display_aspect_ratio: string;
  pix_fmt: string;
  level: number;
  color_range: string;
  color_space: string;
  color_transfer: string;
  color_primaries: string;
  chroma_location: string;
  field_order: string;
  refs: number;
  is_avc: string;
  nal_length_size: number;
  id: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: number;
  duration_ts: number;
  duration: number;
  bit_rate: number;
  max_bit_rate: string;
  bits_per_raw_sample: number;
  nb_frames: number;
  nb_read_frames: string;
  nb_read_packets: string;
  extradata_size: number;
  tags: {
    language: string;
    handler_name: string;
    vendor_id: string;
  };
  disposition: {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
    timed_thumbnails: number;
    captions: number;
    descriptions: number;
    metadata: number;
    dependent: number;
    still_image: number;
  };
}

interface AudioMetadata {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: string;
  codec_tag_string: string;
  codec_tag: string;
  sample_fmt: string;
  sample_rate: number;
  channels: number;
  channel_layout: string;
  bits_per_sample: number;
  id: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: number;
  duration_ts: number;
  duration: number;
  bit_rate: number;
  max_bit_rate: string;
  bits_per_raw_sample: string;
  nb_frames: number;
  nb_read_frames: string;
  nb_read_packets: string;
  extradata_size: number;
  tags: {
    language: string;
    handler_name: string;
    vendor_id: string;
  };
  disposition: {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
    timed_thumbnails: number;
    captions: number;
    descriptions: number;
    metadata: number;
    dependent: number;
    still_image: number;
  };
}

interface ResJSON {
  uploadedVideo: string;
  allVideoData: {
    video: VideoMetadata;
    audio: AudioMetadata;
  };
}

interface videoProfileInterface {
  codec_name: string;
  profile: string;
  width: number;
  height: number;
  field_order: string;
  r_frame_rate: string;
  duration: number;
  bitrate: string;
  audio_codec_name: string;
  sample_rate: number;
  channels: number;
  channel_layout: string;
  audio_bitrate: string;
}

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
    const videoProfileInterface = await checkVideo(resJSON, user_id, profile_id )

    // console.log(videoProfileInterface.profile);
    //need to now get data from videoProfileInterface and compare to extracted metadata in allVideoData object
    const QCResults = compareVideoMetadataFunction(resJSON, videoProfileInterface)
    

     res.json({QCResults, resJSON, videoProfileInterface});
  } catch (error) {
    console.error('Error getting metadata:', error);
    res.status(500).send('Error getting metadata');
    next(error);
  }
};


const checkVideo = async (resJSON: ResJSON, user_id: number, profile_id:number ) : Promise<any | null >=>{
  try{
   const profileToUse = await db('video_metadata')
      .select('codec_name', 'profile', 'width', 'height', 'field_order', 'r_frame_rate', 'duration', 'bitrate', 'audio_codec_name', 'sample_rate', 'channels', 'channel_layout', 'audio_bitrate') // Selecting only the codec_name column
      .where({ user_id, id: profile_id })
      .first()

      if (!profileToUse) {
      console.error("Profile not found for user_id:", user_id, "and profile_id:", profile_id);
      return null; 
    }
    // console.log("Found profile:", profileToUse);
      return profileToUse;
  } catch(error){
    console.error ("Error checking video:", error)
    throw error
  }

}