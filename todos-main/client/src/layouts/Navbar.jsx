import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
);

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
);

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <nav className="w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all w-full">

            <a href="#" className='flex items-center gap-0 sm:gap-1'>
                <img className="h-10" src={logo} alt="Todos Logo" />
                <h2 className='text-2xl text-[#489BFD] font-bold'><span className=''>T</span>odos</h2>
            </a>

            {/* Desktop Menu */}
            <div className="flex items-center gap-2 sm:flex items-center gap-8">

                <Stack direction="row" spacing={1}>
                    <div className='flex justify-center items-center gap-2 sm:gap-6'>
                        <Link to="/" className='flex justify-center items-center sm:gap-1.5 font-semibold text-[#1976D2]'>
                            <HomeIcon color="primary" />Todos
                        </Link>

                        <Link to="/addTodo" className='flex justify-center items-center sm:gap-1 text-[#9B50AA] font-semibold'>
                            <PlusIcon color="secondary" /> Add Todo
                        </Link>
                    </div>
                </Stack>
            </div>

        </nav>
    )
}

export default Navbar