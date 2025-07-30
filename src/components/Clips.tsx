"use client";
import { DeleteIcon, PinIcon } from "@/icons"
import { deleteClipData, pinClipData } from "@/services";
import { clipStore } from "@/store";
import { copyClipData } from "@/utils/CopyClip";
import EmptyClip from "./EmptyClip";
import { formatDate } from "@/utils/dateFormatter";

export default function Clips() {

    const { clips, deleteClip, pinClip } = clipStore()

    if(clips.length == 0) {
        return (
            <EmptyClip />
        )
    }

    // TODO: Move this logic to a utility function
    const groupedData = clips.reduce((acc: IGroupedClips[], clip: IClip) => {
        const date = new Date(clip.created_at).toLocaleDateString();
        const existingGroup = acc.find((item) => item.date === date);
        if (existingGroup) {
            existingGroup.clips.push({ id: clip.id, content: clip.content, is_pin: clip.is_pin });
        } else {
            acc.push({ date: date, clips: [{ id: clip.id, content: clip.content, is_pin: clip.is_pin }] });
        }
        return acc;
    }, []);

    return (
        <ul className="p-5">
            {
                groupedData.map((clip: IGroupedClips, index: number) => {
                    return (
                        <li key={index} className="mb-10">
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
                                                    <DeleteIcon />
                                                </button>
                                                <button className={`custom-btn ${clip.is_pin ? '!text-cyan-400' : ''}`} onClick={(e) => {
                                                    e.stopPropagation();
                                                    pinClipData(clip.id, clip.is_pin, pinClip)
                                                }}>
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