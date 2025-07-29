"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { clipStore, userStore } from '@/store'
import { appClipData, getClipsData, getUserData } from '@/services'
import Clips from '@/components/Clips'
import { LogoutIcon } from '../icons'


export default function Board() {
  
    const router = useRouter()
    const { setClips, addClip } = clipStore()
    const { user, setUser } = userStore()

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error)
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        
        const getUser = async () => {
            const userData = await getUserData()
            if (!userData) {
                router.push('/')
                return
            } 
            setUser(userData as any)
            getClipsData(setClips)
        }

        const handlePaste = async (event: any) => {
            if (event.ctrlKey && event.key === 'v') {
                event.preventDefault()
                const clipboardData = await navigator.clipboard.readText()
                if (clipboardData) {
                    appClipData(clipboardData, addClip)
                }
            }
        }

        getUser()

        document.addEventListener('keydown', handlePaste)
        return () => {
            document.removeEventListener('keydown', handlePaste)
        }

    }, [])

    return (
        <div className='bg-gray-100'>
        <div className='mx-auto w-full lg:w-2/3 pt-5 px-4'>
            <div className='bg-gray-800 p-4 text-white shadow-xl rounded-full mb-4'>
                <div className='flex items-center'>
                    <div className='flex-1'></div>
                    <div className='flex-auto'>
                        <h1 className='text-xl lg:text-3xl text-center'>Clipboard</h1>
                        {
                            user && <p className='text-xs text-center mt-1'>Welcome, {user.email}</p>
                        }
                    </div>
                    <div className='flex-1'>
                        <div className='flex items-center justify-end space-x-4'>
                            <button className='text-white hover:cursor-pointer px-5' onClick={logoutUser}>
                                <LogoutIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5'>
                <Clips />
            </div>
        </div>
        </div>
    )
}

