import express from 'express';
import { addFood, listFood, deleteFood } from '../controller/foodController.js';
import multer from 'multer';

const Foodrouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);

  }
})

const upload = multer({ storage: storage });

Foodrouter.post('/add', upload.single("image"), addFood);
Foodrouter.get('/list', listFood);
Foodrouter.delete('/delete/:id', deleteFood);













export default Foodrouter