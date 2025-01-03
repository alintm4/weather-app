import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors'; 
import route from './Backend-/router/routes.js';
import { configDotenv } from 'dotenv';
const app=express()

configDotenv();

app.use(cors());
const mongoUrl = process.env.MONGO_URL;

connect(mongoUrl)
.then(()=> console.log("mongo db connected"))
.catch((err) => console.error("Mongodb error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api',route)

app.listen(5001,()=> console.log("Server Started"))