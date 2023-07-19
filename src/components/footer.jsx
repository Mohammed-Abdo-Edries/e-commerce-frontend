import React from "react"

const Footer = () => {
    return (
        <div className=" block bottom-0 w-full mt-auto text-center py-4 ">
            &copy; {new Date().getFullYear()} <a href="https://portfolio-sage-nine-23.vercel.app" className="text-blue-700" target="_blank" rel="noopener noreferrer">Mohammed Abdo</a>. All Rights Reserved
        </div>
    )
}

export default Footer