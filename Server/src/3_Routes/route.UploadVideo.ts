import express from 'express';
import { upload } from '../4_Middleware/middleware.uploadHandler';
import { UploadVideo } from '../2_Controllers/controller.UploadVideo';
export const router_upload_video = express.Router()



//noting for later that multer has ability to process multiple files with the .array method

router_upload_video.post('/upload', upload.single('filename'),UploadVideo) //add controller function