import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import NavbarItem from './NavbarItem';

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const tooggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, []);

    const tooggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, []);

    return (
        <nav className='w-full fixed z-40'>
            <div className={`px-4 md:px-16 py-6 flex flex-row transition items-center duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <Image src='/images/logo.png' alt='Logo' height={100} width={60} className='h-6 lg:h-8' />
                <div className='flex-row ml-8 gap-7 hidden lg:flex'>
                    <NavbarItem label='Home' />
                    <NavbarItem label='Series' />
                    <NavbarItem label='Films' />
                    <NavbarItem label='New & Popular' />
                    <NavbarItem label='My List' />
                    <NavbarItem label='Browse by languages' />
                </div>
                <div onClick={tooggleMobileMenu} className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>
                    <div onClick={tooggleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:h-10 lg:w-10 rounded-md overflow-hidden'>
                            <Image src='/images/default-green.png' alt='Profile' width={200} height={200} />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar