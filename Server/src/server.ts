import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { router_login_register } from "./3_Routes/route.login.register";
import { router_add_video_profile } from './3_Routes/route.AddVideoProfile';
import { router_get_video_profile } from './3_Routes/route.GetVideoProfile';
import { router_delete_video_profile } from './3_Routes/route.DeleteVideoProfile';
import { router_edit_video_profile } from './3_Routes/route.EditVideoProfile';
import { router_upload_video } from './3_Routes/route.UploadVideo';

const app = express();
const PORT = 3000;

// CORS Configuration
app.use(cors()); // Allow requests from all origins

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use('/api', router_login_register);
app.use('/api', router_add_video_profile);
app.use('/api', router_get_video_profile);
app.use('/api', router_delete_video_profile);
app.use('/api', router_edit_video_profile);
app.use('/api', router_upload_video);

// error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
