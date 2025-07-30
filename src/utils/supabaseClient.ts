import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getSession() : Promise<boolean> {
    let auth = await supabase.auth.getSession()
    if(auth.data.session) {
        return true
    }
    return false
}

export { supabase, getSession }