import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hsttmzkygbevzjpgtols.supabase.co'

const supabaseKey = 'sb_publishable_1qkPZN6m3DdYXiu0iEAmAg_V6bCJIfq'

export const supabase = createClient(supabaseUrl, supabaseKey)