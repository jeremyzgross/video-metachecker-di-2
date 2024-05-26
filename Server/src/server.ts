//init express and routers
import express from 'express'
import { router } from "./3_Routes/route.login.register.js"
const app = express()
// const postgres = require('postgres')
//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//router

//use router
app.use('/api', router);

app.listen(3000, () => {
  console.log('run on 3000!')
})


