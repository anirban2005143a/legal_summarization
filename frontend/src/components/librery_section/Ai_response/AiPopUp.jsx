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
            setOutput(`One Kumar Krishna Prasad Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal with costs. The`)
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
        <div className={`fixed h-screen top-0 w-full left-0 inset-0 bg-gray-900/10 backdrop-blur-sm flex items-center z-50 md:p-4 p-2 ${style.animateFadeIn}`}>
            <div
                ref={popupRef}
                className={`bg-white rounded-xl shadow-2xl w-full mx-auto md:w-[60%]  max-w-5xl sticky top-0 max-h-[80vh] min-h-[300px] flex flex-col ${style.animateScaleIn} border border-gray-200`}
            >
                <div className="flex items-center justify-between md:p-4 p-3 border-b border-gray-100">
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

                <div className="flex-1 overflow-auto md:p-4 p-2 flex flex-col">

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
