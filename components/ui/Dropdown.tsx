import { ICities } from "@/types/types";
import { useEffect, useRef, useState } from "react";

const Dropdown = ({
    element,
    text,
    onClick,
}: {
    element: ICities,
    text?: string | null,
    onClick?: (value: string, key: string) => void;
}) => {
    const [option, setOption] = useState(text ? text : 'Select Location');
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (key: string, value: string) => {
        setOption(key);
        setIsOpen(false);

        if (onClick) {
            onClick(value, key);
        }
    };

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left uppercase max-sm:static max-sm:mx-auto">
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
                <button className='bg-white text-black text-sm px-2 py-1 rounded-md shadow-md w-36 uppercase' onClick={toggleDropdown}>
                    {option}
                </button>

                {isOpen && (
                    <div className="origin-top-left absolute left-0 mt-2 max-sm:mt-10 w-56 max-sm:w-36 max-sm:ml-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                        {Object.entries(element).map(([country, cityData]) => (
                            <div className="relative group" key={country}>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {country}
                                </a>
                                <div className="hidden max-h-60 overflow-auto group-hover:block origin-top-left absolute left-full top-0 mt-0 w-56 max-xl:w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                    {Object.entries(cityData).map(([city, code]) => (
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            key={code}
                                            onClick={() => handleOptionClick(city, code)}
                                        >
                                            {city}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
