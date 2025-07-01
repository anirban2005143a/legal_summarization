"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Sparkles, Bot } from "lucide-react";
import style from "./style.module.css";
import axios from "axios";
import { showToast } from "@/utils/ShowToast";

export const AIPopup = ({ isOpen, onClose, input }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);

  const handelGetSummary = useCallback(async (e) => {
    setIsLoading(true);
    // setTimeout(() => {
    //     setOutput(`One Kumar Krishna Prasad Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal w Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal wi Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal wth costs. The`)
    //     setIsLoading(false)
    // }, 2000);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FAST_URL}/predict`,
        {
          text: input,
          parameters: {
            max_new_tokens: 128, // Override local default of 128
            num_beams: 8,
            length_penalty: 0.8, // Favors longer outputs (values <1.0)
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setOutput(res.data.summary);
    } catch (error) {
      console.log(error);
      showToast(
        error.response?.data?.detail ||
          error.message ||
          "Unknown error. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !output) {
      handelGetSummary();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed h-screen top-0 w-full left-0 inset-0 bg-gray-900/10 backdrop-blur-sm z-50 md:p-4 p-2 ${style.animateFadeIn}`}
    >
      <div
        ref={popupRef}
        className={`bg-white rounded-xl shadow-2xl w-[95%] mx-auto md:w-[60%]  max-w-5xl absolute md:top-[10dvh] top-[8dvh] left-1/2 -translate-x-1/2 max-h-[80dvh] min-h-[300px] flex flex-col ${style.animateScaleIn} border border-gray-200`}
      >
        <div className="flex items-center justify-between md:p-4 p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ai Summarization
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-700 bg-gray-800/10 p-2 rounded-full cursor-pointer md:hover:bg-gray-800/20 transition-colors"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto md:p-4 p-2 flex flex-col">
          <AIResponseDisplay output={output} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

const AIResponseDisplay = ({ output, isLoading }) => {
  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-auto border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-amber-600" />
        <h3 className="text-sm uppercase text-gray-600 font-medium">
          AI Response
        </h3>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ) : output ? (
        <div className=" max-w-none">
          {output.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-800 text-sm mb-2 whitespace-pre-wrap"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          AI response will appear here...
        </p>
      )}
    </div>
  );
};
