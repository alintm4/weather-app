import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors'; 
import route from './Backend-/router/routes.js';

const app=express()

app.use(cors());

connect("mongodb://127.0.0.1:27017/weather")
.then(()=> console.log("mongo db connected"))
.catch((err) => console.error("Mongodb error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api',route)

app.listen(5001,()=> console.log("Server Started"))