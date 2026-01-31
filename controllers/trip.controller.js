import { supabase } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

export const createTrip = async (req, res) => {
  const { customer_id, vehicle_id, distance_km, passengers, location } = req.body;

  const { data: customer } = await supabase.from("users").select("*").eq("id", customer_id).single();
  if (!customer || customer.role !== "customer") {
    return res.status(403).json({ message: "Only customer can create trip" });
  }

  const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", vehicle_id).single();
  if (!vehicle.isAvailable || passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ message: "Vehicle not available or passengers exceeded" });
  }

  const { data } = await supabase
    .from("trips")
    .insert([{ id: uuidv4(), customer_id, vehicle_id, distance_km, passengers, location }])
    .select();

  await supabase.from("vehicles").update({ isAvailable: false }).eq("id", vehicle_id);

  res.status(201).json({ message: "Trip created", data });
};

export const getTripById = async (req, res) => {
  const { tripId } = req.params;
  const { data } = await supabase.from("trips").select("*").eq("id", tripId).single();
  res.json({ data });
};

export const endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase.from("trips").select("*").eq("id", tripId).single();
  const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", trip.vehicle_id).single();

  const tripCost = trip.distance_km * vehicle.rate_per_km;

  await supabase.from("trips").update({ isCompleted: true, tripCost }).eq("id", tripId);
  await supabase.from("vehicles").update({ isAvailable: true }).eq("id", trip.vehicle_id);

  res.json({ message: "Trip ended", tripCost });
};
