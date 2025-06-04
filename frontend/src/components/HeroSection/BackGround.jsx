import React from 'react'

const BackGround = () => {
    return (
        <>
            {/* Enhanced decorative background elements */}
            <div className="absolute top-0 left-0 w-[100dvw] h-full overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#74603e38] rounded-full blur-[75px]"></div>
                <div className="absolute -bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#d4812e2a] rounded-full blur-[75px]"></div>

                {/* Decorative patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

            </div>
        </>
    )
}

export default BackGround