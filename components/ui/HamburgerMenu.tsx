import React from 'react';

const HamburgerMenu = ({ isOpen, onClick, className }: { isOpen: boolean, onClick: () => void, className?: string }) => {
    return (
        <button onClick={onClick} className={`flex flex-col justify-center items-center absolute ${className}`}>
            <span className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} >
            </span>
            <span className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} >
            </span>
            <span className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} >
            </span>
            {/* <button
                    className='absolute hidden right-16 top-7 max-lg:flex'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Open
                </button> */}
        </button>
    );
}

export default HamburgerMenu;
