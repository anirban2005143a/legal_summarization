"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Sparkles, Bot, Copy, Globe, Loader2, ChevronDown, Download } from "lucide-react";
import style from "./style.module.css";
import axios from "axios";
import { showToast } from "@/utils/ShowToast";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { handleDownload } from "@/utils/downlaodPdfFromText";

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
            max_new_tokens: 128, 
            num_beams: 8, 
            length_penalty: 0.8,
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
          "Unknown error. Please try again",
        1
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !output && !isLoading) {
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
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState("original"); // "original" or "translated"
  const [selectedLang, setSelectedLang] = useState("Telugu");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const langButtonRef = useRef(null);

  const SUPPORTED_LANGUAGES = [
    "Telugu",
    "Hindi",
    "Bengali",
    "Tamil",
    "Marathi",
    "Malayalam",
    "Gujarati",
    "Punjabi",
    "Odia",
    "Kannada"
  ];

  // Reset states when output changes
  useEffect(() => {
    setTranslatedText("");
    setActiveTab("original");
  }, [output]);

  // Handle clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        langDropdownRef.current && !langDropdownRef.current.contains(e.target) &&
        langButtonRef.current && !langButtonRef.current.contains(e.target)
      ) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTranslate = async () => {
    if (isTranslating || !output) return;
    setIsTranslating(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_FAST_URL}/translate`, {
        text: output,
        target_lang: selectedLang,
      });
      if (res.data.success && res.data.translated_text) {
        setTranslatedText(res.data.translated_text);
        setActiveTab("translated");
      } else {
        showToast(res.data.error || "Translation failed", 1);
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || err.message || "Failed to connect to translation server", 1);
    } finally {
      setIsTranslating(false);
    }
  };

  const displayText = activeTab === "translated" ? translatedText : output;

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-auto border border-gray-100 relative pb-16 min-h-[200px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm text-gray-600 font-medium">AI Response</h3>
        </div>
      </div>

      {/* Tab switches */}
      {output && !isLoading && (
        <div className="flex border-b border-gray-200 mb-4 gap-2">
          <button
            onClick={() => setActiveTab("original")}
            className={`px-3 py-1.5 text-xs font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === "original"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Original (English)
          </button>
          {translatedText && (
            <button
              onClick={() => setActiveTab("translated")}
              className={`px-3 py-1.5 text-xs font-semibold border-b-2 transition-colors duration-200 ${
                activeTab === "translated"
                  ? "border-amber-600 text-amber-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Translated ({selectedLang})
            </button>
          )}
        </div>
      )}

      {/* Main content display */}
      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ) : isTranslating ? (
        <div className="py-8 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-7 h-7 text-amber-600 animate-spin" />
          <p className="text-xs font-medium text-gray-500">Translating summary to {selectedLang}...</p>
        </div>
      ) : displayText ? (
        <div className="max-w-none">
          <p className="text-gray-800 text-sm mb-2 whitespace-pre-wrap">
            {displayText}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          AI response will appear here...
        </p>
      )}

      {/* copy, download, and translation bar */}
      {output && !isLoading && !isTranslating && (
        <div className="absolute bottom-3 left-4 right-4 pt-3 border-t border-gray-200/60 flex flex-wrap items-center justify-between gap-4 bg-gray-50">
          {/* Action buttons (copy and download) */}
          <div className="flex items-center gap-4">
            <button
              aria-label="copy answer"
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard(displayText);
              }}
              className="cursor-pointer py-1 px-1.5 hover:bg-gray-200/50 rounded transition-all flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
            <button
              aria-label="download answer"
              onClick={(e) => {
                e.preventDefault();
                handleDownload({
                  data: { title: `Judgment Summary (${activeTab === "translated" ? selectedLang : "English"})` },
                  textContent: displayText,
                });
              }}
              className="cursor-pointer py-1 px-1.5 hover:bg-gray-200/50 rounded transition-all flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Translation controls */}
          <div className="flex items-center gap-2 relative">
            <button
              ref={langButtonRef}
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              className="px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedLang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangDropdownOpen && (
              <div
                ref={langDropdownRef}
                className="absolute z-20 bottom-full right-0 mb-1 w-40 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto"
              >
                <ul className="py-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <li
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs hover:bg-amber-50 cursor-pointer text-gray-700 ${
                        selectedLang === lang ? "bg-amber-50 font-semibold text-amber-700" : ""
                      }`}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleTranslate}
              className="px-3 py-1 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded transition-all flex items-center gap-1"
            >
              Translate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


