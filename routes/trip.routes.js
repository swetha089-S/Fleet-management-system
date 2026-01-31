import express from "express";
import { createTrip, getTripById, endTrip } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/create", createTrip);
router.get("/:tripId", getTripById);
router.patch("/end/:tripId", endTrip);

export default router;
