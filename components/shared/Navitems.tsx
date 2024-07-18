'use client'
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type He = {
    route: string;
    label: string;
}
const Navitems = () => {
    const pathname = usePathname();
    // console.log(pathname)
    return (
        <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row ' >
            {headerLinks.map((lin: He) => {
                const isActive = pathname === lin.route || (pathname === '/hostquiz/addusers' && lin.label === 'Host Quiz');
                return (
                    <li key={lin.route}><Link href={lin.route} className={`hover-underline-animation ${isActive && 'text-primary-500'} flex-center p-medium-18 whitespace-nowrap`} >
                        {lin.label}
                    </Link></li>
                )
            })}
        </ul>
    )
}

export default Navitems