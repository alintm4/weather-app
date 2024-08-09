const express=require("express")

const { putInfo } = require("../controller/info")
const route=express.Router()


route.post("/",putInfo)

module.exports=route