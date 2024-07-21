'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, readPostById, removePostById, updatePostById } from '@/app/globalRedux/features/post'
import toast from 'react-hot-toast'
import Loader from '../ui/Loader'
import { useSession } from 'next-auth/react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useRouter } from 'next/navigation'
import { IPost } from '@/types/types'

const ReadPost = ({ id }: { id: string }) => {
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()
    const { post, error, loading } = useSelector((state: RootState) => state.post)
    const { data: session } = useSession()

    const [title, setTitle] = useState(post?.title)
    const [summary, setSummary] = useState(post?.summary)
    const [content, setContent] = useState(post?.content)

    const [isDelete, setIsDelete] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)


    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [content])

    useEffect(() => {
        dispatch(readPostById({ id }))
    }, [id]);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [error]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newPost: IPost = {
            title: formData.get('title') as string,
            summary: formData.get('summary') as string,
            content: formData.get('content') as string,
        }

        await dispatch(updatePostById({ id, post: newPost }))

        setIsEditing(false)

        toast.success('Post updated successfully')
    }

    const handleDelete = async (formData: FormData) => {
        const postId = formData.get('postId') as string

        await dispatch(removePostById({ id: postId }))

        router.push('/')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-5'>
            {post && (
                <>
                    <form onSubmit={submitHandler} className='w-full h-full'>
                        <div className='mb-4 flex flex-col items-center'>
                            {isEditing && <label className='block text-gray-400 text-sm font-bold mb-2 w-2/3' htmlFor='title'>Title</label>}
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder='Title'
                                defaultValue={title}
                                className={`w-2/3 py-2 px-3 ${isEditing ? 'text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border rounded' : 'bg-transparent text-center text-4xl font-bold'}`}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing && (
                            <div className='mb-4'>
                                <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='summary'>Summary</label>
                                <textarea
                                    name="summary"
                                    id="summary"
                                    placeholder='Summary'
                                    defaultValue={summary}
                                    className={`shadow w-full h-16 py-2 px-3 ${isEditing ? 'appearance-none text-gray-700 border rounded leading-tight focus:outline-none focus:shadow-outline overflow-hidden' : 'bg-transparent'}`}
                                    onChange={(e) => setSummary(e.target.value)}
                                    disabled={!isEditing}
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        )}
                        <div className='mb-6'>
                            {isEditing && <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='content'>Content</label>}
                            <textarea
                                className={`w-full min-h-[500px] py-2 px-3 ${isEditing ? 'shadow text-gray-700 leading-tight focus:outline-none focus:shadow-outline appearance-none border rounded' : 'bg-transparent'}`}
                                id="content"
                                placeholder='Content'
                                name="content"
                                ref={textareaRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={!isEditing}
                                style={{ resize: 'none' }}
                            />
                        </div>
                        {(post.createdBy === session?.user.id || session?.user.role === 'admin') && (
                            <div className='flex gap-10 justify-center'>
                                {!isEditing ? (
                                    <Button
                                        text='Edit'
                                        buttonSize='lg'
                                        type='button'
                                        onClick={() => setIsEditing(true)}
                                        textAlignment='center'
                                    />
                                ) : (
                                    <>
                                        <Button
                                            text='Update'
                                            buttonSize='lg'
                                            type='submit'
                                            textAlignment='center'
                                        />
                                        <Button
                                            text='Cancel'
                                            buttonSize='lg'
                                            type='button'
                                            onClick={() => setIsEditing(false)}
                                            textAlignment='center'
                                        />
                                    </>
                                )}
                                <Button
                                    text='Delete'
                                    buttonSize='lg'
                                    type='button'
                                    onClick={() => setIsDelete(true)}
                                    textAlignment='center'
                                    confirmButton
                                />
                            </div>
                        )}
                    </form>
                </>
            )}
            {isDelete && (
                <Modal
                    title='Delete Post'
                    modalTitle='Are you sure you want to delete this post?'
                    isDelete={isDelete}
                    value={id}
                    action={handleDelete}
                    closeModal={() => setIsDelete(false)}
                />
            )}
        </div>
    )
}

export default ReadPost
