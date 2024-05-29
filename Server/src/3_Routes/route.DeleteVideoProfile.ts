import express from 'express';
import { DeleteVideoProfile } from '../2_Controllers/controller.DeleteVideoProfile';

export const router_delete_video_profile = express.Router()

router_delete_video_profile.delete('/user/:user_id/profile/:profile_id', DeleteVideoProfile )