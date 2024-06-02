import express from 'express';

import { GetAllVideoProfilesForUser } from '../2_Controllers/controller.GetAllProfilesforUser';

export const router_get_all_video_profiles_for_user = express.Router()

router_get_all_video_profiles_for_user.get('/user/:user_id', GetAllVideoProfilesForUser)