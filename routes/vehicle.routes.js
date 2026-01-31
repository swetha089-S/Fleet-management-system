import express from "express";
import {
    addVehicle,
    assignDriver,
    getVehicleById

}from "../controllers/vehicle.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router =express.Router();

router.post("/add",rateLimiter, addVehicle);

router.patch("/assign-driver/: vehicleId",assignDriver);

router.get("/: vehicleId",getVehicleById);
export default router;