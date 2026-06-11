import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full py-4 m-0 bg-black/10">
            <div className={"lg:w-10/12 container mx-auto flex items-center justify-between px-4"}>
                <div className={"text-white text-lg font-bold flex items-center justify-center gap-2"}>
                   <Image src={"/Rccglogo.png"} alt={"RCCG logo"} width={22} height={22}  /> WAP</div>
                <nav className={"space-x-4"}>
                    <a href="#" className={"text-white hover:text-gray-300"}>Home</a>
                    <a href="/businesses" className={"text-white hover:text-gray-300"}>Businesses</a>
                    <a href="business/create" className={"text-white hover:text-gray-300"}>Add Business</a>
                </nav>
            </div>
        </div>
    )

}
export default Navbar
