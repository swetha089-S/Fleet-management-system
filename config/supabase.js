import { createclient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase =createclient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);