"use state"
import { Mic, MicOff, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import VoiceRecognization from './VoiceRecognization';

const TextAreaForQuery = ({ handelSubmitQuery, isReady, isFetching }) => {
    const [input, setInput] = useState("");

    const textareaRef = useRef(null);

    // Auto-resize textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const maxHeight = 150; // Maximum height before scrolling
            const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;

            // Show scrollbar if content exceeds max height
            if (textareaRef.current.scrollHeight > maxHeight) {
                textareaRef.current.style.overflowY = "auto";
            } else {
                textareaRef.current.style.overflowY = "hidden";
            }
        }
    }, [input]);

    const handelAskAI = (e) => {
        if (e.key === "Enter" && !isFetching && !e.shiftKey) {
            e.preventDefault();
            handelSubmitQuery(input, setInput);
        }
    };

    return (
        <>
            {/* Input Form */}
            <div className="border-t border-gray-500 p-4 " >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handelSubmitQuery(input, setInput)
                }} className="max-w-4xl mx-auto">
                    <div className="relative flex items-center rounded-xl border border-gray-300 bg-gray-200 ">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onInput={(e) => setInput(e.target.value)}
                            onKeyDown={handelAskAI}
                            placeholder="Type your message..."
                            rows="1"
                            className="w-full py-2 px-3 focus:outline-none text-black transition-colors placeholder-gray-600 resize-none"
                            style={{
                                minHeight: "44px",
                                maxHeight: "150px",
                            }}
                        />
                        <div className=" control-buttons w-[110px] flex justify-center gap-2 h-full">
                            <VoiceRecognization isReady={isReady} setInput={setInput} />
                            <button
                                type="submit"
                                className={` p-1 text-gray-600 ${isReady ? "cursor-pointer" : "cursor-not-allowed"} hover:text-indigo-500 transition-colors disabled:cursor-not-allowed disabled:opacity-70`}
                                disabled={!isReady || !input.trim()}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </form>
            </div >
        </>
    )
}

export default TextAreaForQuery