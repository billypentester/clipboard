"use client";
import { DeleteIcon, PinIcon } from "@/icons"
import { deleteClipData, pinClipData } from "@/services";
import { clipStore } from "@/store";
import EmptyClip from "@/components/EmptyClip";
import { formatDate } from "@/utils/dateFormat";
import { pinnedData } from "@/utils/mapper";
import { copyClipData } from "@/utils/clip";

export default function Clips() {

    const { clips, deleteClip, pinClip } = clipStore()

    if(pinnedData(clips).length == 0) {
        return (
            <EmptyClip />
        )
    }

    return (
        <ul className="p-5">
            {
                pinnedData(clips).map((clip: IGroupedClips, index: number) => {
                    return (
                        <li key={index} className="mb-10 lg:mt-20">
                            <div className="mb-5">
                                <h2 className='text-xl font-semibold'>{formatDate(clip.date)}</h2>
                            </div>  
                            {
                                clip.clips.map((clip: OptionalClip, index: number) => {
                                    return (
                                        <div key={index} id={`clip-${index}`} className="relative cursor-pointer overflow-hidden shadow-xs border border-gray-300 rounded-md bg-gray-200 p-3 mb-3" onClick={(e) => copyClipData(e, clip.content)}>
                                            <div className='h-20'>
                                                <p>{clip.content}</p>
                                            </div>  
                                            <div className='flex justify-end gap-2'>
                                                <button className='custom-btn' onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteClipData(clip.id, deleteClip)
                                                }}>
                                                    <DeleteIcon className="h-5" />
                                                </button>
                                                <button className={`custom-btn ${clip.is_pin ? '!text-amber-300' : ''}`} onClick={(e) => {
                                                    e.stopPropagation();
                                                    pinClipData(clip.id, clip.is_pin, pinClip)
                                                }}>
                                                    <PinIcon className="h-5" />
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