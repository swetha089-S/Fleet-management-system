import { supabase } from "../config/supabase.js";
import {v4 as uuidv4 } from "uuid";

export const addVehicle =async (req, res) => {
    try {
        const {
            name,
            registration_number,
            allowed_passengers,
            rate_per_km,
            owner_id

        }=req.body;

        if (
            !name ||
            !registration_number ||
            !allowed_passengers ||
            !rate_per_km || 
            !owner_id ||
        ) {
            return res.status(400).json({
                message:"All fields are required",
            });
        }

        const {data: owner, error:ownerError } =await supabase
        .from("users")
        .select("*")
        .eq("id",owner_id)
        .single();
        
        if (ownerError || !owner) {
            return res.status(404).json({
                message: "owner not found"
            });
        }

        if (owner.role !== "owner" ){
            return res.status(403).json({
                message:"only owner can add vehicles",
            });
        }

        const { data, error} =await supabase
        .from("vehicles")
        .insert([
            {
                id:uuidv4(),
                name,
                registration_number,
                allowed_passengers,
                rate_per_km,
                owner_id,
            },
        ])
        .select();
        
        if (error) {
            return res.status(400).json({
                message:error.message,
            });
        } 

        return res.status(201).json({
            message:"vehicle added successfully",
            data,
        });
    }catch (err) {
        return res.status(500).json({
            message:"server error",

        });
    }
};


export const assignDriver =sync (req, res)=> {
    try{
        const { vehicleId } =req.params;
        const {driver_id }=req.body;

        if (!driver_id) {
            return res.status(400).json({
                message:"Driver Id id required",
            });
        }

        const { data: driver, error:driverError}= await supabase
    }
}