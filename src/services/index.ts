import { supabase } from '@/utils/supabaseClient'
import { userStore } from '@/store'
import toast from 'react-hot-toast'
import { errorToastConfig, successToastConfig } from '@/config'

const getClipsData = async (setClips: (data: IClip[]) => void) => {
    const { data, error } = await supabase.from('clipboard').select("id, content, is_pin, created_at").order('created_at', { ascending: false })
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
        toast(error.message, errorToastConfig)
        return
    }
    deleteClip(id)
    toast('Clip deleted', { ...successToastConfig, icon: '🗑️' })
}

const pinClipData = async (id: string, status: boolean, pinClip: (id: string, status: boolean) => void) => {
    const { error } = await supabase.from('clipboard').update({ is_pin: !status }).eq('id', id)
    if (error) {
        toast(error.message, errorToastConfig)
        return
    } 
    pinClip(id, status)
    toast(`Clip ${!status ? "pinned" : "unpinned"}`, { ...successToastConfig, icon: '📌' })
}

const clearAllClipsData = async (clearClips: () => void) => {
    const { error } = await supabase.from('clipboard').delete().eq('user_id', userStore.getState().user?.id)
    if (error) {
        toast(error.message, errorToastConfig)
        return
    }
    clearClips()
    toast('All clips cleared', { ...successToastConfig, icon: '🧹'})
}

const appClipData = async (content: string, addClip: (data: IClip) => void) => {
    const user = userStore.getState().user
    const { data, error } = await supabase.from('clipboard').insert({ content: content, user_id: user?.id }).select().single()
    if (error) {
        toast(error.message, errorToastConfig)
        return
    } 
    addClip(data)
    toast('Clip added', { ...successToastConfig, icon: '📋' })
}

const getUserData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error('Error fetching user data:', error)
        return null
    }
    return user as IUser
}

export { getClipsData, deleteClipData, pinClipData, appClipData, getUserData, clearAllClipsData }