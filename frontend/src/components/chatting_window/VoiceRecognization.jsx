import React, { useEffect, useRef, useState } from 'react'
import { showToast } from './functions/ShowToast';
import { Mic, MicOff } from 'lucide-react';

const VoiceRecognization = ({ isReady, setInput }) => {

    //state for voice recognization
    const [isListening, setIsListening] = useState(false);
    const [isBrowserSupported, setIsBrowserSupported] = useState(null);
    const recognitionRef = useRef(null)
    const [text, settext] = useState("")

    const StartSpeaking = (e) => {
        e.preventDefault()
        try {
            setIsListening(true)
            if (!isBrowserSupported) {
                showToast("Speech Recognition is not supported in this browser.", 1)
                return
            }
            recognitionRef.current.start();

            recognitionRef.current.onresult = (event) => {
                setIsListening(false)
                const speechResult = event.results[0][0].transcript;
                setInput((prev) => `${prev} ${speechResult}`)
                console.log('Speech recognized:', speechResult);
            };

            recognitionRef.current.onerror = (event) => {
                setIsListening(false)
                console.error('Speech recognition error:', event.error);
                showToast(`Error: ${event.error}`, 1);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        } catch (error) {
            console.log("voice recognization error:"  , error)
            showToast(error.message , 1)
        }
    }

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsBrowserSupported(true)

            //recognition
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';         // Set language
            recognition.continuous = false;     // Stop automatically after speaking
            recognition.interimResults = false; // Only final results

            //set ref
            recognitionRef.current = recognition
        }
    }, [])


    return (
        <>
            {isBrowserSupported && (
                <button
                    type="button"
                    className={`p-1 cursor-pointer transition-colors outline-none ${isListening ? "text-red-500 hover:text-red-400" : "text-gray-600 hover:text-indigo-500"
                        }`}
                    disabled={!isReady}
                    onClick={StartSpeaking}
                >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
            )}

            {isListening && <>
                <div className="mb-4 flex flex-col justify-center items-center fixed top-0 left-0 w-full h-[100dvh] z-10 bg-gray-300/50 backdrop-blur-md">
                    <div className=' relative'>
                        <div className=" absolute top-0 left-0 rounded-full animate-ping bg-red-400 opacity-75 w-20 h-20" />
                        <button
                            className={`w-20 h-20 rounded-full text-white md:text-lg text-sm font-semibold bg-red-500 transition-colors duration-300 `}
                        ><Mic className=' mx-auto my-auto' /></button>
                    </div>

                    <p className={`
                        my-5 md:text-lg text-sm font-medium
                        ${isListening ? 'text-red-500' : 'text-gray-500'}
                        transition-colors duration-300
                    `}>
                        {isListening ? 'Listening...' : 'Not listening'}
                    </p>
                    <p className='pb-2 md:text-sm text-xs text-gray-700 user-select-none'>Stops automatically after speaking</p>
                    <div className=' p-3 border-t md:max-w-[60%] max-w-[90%] '>
                        {!text && <p className=' md:text-base text-sm text-gray-700 text-center'>Output will show here</p>}
                        {text && <p className=' md:text-base text-sm text-gray-800'>{text}</p>}
                    </div>
                </div>
            </>}
        </>
    )
}

export default VoiceRecognization