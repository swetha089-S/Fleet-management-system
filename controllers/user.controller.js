import { supabase } from "../config/supabase.js";
import {v4 as uuidv4 } from "uuid";

export const signup =async (req,res) => {
    try{
        const { name, email, password, role }= req.body;

        if (!name || !email || !password || !role ) {
            return res.status(400).json({message: "All fields are required",});
        }

        if (!["customer","owner","driver"].includes(role)){
            return res.status(400).json({
                message:"Invalid role",
            });
        }

        const {data, error } = await supabase.from("users").insert([
            {

                id:uuidv4(),
                name,
                email,
                password,
                role,
            },
            
        ])
        .select();

        if (error){
            return res.status(400).json({
                message:error.message,

            });
        }

        return res.status(201).json({
            message:"signup successfull",
            data,
        });

    }catch (err) {
        return res.status(500).json({
            message:"server error",
        });
    }
};