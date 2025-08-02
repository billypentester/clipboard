"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clipStore, userStore } from '@/store'
import { appClipData, getClipsData, getUserData, handlePaste } from '@/services'
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

        getUser()

        document.addEventListener('keydown', (event)=> handlePaste(event, addClip))
        return () => {
            document.removeEventListener('keydown', (event)=> handlePaste(event, addClip))
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
