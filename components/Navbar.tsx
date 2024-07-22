'use client'

import { NavLinks } from '@/constants/constants'
import Image from 'next/image'
import Link from 'next/link'
import Profile from './Profile';
import { useState } from 'react'
import HamburgerMenu from './ui/HamburgerMenu';
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <nav className={`flex w-full py-5 px-8 gap-4 fixed bg-black lg:border-b max-lg:absolute ${isOpen ? 'max-lg:h-screen' : 'max-lg:h-20'} transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-center gap-10 w-full max-lg:flex-col">
                <Link href='/' className='absolute left-10 max-sm:left-1 max-lg:top-4'>
                    <Image
                        src='/erdinc.png'
                        width={60}
                        height={60}
                        alt='Website Logo'
                    />
                </Link>
                <HamburgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className='z-50 invisible max-lg:visible right-16 max-sm:right-5 top-9 transition-all duration-300 ease-in-out' />
                <ul className={`flex text-2xl gap-7 max-lg:flex-col items-center ${isOpen ? 'max-lg:flex' : 'max-lg:hidden'}`}>
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key} onClick={() => setIsOpen(!isOpen)}>
                            {link.text}
                        </Link>
                    ))}
                    {session?.user.role === 'admin' && <Link onClick={() => setIsOpen(false)} href='/dashboard'>Dashboard</Link>}
                    <div className='hidden max-lg:flex max-lg:flex-col items-center gap-7'>
                        {session?.user ? (
                            <>
                                <Link onClick={() => setIsOpen(false)} href='/profile'>Profile</Link>
                                <Link onClick={() => setIsOpen(false)} href='/api/auth/signout'>Sign Out</Link>
                            </>
                        ) : (
                            <Link onClick={() => setIsOpen(false)} href='signin'>Sign In</Link>
                        )}
                    </div>

                </ul>
                <Profile className='absolute right-10 h-20 max-lg:hidden w-32' />
            </div>
        </nav>
    )
}

export default Navbar
