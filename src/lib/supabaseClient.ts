
import {
    getSecret
} from 'astro:env/server'

import { createClient } from '@supabase/supabase-js'
// Usa la clave service_role SOLO en backend seguro, nunca en frontend
const supabaseUrl = 'https://tdmmxqfowpmucybsaqkz.supabase.co'
const supabaseKey = getSecret('SUPABASE_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };