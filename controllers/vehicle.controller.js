import { supabase } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

export const addVehicle = async (req, res) => {
  try {
    const {
      name,
      registration_number,
      allowed_passengers,
      rate_per_km,
      owner_id
    } = req.body;

    if (
      !name ||
      !registration_number ||
      !allowed_passengers ||
      !rate_per_km ||
      !owner_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { data: owner } = await supabase
      .from("users")
      .select("*")
      .eq("id", owner_id)
      .single();

    if (!owner || owner.role !== "owner") {
      return res.status(403).json({ message: "Only owner can add vehicle" });
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          id: uuidv4(),
          name,
          registration_number,
          allowed_passengers,
          rate_per_km,
          owner_id,
          isAvailable: true
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({
      message: "Vehicle added successfully",
      data
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const assignDriver = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { driver_id } = req.body;

    const { data: driver } = await supabase
      .from("users")
      .select("*")
      .eq("id", driver_id)
      .single();

    if (!driver || driver.role !== "driver") {
      return res.status(403).json({ message: "Invalid driver" });
    }

    const { data } = await supabase
      .from("vehicles")
      .update({ driver_id })
      .eq("id", vehicleId)
      .select();

    return res.json({ message: "Driver assigned", data });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .single();

    return res.json({ data });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
