'use client'
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../ui/Loader'
import { readPosts } from '@/app/globalRedux/features/post'
import PostCard from '../ui/Cards/PostCard'

const Publication = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { posts, error, loading } = useSelector((state: RootState) => state.post)

    useEffect(() => {
        dispatch(readPosts())
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className=''>
            <h1>Publication</h1>

            <div>
                {posts && posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <button
                className="bg-gray-700 rounded-full hover:bg-gray-600 text-white font-bold p-4 fixed right-10 bottom-10"
                onClick={() => router.push('/newPublish')}
            >
                <FaPlus />
            </button>
        </div>
    )
}

export default Publication
