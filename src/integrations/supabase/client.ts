// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rlxqisgvqxaidpwoholt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJseHFpc2d2cXhhaWRwd29ob2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjcyNDgsImV4cCI6MjA0OTE0MzI0OH0.S-UiXt95G0VFda6uqzsISYqWdVpYOEqAAterfeJAbbM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);