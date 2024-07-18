'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Navitems from './Navitems'
import Mobilenav from './Mobilenav'
import { signIn, signOut, useSession } from 'next-auth/react'
import AuthButton from './AuthButton'

const Header = () => {
  return (
    <header className='w-full border-b fixed top-0 z-20 bg-slate-50'>
      <div className='wrapper flex items-center justify-between '>
        <Link href="/" className='flex items-center' >
          <Image src="/assets/images/logocut.png" width={40} height={10} alt={'Quizly Logo'} />
          <p className='h2-bold font-sans text-fuchsia-800' >Quizly</p>
        </Link>
        <nav className='md:flex-between hidden w-full max-w-xs'>
          <Navitems />
        </nav>
        <div className='flex w-34 justify-end gap-3 items-center'>
          {/* <Button asChild className='rounded-full' size='lg'>
            <Link href='/sign-in'>Signed In</Link>
          </Button> */}
          <AuthButton />
          <Mobilenav />
        </div>
      </div>
    </header>
  )
}

export default Header