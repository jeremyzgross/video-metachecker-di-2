import Ffmpeg from "fluent-ffmpeg";
import { VideoMetadataResolve, AudioMetadataResolve } from "../Interfaces/interface";


export const _uploadVideo = async (filepath: string) => {
  return new Promise<{ video: any; audio: any }>((resolve, reject) => {
    try {
      const getVideoMetadata = () => {
        return new Promise<VideoMetadataResolve>((resolve, reject) => {
          Ffmpeg.ffprobe(filepath, (err, metadata) => {
            if (err) {
              reject(err);
              return;
            }
            const videoStream = metadata.streams.find(
              (stream: any) => stream.codec_type === "video"
            );
            if (videoStream) {
              resolve({
                video: videoStream,
              });
            } else {
              reject(new Error("No video stream found"));
            }
          });
        });
      };

      const getAudioMetadata = () => {
        return new Promise<AudioMetadataResolve>((resolve, reject) => {
          Ffmpeg.ffprobe(filepath, (err, metadata) => {
            if (err) {
              reject(err);
              return;
            }
            const audioStream = metadata.streams.find(
              (stream: any) => stream.codec_type === "audio"
            );
            if (audioStream) {
              resolve({
                audio: audioStream,
              });
            } else {
              reject(new Error("No audio stream found"));
            }
          });
        });
      };

      Promise.all([getVideoMetadata(), getAudioMetadata()])
        .then((results) => {
          const [videoMetadata, audioMetadata] = results;
          resolve({
            video: videoMetadata.video,
            audio: audioMetadata.audio
          });
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
      console.error(
        "Something went wrong with the upload. This is in the model",
        error
      );
      reject(error);
    }
  });
};
