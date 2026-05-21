import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import studentRoutes from './routes/studentRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// IMPORTANT: Better MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err))

app.use('/api/students', studentRoutes)

app.get('/', (req, res) => {
  res.send("API Working")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server running"))