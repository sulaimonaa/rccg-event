'use client'

import {useState} from "react";

const CreateBtn = () => {
    const [loading, isLoading] = useState(false);

    return (
        <button
            type="submit"
            className="w-full bg-black/50 text-white py-3 rounded-lg hover:bg-black/60 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
        >
            {loading ? "Creating business" : "Create Business"}
        </button>
    )
}
export default CreateBtn
