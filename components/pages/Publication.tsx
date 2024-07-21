'use client'
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../ui/Loader'
import { clearError, readPosts } from '@/app/globalRedux/features/post'
import PostCard from '../ui/Cards/PostCard'
import toast from 'react-hot-toast'

const Publication = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { posts, error, loading } = useSelector((state: RootState) => state.post)

    useEffect(() => {
        dispatch(readPosts())
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [error]);

    // useEffect(() => {
    //     const handleRouteChange = (url: string) => {
    //         if (url === '/') {
    //             dispatch(readPosts())
    //         }
    //     }

    //     router. events.on('routeChangeComplete', handleRouteChange)

    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange)
    //     }
    // }, [router.events, dispatch]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <h1 className='mb-10'>Publications</h1>

            <div className='w-full flex flex-wrap justify-center'>
                {posts && posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <button
                className="bg-gray-700 rounded-full hover:bg-gray-600 text-white font-bold p-7 max-lg:p-4 fixed right-10 bottom-10"
                onClick={() => router.push('/newPublish')}
            >
                <FaPlus />
            </button>
        </div>
    )
}

export default Publication
