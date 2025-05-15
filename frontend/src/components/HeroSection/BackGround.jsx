import React from 'react'

const BackGround = () => {
    return (
        <>
            {/* Enhanced decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#7b1113]/10 rounded-full blur-[75px]"></div>
                {/* <div className="absolute top-[30%] -left-[10%] w-[40%] h-[60%] bg-[#6c6256]/10 rounded-full blur-3xl"></div> */}
                <div className="absolute -bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#d42e32]/10 rounded-full blur-[75px]"></div>

                {/* Decorative patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

                {/* Accent lines */}
                <div className="absolute top-[30px] right-0 sm:w-[50%] md:w-[30%] w-[80%] h-[2px] bg-gradient-to-r from-transparent to-[#7b1113]/20"></div>
                <div className="absolute bottom-[30px] left-0 sm:w-[50%] md:w-[30%] w-[80%] h-[2px] bg-gradient-to-r from-[#7b1113]/20 to-transparent"></div>

            </div>
        </>
    )
}

export default BackGround