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

export const compareVideoMetadataFunction = (resJSON: ResJSON, videoProfileInterface: videoProfileInterface): Record<string, boolean> => {
  return {
    codec_name: resJSON.allVideoData.video.codec_name === videoProfileInterface.codec_name,
    profile: resJSON.allVideoData.video.profile === videoProfileInterface.profile,
    width: resJSON.allVideoData.video.width === videoProfileInterface.width,
    height: resJSON.allVideoData.video.height === videoProfileInterface.height,
    field_order: resJSON.allVideoData.video.field_order === videoProfileInterface.field_order,
    r_frame_rate: resJSON.allVideoData.video.r_frame_rate === videoProfileInterface.r_frame_rate,
    duration: resJSON.allVideoData.video.duration === videoProfileInterface.duration,
    // bitrate: resJSON.allVideoData.video.bit_rate === videoProfileInterface.bitrate,
    audio_codec_name: resJSON.allVideoData.audio.codec_name === videoProfileInterface.audio_codec_name,
    sample_rate: resJSON.allVideoData.audio.sample_rate === videoProfileInterface.sample_rate,
    channels: resJSON.allVideoData.audio.channels === videoProfileInterface.channels,
    channel_layout: resJSON.allVideoData.audio.channel_layout === videoProfileInterface.channel_layout,
    // audio_bitrate: resJSON.allVideoData.audio.bit_rate === videoProfileInterface.audio_bitrate,
  };
};
// export const compareVideoMetadataFunction = (resJSON: ResJSON): void => {
//   console.log(resJSON.allVideoData.video.codec_name);
// };
