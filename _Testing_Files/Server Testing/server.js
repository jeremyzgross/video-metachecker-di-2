const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

const app = express()

// Initialize multer for handling file uploads
const upload = multer({ dest: 'uploads/' })

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get video metadata
const getVideoMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }
      const videoStream = metadata.streams.find(
        (stream) => stream.codec_type === 'video'
      )
      if (videoStream) {
        resolve({
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

// get audio metadata
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
          audio_codec_name: audioStream.codec_name,
          all: audioStream,
        })
      } else {
        reject(new Error('No audio stream found'))
      }
    })
  })
}

// POST route to handle video uploads
app.post('/api/upload', upload.single('video'), async (req, res) => {
  const filePath = req.file.path

  try {
    // Get video and audio metadata
    const videoData = await getVideoMetadata(filePath)
    const audioData = await getAudioMetadata(filePath)

    // Respond with the metadata and path to the uploaded video
    res.json({
      uploadedVideo: filePath,
      videoMetadata: videoData,
      audioMetadata: audioData,
    })
  } catch (err) {
    console.error('Error getting metadata:', err)
    res.status(500).send('Error getting metadata')
  }
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
