import express from "express";
import { createRoom, getOwnereRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.post('/',  upload.array("images", 4),protect, createRoom)

roomRouter.get('/', getRooms);
roomRouter.get('/owner', getOwnereRooms);
roomRouter.post('/toggle-availability',protect, toggleRoomAvailability);

export default roomRouter;