

const Navbar = () => {
    return (
        <div className="w-full py-4 m-0 bg-black/10">
            <div className={"lg:w-10/12 container mx-auto flex items-center justify-between px-4"}>
                <div className={"text-white text-lg font-bold"}>Business Service</div>
                <nav className={"space-x-4"}>
                    <a href="#" className={"text-white hover:text-gray-300"}>Home</a>
                    <a href="#" className={"text-white hover:text-gray-300"}>Business</a>
                    <a href="#" className={"text-white hover:text-gray-300"}>Upload Business</a>
                </nav>
            </div>
        </div>
    )

}
export default Navbar
