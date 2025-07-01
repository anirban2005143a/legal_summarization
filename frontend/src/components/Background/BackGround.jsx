
export const BackGround = () => {
    return (
        <>
            {/* Enhanced decorative background elements */}
            <div className="fixed top-0 left-0 w-full h-[100dvh] overflow-hidden -z-1">
                <div className="fixed -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#956210]/10 rounded-full blur-[75px]"></div>
                <div className="fixed -bottom-[10%] left-[0%] w-[40%] h-[40%] bg-[#956210]/12 rounded-full blur-[85px]"></div>

                {/* Decorative patterns */}
                <div className="fixed top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

            </div>
        </>
    )
}