import Image from 'next/image';

export default function EmptyClip() {
  return (
    <div className="text-center my-10">
        <Image src="/images/clipboard-empty.png" alt="No Clips" width={200} height={200} className="mx-auto mb-5 w-1/5" />
        <h2 className="text-2xl">No Clips Found</h2>
        <p className="mt-3">Start adding clips to see them here.</p>
    </div>
  )
}
