'use client'

import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        // validate your userinfo
        e.preventDefault();

        const res = await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: true,
        });

        console.log(res);
    };
    return (
        <div className="container">
            <form className="p-12 border-2 border-gray-500 rounded-md flex flex-col" onSubmit={handleSubmit}>
                <h1 className="text-lg text-center">Login</h1>
                <input
                    className="block p-1.5 border border-gray-500 rounded-md mt-4 text-black"
                    value={userInfo.email}
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                    type="email"
                    placeholder="john@email.com"
                />
                <input
                    className="block p-1.5 border border-gray-500 rounded-md mt-4 text-black"
                    value={userInfo.password}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                    type="password"
                    placeholder="********"
                />
                <div className="flex justify-around">
                    <input className="block p-1.5 border border-gray-500 rounded-md mt-4 cursor-pointer" type="submit" value="Login" />
                    <input className="block p-1.5 border border-gray-500 rounded-md mt-4 cursor-pointer" type="button" value="SignUp" onClick={() => router.replace('/signup')} />
                </div>

                <div className="flex gap-5 mt-5 justify-center">
                    <Image src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google.png" alt="google" width={80} height={80} onClick={() => signIn("google")} className="cursor-pointer bg-transparent rounded-full" style={{ objectFit: 'fill' }} />
                    <Image src="https://w7.pngwing.com/pngs/914/758/png-transparent-github-social-media-computer-icons-logo-android-github-logo-computer-wallpaper-banner-thumbnail.png" alt='github' width={80} height={80} onClick={() => signIn("github")} className="cursor-pointer bg-transparent rounded-full" style={{ objectFit: 'fill' }} />
                </div>
            </form>
        </div>
    );
};

export default SignIn;
