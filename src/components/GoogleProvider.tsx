import React from 'react'
import Image from 'next/image'
import { handleGoogleLogin } from '@/utils/auth'

const GoogleProvider = ({ page }: { page: string }) => {
    
  return (
      <div className='my-3'>
          <button 
              className='border rounded-md w-full border-gray-400 px-6 py-2 hover:cursor-pointer flex items-center justify-center bg-white text-gray-800 hover:bg-gray-100'
              onClick={handleGoogleLogin}          
          >
              <Image src="/images/google.png" alt="Google Logo" width={20} height={20} className='inline mr-2' />
              <span>{page} with Google</span>
          </button>
      </div>
  )

}

export default GoogleProvider
