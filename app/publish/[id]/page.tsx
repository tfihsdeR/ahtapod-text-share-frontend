import ReadPost from '@/components/pages/ReadPost'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div className='container'>
            <ReadPost id={params.id} />
        </div>
    )
}

export default page
