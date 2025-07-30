import { AddIcon, LogoutIcon } from '@/icons'
import { clipStore, userStore } from '@/store'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { appClipData } from '@/services'

const Header = () => {

    const router = useRouter()
    const { addClip } = clipStore()
    const { clearUser } = userStore()

    // TODO: Move this logic to a utility function
    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error)
        } else {
            clearUser()
            router.push('/')
        }
    }

    // TODO: Move this logic to a utility function
    function copyTextFromClipboard() {
        navigator.clipboard.readText()
            .then(text => {
                if (text) {
                    appClipData(text, addClip)
                } else {
                    console.warn('Clipboard is empty')
                }
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err)
            })
    }

    return (
        <div className='bg-gray-800 p-4 text-white shadow-xl rounded-full mb-4'>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <div className='flex items-center justify-start space-x-4'>
                        <button className='text-white hover:cursor-pointer px-5' onClick={() => copyTextFromClipboard()}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className='flex-auto'>
                    <h1 className='text-xl lg:text-2xl text-center'>Clipboard</h1>
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
    )

}

export default Header
