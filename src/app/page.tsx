"use client"
import { useEffect, useState } from 'react'
import { getSession, supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } 
    else {
      console.log('Login successful')  
      console.log(data)
      router.push('/board')
    }
  }

  // const handleSignup = async () => {
  //   const { error } = await supabase.auth.signUp({ email, password })
  //   if (error) alert(error.message)
  //   else alert('Check your email to confirm signup!')
  // }

  useEffect(() => {
    getSession().then((isLoggedIn) => {
      if (isLoggedIn) {
        router.push('/board')
      }
    })
  }, [router])
  

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full lg:w-1/3 p-4 bg-gray-100 shadow-md text-center mx-3'>
        <h2 className='my-5 text-2xl'>Welcome</h2>
        <div className='flex flex-col gap-3'>
          <input
            className='shadow-xs border border-gray-400 p-2'
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='shadow-xs border border-gray-400 p-2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className='mt-8 mb-4 shadow-xs border border-gray-400 px-6 py-2 hover:cursor-pointer hover:bg-amber-500' onClick={handleLogin}>Log In</button>
      </div>
    </div>
  )
}
