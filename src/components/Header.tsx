import { AddIcon, ClearIcon, ClipboardIcon, LogoutIcon, PinIcon, TimelineIcon } from '@/icons'
import { clipStore, userStore } from '@/store'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/utils/auth'
import { copyTextFromClipboard, swtichClipView } from '@/utils/clip'
import { clearAllClipsData } from '@/services'

const Header = () => {

    const router = useRouter()
    const { addClip, clearClips, clipView, setClipView } = clipStore()
    const { clearUser } = userStore()

    return (
        <div className='flex items-center justify-between'>
            <div className='flex'>
                <button 
                    title='Clipboard'
                    className='text-blue-500 hover:cursor-pointer' 
                >
                    <ClipboardIcon className="h-7" />
                </button>
            </div>
            <div className='flex-auto'>
                <div className='flex items-center justify-center space-x-7 lg:space-x-14'>
                    <button 
                        title='Add Clip'
                        className='text-white hover:cursor-pointer' 
                        onClick={() => copyTextFromClipboard(addClip)}
                    >
                        <AddIcon className="h-7" />
                    </button>
                    <button 
                        title="Timeline View"
                        className='text-white hover:cursor-pointer' 
                        onClick={() => swtichClipView(clipView, setClipView, router)}
                    >
                        {
                            clipView === "timeline" ? <TimelineIcon className="h-7" /> : <PinIcon className="h-7" />
                        }
                    </button>
                    <button 
                        title="Clear All"
                        className='text-white hover:cursor-pointer' 
                        onClick={() => clearAllClipsData(clearClips)}
                    >
                        <ClearIcon className="h-7" />
                    </button>
                </div>
            </div>
            <div className='flex'>
                <button 
                    title='Logout'
                    className='text-red-500 hover:cursor-pointer' 
                    onClick={() => logoutUser(router, clearUser)}
                >
                    <LogoutIcon className="h-7" />
                </button>
            </div>
        </div>
    )

}

export default Header
