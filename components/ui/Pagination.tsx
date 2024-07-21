import React from 'react'

const Pagination = ({
    handleGoToPage1,
    handlePrevPage,
    handleNextPage,
    currentPage,
    handleDisableNextPage,
    className
}: {
    handleGoToPage1: () => void,
    handlePrevPage: () => void,
    handleNextPage: () => void,
    currentPage: number,
    handleDisableNextPage: () => boolean,
    className?: string
}) => {
    return (
        <div className={className}>
            <button className='rounded-md bg-white text-black mx-2 p-1 w-16 shadow-md' onClick={handleGoToPage1} disabled={currentPage === 1}>Page 1</button>
            <button className='rounded-md bg-white text-black mx-2 p-1 w-20 shadow-md' onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span className='text-xl font-bold'>{currentPage} / ?</span>
            <button className='rounded-md bg-white text-black mx-2 p-1 w-20 shadow-md' onClick={handleNextPage} disabled={handleDisableNextPage()}>Next</button>
        </div>
    )
}

export default Pagination
