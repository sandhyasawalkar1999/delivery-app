import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import router from './routes/foodRouter.js'
import Foodrouter from './routes/foodRouter.js'
import userRouter from './routes/userRouter.js'
import cartRouter from './routes/cartRouter.js'

import 'dotenv/config'


//app comfig
const app = express()
const port = 4000

//middlewares
app.use(express.json())
// app.use(cors()); //allow all origins(for development)
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

//db connection
connectDB();

//api endpoints
app.use("/api/food", Foodrouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);





app.get("/", (req, res) => {
  res.send("api working")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})