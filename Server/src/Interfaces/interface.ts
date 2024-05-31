export interface VideoProfileMetadata {
    id?: number; // optional because it will be auto-generated
    user_id: number; // NEED TO GET THIS FROM SESSION DATA LATER!!!
    profile_name: string;
    codec_name?: string;
    profile?: string;
    width?: number;
    height?: number;
    field_order?: string;
    r_frame_rate?: string;
    duration?: number;
    bitrate?: [number, number] | null; // TypeScript doesn't have a direct NUMRANGE type, so we use a tuple
    audio_codec_name?: string;
    sample_rate?: number;
    channels?: number;
    channel_layout?: string;
    audio_bitrate?: [number, number] | null; // TypeScript doesn't have a direct NUMRANGE type, so we use a tuple
}

export interface userData{
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}
export interface User {
  id: number;
  first_name: string
  last_name: string
}

export interface userLogin{
  username: string
  password: string
}

export interface VideoMetadataResolve {
  video: any; 
}

export interface AudioMetadataResolve {
  audio: any; 
}

// export interface VideoMetadata {
//   index: number;
//   codec_name: string;
//   codec_long_name: string;
//   profile: string;
//   codec_type: string;
//   codec_tag_string: string;
//   codec_tag: string;
//   width: number;
//   height: number;
//   coded_width: number;
//   coded_height: number;
//   closed_captions: number;
//   film_grain: number;
//   has_b_frames: number;
//   sample_aspect_ratio: string;
//   display_aspect_ratio: string;
//   pix_fmt: string;
//   level: number;
//   color_range: string;
//   color_space: string;
//   color_transfer: string;
//   color_primaries: string;
//   chroma_location: string;
//   field_order: string;
//   refs: number;
//   is_avc: string;
//   nal_length_size: number;
//   id: string;
//   r_frame_rate: string;
//   avg_frame_rate: string;
//   time_base: string;
//   start_pts: number;
//   start_time: number;
//   duration_ts: number;
//   duration: number;
//   bit_rate: number;
//   max_bit_rate: string;
//   bits_per_raw_sample: number;
//   nb_frames: number;
//   nb_read_frames: string;
//   nb_read_packets: string;
//   extradata_size: number;
//   tags: {
//     language: string;
//     handler_name: string;
//     vendor_id: string;
//   };
//   disposition: {
//     default: number;
//     dub: number;
//     original: number;
//     comment: number;
//     lyrics: number;
//     karaoke: number;
//     forced: number;
//     hearing_impaired: number;
//     visual_impaired: number;
//     clean_effects: number;
//     attached_pic: number;
//     timed_thumbnails: number;
//     captions: number;
//     descriptions: number;
//     metadata: number;
//     dependent: number;
//     still_image: number;
//   };
// }

// export interface AudioMetadata {
//   index: number;
//   codec_name: string;
//   codec_long_name: string;
//   profile: string;
//   codec_type: string;
//   codec_tag_string: string;
//   codec_tag: string;
//   sample_fmt: string;
//   sample_rate: number;
//   channels: number;
//   channel_layout: string;
//   bits_per_sample: number;
//   id: string;
//   r_frame_rate: string;
//   avg_frame_rate: string;
//   time_base: string;
//   start_pts: number;
//   start_time: number;
//   duration_ts: number;
//   duration: number;
//   bit_rate: number;
//   max_bit_rate: string;
//   bits_per_raw_sample: string;
//   nb_frames: number;
//   nb_read_frames: string;
//   nb_read_packets: string;
//   extradata_size: number;
//   tags: {
//     language: string;
//     handler_name: string;
//     vendor_id: string;
//   };
//   disposition: {
//     default: number;
//     dub: number;
//     original: number;
//     comment: number;
//     lyrics: number;
//     karaoke: number;
//     forced: number;
//     hearing_impaired: number;
//     visual_impaired: number;
//     clean_effects: number;
//     attached_pic: number;
//     timed_thumbnails: number;
//     captions: number;
//     descriptions: number;
//     metadata: number;
//     dependent: number;
//     still_image: number;
//   };
// }

// Modify the VideoMetadata type
export interface VideoMetadata {
    // Other properties...
    [key: string]: any; // Add index signature
}

// Modify the AudioMetadata type
export interface AudioMetadata {
    // Other properties...
    [key: string]: any; // Add index signature
}
export interface ResJSON {
  uploadedVideo: string;
  allVideoData: {
    video: VideoMetadata;
    audio: AudioMetadata;
  };
}

export interface videoProfileInterface {
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
