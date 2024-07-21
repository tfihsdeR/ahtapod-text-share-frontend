'use client'

import { IPost } from '@/types/types'
import React, { useRef, useLayoutEffect, useState } from 'react'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { createPost } from '@/app/globalRedux/features/post'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../ui/Loader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CreatePost = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [content, setContent] = useState('')
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()
    const { post, error, loading } = useSelector((state: RootState) => state.post)

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newPost: IPost = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            summary: formData.get('summary') as string,
        }

        dispatch(createPost({ post: newPost }))
        router.push('/')
    }

    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [content])

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        toast.error(error)
    }

    return (
        <div className='w-full h-full'>
            <form onSubmit={submitHandler}>
                <h1>New Post</h1>
                <div className='mb-4 flex flex-col items-center'>
                    <label className='block text-gray-400 text-sm font-bold mb-2 w-2/3' htmlFor='title'>
                        Title
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='title'
                        type='text'
                        placeholder='Title'
                        name='title'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='summary'>
                        Summary
                    </label>
                    <textarea
                        className='shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-hidden'
                        id='summary'
                        placeholder='Plesae write a summary of your post. Max 200 characters!'
                        name='summary'
                        ref={textareaRef}
                        maxLength={200}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='content'>
                        Content
                    </label>
                    <textarea
                        className='shadow appearance-none border rounded w-full min-h-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='content'
                        placeholder='Content'
                        name='content'
                        ref={textareaRef}
                        value={content}
                        onChange={handleTextChange}
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost
