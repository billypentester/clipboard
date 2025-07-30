"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clipStore, userStore } from '@/store'
import { appClipData, getClipsData, getUserData } from '@/services'
import Clips from '@/components/Clips'
import Header from '@/components/Header'


export default function Board() {
  
    const router = useRouter()
    const { setClips, addClip } = clipStore()
    const { setUser } = userStore()

    useEffect(() => {
        
        // TODO: Move this logic to a utility function
        const getUser = async () => {
            const userData: IUser | null = await getUserData()
            if (!userData) {
                router.push('/')
                return
            } 
            setUser(userData)
            getClipsData(setClips)
        }

        // TODO: Move this logic to a utility function
        const handlePaste = async (event: KeyboardEvent) => {
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
                <Header />
                <Clips />
            </div>
        </div>
    )
}

