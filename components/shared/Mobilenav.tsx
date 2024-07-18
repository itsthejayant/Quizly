import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { Separator } from '../ui/separator'
import Navitems from './Navitems'

const Mobilenav = () => {
    return (
        <div className='md:hidden'>
            <Sheet >
                <SheetTrigger className=''>
                    <Image src='/assets/icons/menu.svg' width={44} height={44} className='cursor-pointer' alt='menu' />
                </SheetTrigger>
                <SheetContent className='flex flex-col gap-5 bg-teal-100 '>
                    {/* <Image src="/assets/images/logo.svg" width={108} height={32} alt={'Quizly Logo'} /> */}
                    <div className='flex items-center' >
                        <Image src="/assets/images/logocut.png" width={40} height={10} alt={'Quizly Logo'} />
                        <p className='h2-bold font-sans text-fuchsia-900' >Quizly</p>
                    </div>
                    <Separator />
                    <Navitems />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Mobilenav