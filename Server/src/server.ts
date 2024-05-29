//init express and routers
import express from 'express'
import { router_login_register } from "./3_Routes/route.login.register.js"
import {router_add_video_profile} from './3_Routes/route.AddVideoProfile.js'
const app = express()
// const postgres = require('postgres')
//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//router

//use router
app.use('/api', router_login_register);
app.use('/api', router_add_video_profile);

app.listen(3000, () => {
  console.log('run on 3000!')
})


