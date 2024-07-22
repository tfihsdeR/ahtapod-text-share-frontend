'use client'

import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, readAllUsers } from '@/app/globalRedux/features/user'
import Loader from '../ui/Loader'
import toast from 'react-hot-toast'

const DashBoardPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { users, error, loading } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        dispatch(readAllUsers())
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [error]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full h-full'>
            <h1 className='mb-10'>Dashboard</h1>

            <span className='text-xl'>You can update or delete any post on home page! Because you are an Admin!</span>

            <div className='flex flex-col h-full mt-5 gap-2'>
                <span className='text-2xl font-bold flex items-center mb-10'>Total Users:&nbsp;<span className='text-2xl font-bold'>{users?.length}</span></span>

                {users?.map((user) => (
                    <div key={user.id} className='flex items-center lg:gap-10 max-lg:gap-5 bg-gray-400 max-w-max py-1 px-3 border-white border-2 rounded-md text-black'>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.role}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashBoardPage
