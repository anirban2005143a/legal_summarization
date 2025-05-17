import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import AIResponseDisplay from './AIResponseDisplay';
import style from "./style.module.css"

const AIPopup = ({ isOpen, onClose, input }) => {
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const popupRef = useRef(null);

    // useEffect(() => {
    //     // const handleClickOutside = (event) => {
    //     //   if (popupRef.current && !popupRef.current.contains(event.target)) {
    //     //     onClose();
    //     //   }
    //     // };

    //     // if (isOpen) {
    //     //   document.addEventListener('mousedown', handleClickOutside);
    //     //   if (inputRef.current) {
    //     //     inputRef.current.focus();
    //     //   }
    //     // }

    //     return () => {
    //         //   document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isOpen, onClose]);

    const handelGetSummary = (e) => {
        setIsLoading(true)
        setTimeout(() => {
            setOutput("demo output")
            setIsLoading(false)
        }, 2000);
    };

    useEffect(() => {
      if(isOpen){
        handelGetSummary()
      }
    }, [isOpen])
    

    if (!isOpen) return null;

    console.log(style)

    return (
        <div className={`fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${style.animateFadeIn}`}>
            <div
                ref={popupRef}
                className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col ${style.animateScaleIn} border border-gray-200`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Ai Summarization</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                        aria-label="Close popup"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-4 flex flex-col">

                    <AIResponseDisplay
                        output={output}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AIPopup;
