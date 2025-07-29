import { CopyIcon, DeleteIcon, PinIcon } from "@/app/icons"
import { deleteClipData, pinClipData } from "@/services";
import { clipStore } from "@/store";
import { copyClipData } from "@/utils/CopyClip";
import EmptyClip from "./EmptyClip";

function isPin(is_pin: boolean) {
    return is_pin ? 'text-blue-800' : '';
}

export default function Clips() {

    const { clips, deleteClip, pinClip } = clipStore()

    if(clips.length == 0) {
        return (
            <EmptyClip />
        )
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const groupedData: any = clips.reduce((acc: any, clip: any) => {
        const date = new Date(clip.created_at).toLocaleDateString();
        const existingGroup: any = acc.find((item: any) => item.date === date);
        if (existingGroup) {
            existingGroup.clips.push({ id: clip.id, content: clip.content, is_pin: clip.is_pin });
        } else {
            acc.push({ date: date, clips: [{ id: clip.id, content: clip.content, is_pin: clip.is_pin }] });
        }
        return acc;
    }, []);

    return (
        <ul>
            {
                groupedData.map((clip: any, index: number) => {
                    return (
                        <li key={index} className={`${clip.length == index + 1 ? "mb-10" : ""}`}>
                            <div className="mb-5">
                                <h2 className='text-xl font-semibold'>{formatDate(clip.date)}</h2>
                            </div>  
                            {
                                clip.clips.map((clip: any, index: number) => {
                                    return (
                                        <div key={index} className="shadow-xs border border-gray-400 p-3 mb-3">
                                            <div className='h-16'>
                                                <p>{clip.content}</p>
                                            </div>  
                                            <div className='flex justify-end gap-0 text-gray-700'>
                                                <button className='mt-2 border border-gray-400 px-2 py-1 hover:cursor-pointer hover:text-green-800' onClick={() => copyClipData(clip.content)}>
                                                    <CopyIcon />
                                                </button>
                                                <button className='mt-2 ml-2 border border-gray-400 px-2 py-1 hover:cursor-pointer hover:text-red-800' onClick={() => deleteClipData(clip.id, deleteClip)}>
                                                    <DeleteIcon />
                                                </button>
                                                <button className={`mt-2 ml-2 border border-gray-400 px-2 py-1 hover:cursor-pointer hover:text-blue-800 ${isPin(clip.is_pin)}`} onClick={() => pinClipData(clip.id, clip.is_pin, pinClip)}>
                                                    <PinIcon />
                                                </button>
                                            </div>
                                        </div>      
                                    )
                                })
                            }  
                        </li>
                    )
                })
            }
        </ul>
    )

}