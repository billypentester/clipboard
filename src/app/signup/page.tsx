"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import GoogleProvider from '@/components/GoogleProvider'
import { handleSignUp } from '@/utils/auth'

export default function Home() {
  
  const [user, setUser] = useState<IUserCredentials>({ email: '', password: '' })
  const router = useRouter()

  return (
    <div className='h-screen flex items-center justify-center'>
      <form className='w-full lg:w-1/3 p-4 bg-gray-100 shadow-md text-center mx-3'>
        <h2 className='my-5 text-2xl'>Create Account</h2>
        <div className='flex flex-col gap-3'>
          <input
            className='shadow-xs border border-gray-400 rounded-md w-full p-2'
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
          <input
            className='shadow-xs border border-gray-400 rounded-md w-full p-2'
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            autoComplete="new-password"
          />
        </div>
        <button className='mt-8 mb-4 shadow-md border rounded-md w-full bg-gray-800 text-white px-6 py-2 hover:cursor-pointer' onClick={(e)=> handleSignUp(e, router,user)}>Register</button>
        <span>or</span>
        <GoogleProvider page="Sign Up" />
        <p className='text-sm text-gray-500 mt-5'>
            Already have an acccount ? {" "}
            <Link href="/" className='text-black hover:cursor-pointer'>Login</Link>
        </p>
      </form>
    </div>
  )
}
