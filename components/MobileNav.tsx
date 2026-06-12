'use client'
import Image from "next/image";
import {FaBars, FaTimes} from "react-icons/fa";
import Link from "next/link";
import {useState} from "react";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <>
            <button onClick={toggleMenu} className={"text-white"}><FaBars /></button>
            {
                isOpen && (
                    <div className={"absolute inset-0 top-0 bg-black p-4 z-[1]"}>
                        <nav className={"space-y-4 flex flex-col gap-3"}>
                            <button onClick={toggleMenu} className={"text-white self-end"}><FaTimes /></button>
                            <Link onClick={toggleMenu} href="/" className={"text-white hover:text-gray-300"}>Home</Link>
                            <Link onClick={toggleMenu} href="/businesses" className={"text-white hover:text-gray-300"}>Businesses</Link>
                            <Link onClick={toggleMenu} href="/business/create" className={"text-white hover:text-gray-300"}>Add Business</Link>
                        </nav>
                    </div>
                )
            }

        </>
    )
}
export default MobileNav
