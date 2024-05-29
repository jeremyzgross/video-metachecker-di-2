//init express and routers
import express from 'express'
import { router_login_register } from "./3_Routes/route.login.register.js"
import {router_add_video_profile} from './3_Routes/route.AddVideoProfile.js'
import { router_get_video_profile } from './3_Routes/route.GetVideoProfile.js'
import { router_delete_video_profile } from './3_Routes/route.DeleteVideoProfile.js'
import { router_edit_video_profile } from './3_Routes/route.EditVideoProfile.js'
const app = express()
// const postgres = require('postgres')
//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//router

//use router
app.use('/api', router_login_register);
app.use('/api', router_add_video_profile);
app.use('/api', router_get_video_profile);
app.use('/api', router_delete_video_profile);
app.use('/api', router_edit_video_profile);

app.listen(3000, () => {
  console.log('run on 3000!')
})


