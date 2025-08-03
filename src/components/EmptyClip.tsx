import { ClipboardIcon } from '@/icons';
import Image from 'next/image';

export default function EmptyClip() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <div className='flex flex-col justify-between items-center'>
          <ClipboardIcon className="border-gray-300 border rounded-full p-3 h-24 mb-5 text-emerald-500" />
          <h2 className="text-2xl text-gray-900">No Clips Found</h2>
          <p className="text-gray-700">Start adding clips to see them here</p>
        </div>
    </div>
  )
}
