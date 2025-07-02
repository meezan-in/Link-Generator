"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className='flex p-4 items-center justify-between bg-slate-200 shadow-sm'>
      <Image src={'/logo.svg'} width={50} height={50} alt='logo'/>
      <ul className='flex gap-6'>
        <Link href='/dashboard' passHref>
          <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard' && 'text-purple-400 font-bold'}
          `}>Upload</li>
        </Link>
        <Link href='/dashboard/files' passHref>
          <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard/files' && 'text-purple-400 font-bold'}
          `}>Files</li>
        </Link>
        <Link href='/dashboard/learn-more' passHref>
          <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard/learn-more' && 'text-purple-400 font-bold'}
          `}>Upgrade</li>
        </Link>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header;
