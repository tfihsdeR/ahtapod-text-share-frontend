import { IPost } from '@/types/types'
import React from 'react'

const PostCard = ({ post }: { post: IPost }) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h1>{post.id}</h1>
        </div>
    )
}

export default PostCard
