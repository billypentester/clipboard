import toast from "react-hot-toast"
import { supabase } from "./supabaseClient"
import { errorToastConfig, successToastConfig } from "@/config"
import { getClipsData, getUserData } from "@/services"

const handleSignUp = async (e: React.FormEvent, router: any, user: IUserCredentials) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp(user)
    if (error) {
      toast.error(error.message, errorToastConfig)
    }
    else {
      toast(' Check your email to confirm signup!', successToastConfig);
      router.push('/')
    }
}

const handleLogin = async (e: React.FormEvent, router: any, user: IUserCredentials) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword(user)
    if (error) {
        toast.error(error.message, errorToastConfig)
    } 
    else {
        toast('Logged in successfully!', successToastConfig);
        router.push('/board')
    }
}

async function handleGoogleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/board`
      }
    })
    if (error) {
      toast(error.message, errorToastConfig)
    } 
}

const getUser = async (router: any, setUser: (data: any)=> void, setClips: any) => {
    const userData: IUser | null = await getUserData()
    if (!userData) {
        router.push('/')
        return
    } 
    setUser(userData)
    getClipsData(setClips)
}

async function getSession() : Promise<boolean> {
    let auth = await supabase.auth.getSession()
    if(auth.data.session) {
        return true
    }
    return false
}

const logoutUser = async (router: any, clearUser: ()=> void) => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        toast(error.message, errorToastConfig)
    } else {
        toast('Logged out successfully', { ...successToastConfig, icon: '👋' })
        clearUser()
        router.push('/')
    }
}

export { getSession, handleSignUp, handleLogin, handleGoogleLogin, logoutUser, getUser }