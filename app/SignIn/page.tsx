"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPasword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const HandleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const response = await signIn("credentials", {
          email,
          password,
          redirect:false
        })

        if(response?.error){
          setError("Invalid Credentials")
          return
        }

        router.replace("Dashboard")
        
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg rounded-lg border-t-4 p-5 border-[#f03635]'>
                <h1 className='text-xl  font-bold my-4'>Enter the details</h1>
                <form className='flex flex-col gap-3' onSubmit={HandleSubmit}>
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password'  onChange={(e) => setPasword(e.target.value)} />
                    <button className='bg-[#f03635] text-white font-bold cursor-pointer px-6 py-2 rounded-sm'>
                        Sign in 
                    </button>
                    {error &&
                    <div className='text-red-500'>
                        {error}
                    </div>
                    }
                    <Link href='/Register' className='text-sm mt-3 text-right'>Don't have an account? <span className='underline'>Register</span></Link>
                </form>
        </div>  
    </div>
  )
}

export default SignIn
