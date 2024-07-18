import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t" >
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-0 text-center sm:flex-row" >
                {/* <Link href='/'>
                    <Image src='/assets/images/logo.svg' alt='logo' width={78} height={32} />
                </Link> */}
                <Link href="/" className='flex items-center' >
                    <Image src="/assets/images/logocut.png" width={20} height={7} alt={'Quizly Logo'} />
                    <p className='p-bold-20 font-sans text-fuchsia-900' >Quizly</p>
                </Link>
                <p className="p-medium-14">2024 Quizly. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer