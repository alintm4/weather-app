import express from 'express';
import { putInfo } from '../controller/info.js';

const router=express.Router()


router.post("/",putInfo)

export default router;