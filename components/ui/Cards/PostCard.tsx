import { IPost } from '@/types/types'
import React from 'react'
import { useRouter } from 'next/navigation'

const PostCard = ({ post }: { post: IPost }) => {
    const router = useRouter()

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return (
        <div
            className='bg-gray-500 border-2 border-spacing-8 rounded-xl p-2 border-slate-950 shadow-md flex flex-col justify-center items-center gap-3 m-5 hover:border-red-800 cursor-pointer hover:scale-110 transition-all duration-200 active:scale-100'
            onClick={() => router.replace(`/publish/${post.id}`)}
        >
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <span>{post.createdByName} / {formatDate(post.createdAt!)}</span>
        </div>
    )
}

export default PostCard