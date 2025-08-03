"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clipStore, userStore } from '@/store'
import Header from '@/components/Header'
import { getUser } from '@/utils/auth'
import { handlePaste } from '@/utils/clip'


export default function Board({ children }: Readonly<{children: React.ReactNode}>) {
  
    const router = useRouter()
    const { setClips, addClip, clips } = clipStore()
    const { setUser } = userStore()

    useEffect(() => {

        getUser(router, setUser, setClips)

        document.addEventListener('keydown', (event)=> handlePaste(event, addClip))
        return () => {
            document.removeEventListener('keydown', (event)=> handlePaste(event, addClip))
        }

    }, [])

    return (
        <div className={`bg-gray-100 ${clips.length > 0 ? 'min-h-screen' : 'h-screen'}`}>
            <div className='mx-auto w-full lg:w-2/3 px-4'>
                {children} 
            </div>
            
            {/* Header for desktop (top) */}
            <div className="hidden lg:block w-full">
                <div style={{ width: 'calc(100% - 3rem)' }} className="bg-gray-800 py-4 px-10 text-white shadow-xl rounded-full fixed z-10 top-5 transform translate-x-6">
                    <Header />
                </div>
            </div>

            {/* Header for mobile (bottom) */}
            <div className="block lg:hidden mt-5 relative">
                <div style={{ width: 'calc(100% - 3rem)' }} className="bg-gray-800 py-4 px-10 text-white shadow-xl rounded-full fixed z-10 bottom-5 transform translate-x-6">
                    <Header />
                </div>
            </div>

        </div>
    )
}
