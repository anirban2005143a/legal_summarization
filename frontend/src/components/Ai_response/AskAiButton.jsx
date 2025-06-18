import React, { useState } from 'react'
import AIPopup from './AiPopUp'
import { Sparkles } from 'lucide-react'

const AskAiButton = ({className , input }) => {
    const [isOpen, setisOpen] = useState(false)

    const handelOpenModal = (e) => {
        e.preventDefault()
        setisOpen(true)
    }

    const handelCloseModal = (e) => {
        e.preventDefault()
        setisOpen(false)
    }
    console.log(input)

    return (
        <>
            <AIPopup input={input} isOpen={isOpen} onClose={handelCloseModal} />
            <button
                onClick={(handelOpenModal)}
                tabIndex={0}
                className={`flex items-center justify-start sm:justify-end text-sm bg-neutral-400/10 border-2 border-gray-100 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-200  ${className}`}>
                <Sparkles size={16} className="mr-2 text-amber-700" />
                Ask AI to summarize
            </button>
        </>
    )
}

export default AskAiButton