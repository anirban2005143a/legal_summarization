import React, { useState } from 'react';
import AskAiButton from './AskAiButton';
import AIPopup from './AiPopUp';

const AiSummarization = ({input}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    document.body.style.overflowY = "hidden"
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    document.body.style.overflowY = "auto"
    setIsPopupOpen(false);
  };

  return (
    <div>
      <AskAiButton onClick={handleOpenPopup} />
      <AIPopup isOpen={isPopupOpen} onClose={handleClosePopup} input={input} />
    </div>
  );
};

export default AiSummarization;
