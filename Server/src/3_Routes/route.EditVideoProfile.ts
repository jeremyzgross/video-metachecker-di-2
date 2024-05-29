import express from 'express';
import { UpdateVideoProfile } from '../2_Controllers/controller.EditVideoProfile';
export const router_edit_video_profile = express.Router()

router_edit_video_profile.put('/user/:user_id/profile/:profile_id', UpdateVideoProfile)