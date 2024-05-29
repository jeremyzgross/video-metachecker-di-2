import express from 'express';
import { addVideoProfile } from '../2_Controllers/controller.AddVideoProfile';
export const router_add_video_profile = express.Router()

router_add_video_profile.post('/addvideoprofile', addVideoProfile )