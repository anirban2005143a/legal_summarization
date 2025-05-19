import React, { useEffect, useRef, useState } from 'react'
import { showToast } from './functions/ShowToast';
import { Mic, MicOff } from 'lucide-react';

const VoiceRecognization = ({isReady , setInput}) => {

    //state for voice recognization
    const [isListening, setIsListening] = useState(false);
    const [isBrowserSupported, setIsBrowserSupported] = useState(null);
    const recognitionRef = useRef(null)

    const StartSpeaking = (e) => {
        e.preventDefault()
        setIsListening(true)
        if (!isBrowserSupported) {
            showToast("Speech Recognition is not supported in this browser.", 1)
            return
        }
        recognitionRef.current.start();

        recognitionRef.current.onresult = (event) => {
            setIsListening(false)
            const speechResult = event.results[0][0].transcript;
            setInput(speechResult)
            console.log('Speech recognized:', speechResult);
        };

        recognitionRef.current.onerror = (event) => {
            setIsListening(false)
            console.error('Speech recognition error:', event.error);
            showToast(`Error: ${event.error}`, 1);
        };
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
        </>
    )
}

export default VoiceRecognization