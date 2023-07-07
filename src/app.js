import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";
dotenv.config()
import sumulaRouter from './routes/sumulaRoutes.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(sumulaRouter)

export default app;