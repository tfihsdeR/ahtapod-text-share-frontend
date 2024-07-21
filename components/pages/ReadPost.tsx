'use client'

import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, readPostById } from '@/app/globalRedux/features/post'
import toast from 'react-hot-toast'
import Loader from '../ui/Loader'
import { useSession } from 'next-auth/react'
import Button from '../ui/Button'

const ReadPost = ({ id }: { id: string }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { post, error, loading } = useSelector((state: RootState) => state.post)
    const { data: session } = useSession()

    useEffect(() => {
        dispatch(readPostById({ id }))
    }, [dispatch, id]);

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
        <div className='h-full w-full flex flex-col items-center gap-5'>
            {post && (
                <>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                    <p className='text-lg'>{post.content}</p>

                    {(post.createdBy === session?.user.id || session?.user.role === 'admin') && (
                        <div className='flex gap-10'>
                            <Button
                                text='Edit'
                                buttonSize='lg'
                                type='button'
                                onClick={() => console.log('Edit')}
                                textAlignment='center'
                            />
                            <Button
                                text='Delete'
                                buttonSize='lg'
                                type='button'
                                onClick={() => console.log('Delete')}
                                textAlignment='center'
                                confirmButton
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ReadPost
