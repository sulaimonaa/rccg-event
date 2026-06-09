'use client'

const ExploreBtn = () => {
    return (
        <button type="button" className={"bg-black/30 hover:bg-black/30 text-white font-bold py-4 px-8 rounded-full"} onClick={() => {return "I'm clicked!"}}>
            <a href="#business" className={"text-white hover:text-gray-300"}>
                Explore Business
            </a>
        </button>
    )
}
export default ExploreBtn
