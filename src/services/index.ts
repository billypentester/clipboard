import { supabase } from '@/utils/supabaseClient'
import { userStore } from '@/store'

const getClipsData = async (setClips: (data: IClip[]) => void) => {
    const { data, error } = await supabase.from('clipboard').select().order('created_at', { ascending: false })
    if (error) {
        console.error('Error fetching clipboard data:', error)
    }
    else {
        setClips(data || [])
    }
}

const deleteClipData = async (id: string, deleteClip: (id: string) => void) => {
    const { error } = await supabase.from('clipboard').delete().eq('id', id)
    if (error) {
        console.error('Error deleting clip:', error)
    }
    else {
        deleteClip(id)
    }
}

const pinClipData = async (id: string, status: boolean, pinClip: (id: string, status: boolean) => void) => {
    const { error } = await supabase.from('clipboard').update({ is_pin: !status }).eq('id', id)
    if (error) {
        console.error('Error pinning clip:', error)
    } else {
        pinClip(id, status)
    }
}

const appClipData = async (content: string, addClip: (data: any) => void) => {
    const { data, error } = await supabase.from('clipboard').insert({ content: content }).select().single()
    if (error) {
        console.error('Error inserting clipboard data:', error)
    } else {
        addClip(data)
    }
}

const getUserData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error('Error fetching user data:', error)
        return null
    }
    return user
}

export { getClipsData, deleteClipData, pinClipData, appClipData, getUserData }