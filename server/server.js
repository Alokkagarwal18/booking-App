import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"


connectDB();

const app = express()
app.use(cors()) // enable Cross origin Resource Sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//Api to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working fin"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));