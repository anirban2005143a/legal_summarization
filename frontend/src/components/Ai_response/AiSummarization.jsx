import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { AIPopup } from "./AiPopUp";

export const AiSummarization = ({ input , className }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    document.body.style.overflowY = "hidden";
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    document.body.style.overflowY = "auto";
    setIsPopupOpen(false);
  };

  return (
    <div className={`${className}`}>
      <ToastContainer />
      <AskAiButton onClick={handleOpenPopup} />
      <AIPopup isOpen={isPopupOpen} onClose={handleClosePopup} input={input} />
    </div>
  );
};

const AskAiButton = ({ className, onClick = () => {} }) => {
  return (
    <>
      <button
        onClick={onClick}
        tabIndex={0}
        className={`flex items-center justify-start sm:justify-end text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-200  ${className}`}
      >
        <Sparkles size={16} className="mr-2 text-amber-700" />
        Ask AI to summarize
      </button>
    </>
  );
};
