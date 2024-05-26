const path = require('path')
const ffmpeg = require('fluent-ffmpeg')

const getVideoMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    //gets file from file and generate the metadata object
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }
      // takes metadata object finds specific video stream
      const videoStream = metadata.streams.find(
        (stream) => stream.codec_type === 'video'
      )
      if (videoStream) {
        resolve({
          //promise resolves with getting specific data points in metadata object
          codec_name: videoStream.codec_name,
          bit_rate: videoStream.bit_rate,
          all: videoStream,
        })
      } else {
        reject(new Error('No video stream found'))
      }
    })
  })
}

const getAudioMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }
      const audioStream = metadata.streams.find(
        (stream) => stream.codec_type === 'audio'
      )
      if (audioStream) {
        resolve({
          //promise resolves with getting specific data points in metadata object
          audio_codec_name: audioStream,
        })
      } else {
        reject(new Error('No audio stream found'))
      }
    })
  })
}

const test = async (somePath) => {
  try {
    const videoData = await getVideoMetadata(somePath)
    const audioData = await getAudioMetadata(somePath)
    console.log('video data =>', videoData.all)
    console.log('audio data=>', audioData.audio_codec_name)
  } catch (error) {
    console.error('Error:', error)
  }
}

const filePath = path.join(
  '/Users/jeremyzgross/Downloads',
  'y2mate.is - Full Stack Web Development Online Course-2wrjKZzc6yw-1080pp-1704640886.mp4'
)


test(filePath)
