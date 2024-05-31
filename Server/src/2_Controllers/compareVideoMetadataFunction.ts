import { ResJSON, videoProfileInterface, VideoMetadata, AudioMetadata } from "../Interfaces/interface";

export const compareVideoMetadataFunction = (resJSON: ResJSON, videoProfileInterface: videoProfileInterface): Record<string, boolean> => {
  //converts string of array into numbers
    const isWithinRange = (range: string, value: number): boolean => {
        const [min, max] = range.replace(/[\[\]]/g, '').split(',').map(Number);
        return value >= min && value <= max;
    };

    // metadata is probed in bit/s. This converts them to kilobits per second
    const videoBitRateKbps = resJSON.allVideoData.video.bit_rate / 1000;
    const audioBitRateKbps = resJSON.allVideoData.audio.bit_rate / 1000;

    const comparisons: Record<string, boolean> = {};

    // Compare each field in videoProfileInterface
    Object.entries(videoProfileInterface).forEach(([key, value]) => {
        if (value === null) {
            comparisons[key] = true; // Treat NULL values as matching because if they are null, then there is nothing to compare
        } else if (key === "bitrate" || key === "audio_bitrate") { //special case for ranges
            comparisons[key] = isWithinRange(value, key === "bitrate" ? videoBitRateKbps : audioBitRateKbps);
        } else {
            comparisons[key] = (resJSON.allVideoData.video as VideoMetadata)[key] === value || (resJSON.allVideoData.audio as AudioMetadata)[key] === value;
        }
    });

    return comparisons;
};
