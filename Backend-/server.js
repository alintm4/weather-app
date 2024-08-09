const mongoose= require("mongoose")
const express= require("express")
const route=require("./router/routes")

const app=express()

mongoose.connect("mongodb://127.0.0.1:27017/weather")
.then(()=> console.log("mongo db connected"))
.catch((err) => console.error("Mongodb error:", err));

app.use(express.json());

app.use('/api',route)

app.listen(5001,()=> console.log("Server Started"))