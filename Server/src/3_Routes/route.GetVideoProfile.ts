import express from 'express';
import { GetVideoProfile } from '../2_Controllers/controller.GetVideoProfile';
export const router_get_video_profile = express.Router()

router_get_video_profile.get('/user/:user_id/profile/:profile_id', GetVideoProfile) 