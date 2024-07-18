// components/SessionStatus.tsx
'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { loginUserHandler } from '@/lib/actions/user';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const AuthButton = () => {
    const router = useRouter();
    const sessionData = useSession();
    useEffect(() => {
        if (sessionData.status === "authenticated") {
            const loginUser = async () => {
                try {
                    // const result = await loginUserHandler(sessionData.user);
                    // console.log("result is", result);
                    // setLoginResult(result);
                    const result = loginUserHandler(sessionData.data.user)
                } catch (error) {
                    console.error("Error logging in user", error);
                }
            };

            loginUser();
        }
    }, [sessionData.status]);

    if (sessionData.status === 'loading') {
        return <Button className='rounded-full ' size='lg'>Loading...</Button>;
    }

    if (sessionData.status === 'authenticated') {
        // console.log('sessionData-> ', sessionData)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {sessionData?.data?.user?.image ? (<Image src={sessionData?.data?.user.image} alt='' width={50} height={50} />) : sessionData?.data?.user?.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{sessionData?.data?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}> Profile </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} >Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>LogOut</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        );
    }

    return (
        <Button onClick={() => signIn('google')} className='rounded-full ' size='lg'>
            Login
        </Button>
    );
};

export default AuthButton;