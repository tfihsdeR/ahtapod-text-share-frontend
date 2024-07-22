'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../globalRedux/store'
import { clearError, createUser } from '../globalRedux/features/user'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "", name: "" });

    const router = useRouter();

    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await dispatch(createUser(userInfo));

        if (!loading && !error) {
            toast.success("User created successfully");
            router.push('/signin');
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error]);


    return (
        <div className="container">
            <form className="p-12 border-2 border-gray-500 rounded-md" onSubmit={handleSubmit}>
                <h1 className="text-lg text-center">SignUp</h1>
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
                <div className='flex justify-around'>
                    <input className="block p-1.5 border border-gray-500 rounded-md mt-4 cursor-pointer" type="submit" value="SignUp" />
                    <input className="block p-1.5 border border-gray-500 rounded-md mt-4 cursor-pointer" type="button" value="Login" onClick={() => router.replace('/signin')} />
                </div>
            </form>
        </div>
    )
}

export default SignUp