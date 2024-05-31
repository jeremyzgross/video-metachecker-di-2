import { db } from "../0_Config/config";
//add from form data to videoMetadataTable
import { VideoProfileMetadata } from "../Interfaces/interface";

export const _addVideoProfile = async (VideoProfileMetadata: VideoProfileMetadata) => {
  try {
    // Format bitrate and audio_bitrate as PostgreSQL arrays
    const bitrate = Array.isArray(VideoProfileMetadata.bitrate)
      ? `[${VideoProfileMetadata.bitrate.join(', ')}]`
      : '[]';
    const audio_bitrate = Array.isArray(VideoProfileMetadata.audio_bitrate)
      ? `[${VideoProfileMetadata.audio_bitrate.join(', ')}]`
      : '[]';

    const [insertedmetaData] = await db('video_metadata').insert(
      {
        user_id: VideoProfileMetadata.user_id,
        profile_name: VideoProfileMetadata.profile_name,
        codec_name: VideoProfileMetadata.codec_name,
        profile: VideoProfileMetadata.profile,
        width: VideoProfileMetadata.width,
        height: VideoProfileMetadata.height,
        field_order: VideoProfileMetadata.field_order,
        r_frame_rate: VideoProfileMetadata.r_frame_rate,
        duration: VideoProfileMetadata.duration,
        bitrate: bitrate,
        audio_codec_name: VideoProfileMetadata.audio_codec_name,
        sample_rate: VideoProfileMetadata.sample_rate,
        channels: VideoProfileMetadata.channels,
        channel_layout: VideoProfileMetadata.channel_layout,
        audio_bitrate: audio_bitrate,
      }
    ).returning('*');

    return insertedmetaData;
  } catch (error) {
    console.error("Error inserting video profile metadata:", error);
    throw error;
  }
};
