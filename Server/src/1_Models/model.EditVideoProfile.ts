import { db } from "../0_Config/config";
import {VideoProfileMetadata } from "../Interfaces/interface";

// export interface VideoProfileMetadata {
//     id?: number; // optional because it will be auto-generated
//     user_id: number; // NEED TO GET THIS FROM SESSION DATA LATER!!!
//     profile_name: string
//     codec_name?: string;
//     profile?: string;
//     width?: number;
//     height?: number;
//     field_order?: string;
//     r_frame_rate?: string;
//     duration?: number;
//     bitrate?: [number, number] | null; // TypeScript doesn't have a direct NUMRANGE type, so we use a tuple
//     audio_codec_name?: string;
//     sample_rate?: number;
//     channels?: number;
//     channel_layout?: string;
//     audio_bitrate?: [number, number] | null; // TypeScript doesn't have a direct NUMRANGE type, so we use a tuple
// }
export const _updateVideoProfile = async (user_id: number, profile_id: number, updates: Partial<VideoProfileMetadata>) => {
  try {
    const rowsAffected = await db('video_metadata')
      .where({ user_id, id: profile_id })
      .update(updates);

    return rowsAffected > 0;
  } catch (error) {
    console.error("Error updating video profile:", error);
    throw error;
  }
};
