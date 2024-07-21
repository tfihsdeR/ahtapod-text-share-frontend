// Profile.tsx
'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const Profile = ({ className }: { className: string }) => {
    const profile = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (profile.current && !profile.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <section className={className}>
            {session && session.user ? (
                <div ref={profile} className="relative inline-block h-full">
                    <div className="flex justify-center items-center h-full">
                        <Image
                            src={session.user.image!}
                            alt="User Image"
                            width={60}
                            height={60}
                            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>

                    <div className={`absolute -left-8 flex flex-col mt-2 w-32 shadow-lg ring-1 ring-black ring-opacity-5 py-1 bg-white dark:bg-gray-800 origin-top transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full opacity-0 invisible'}`}>
                        <Link href="/profile" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                        <Link href="/api/auth/signout" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign Out</Link>
                    </div>
                </div>
            ) : <Link className='relative text-2xl top-5' href="/api/auth/signin">Sign In</Link>}
        </section>
    )
}

export default Profile;
