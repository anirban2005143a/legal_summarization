"use client";
import {
  Sparkles,
  Bot,
  TreeDeciduous,
  Copy,
  Download,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { HomePageSummaryTextArea } from "./homepage_summary_textarea";
import { showToast } from "@/utils/ShowToast";
import axios from "axios";
import { handleDownload } from "@/utils/downlaodPdfFromText";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { FileText, Upload, X, FileIcon, Settings, Globe } from "lucide-react";
import { extractTextFromPdf } from "@/utils/extractTextFromPdf";

export const HomePageSummary = ({}) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setselectedModel] = useState("T5");
  const [selectedLang, setselectedLang] = useState("English");
  const [input, setinput] = useState("");

  const handelGetSummary = useCallback(async () => {
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
          model_name: selectedModel || "T5",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      // words = res.data.summary.split(" ")

      // setOutput(words);
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
    // console.log(input);
  }, [input, selectedModel]);

  return (
    <>
      <section id="home-page-summary" className="mx-3">
        {/* <HomePageSummaryTextArea
          isEmpty={input ? false : true}
          handelSubmitQuery={handelGetSummary}
          isReady={isReady}
          setisReady={setisReady}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          selectedLang={selectedLang}
          setselectedLang={setselectedLang}
          input={input}
          setInput={setinput}
        /> */}

        <FileUploadArea
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          selectedLang={selectedLang}
          setselectedLang={setselectedLang}
          setinput={setinput}
        />

        {input && (
          <AskAiButton
            isLoading={isLoading}
            isDisabled={input ? false : true}
            onClick={() => {
              if (isLoading) return;
              handelGetSummary();
            }}
          />
        )}
        {output && <AIResponseDisplay isLoading={isLoading} output={output} />}
      </section>
    </>
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

  // Reset states when the original output changes (e.g. new document summarized)
  useEffect(() => {
    setTranslatedText("");
    setActiveTab("original");
  }, [output]);

  // Handle clicking outside the language dropdown
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
    <div className="relative pb-6 mt-3 max-w-4xl mx-auto border border-gray-100 bg-gray-50 rounded-lg">
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 p-4 overflow-auto">
          {/* Header row */}
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
        </div>
      </div>

      {/* copy, download, and translation bar */}
      {output && !isLoading && !isTranslating && (
        <div className="mt-4 pt-4 border-t border-gray-200/60 flex flex-wrap items-center justify-between gap-4 px-4">
          {/* Action buttons (copy and download) */}
          <div className="flex items-center gap-4">
            <button
              aria-label="copy answer"
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard(displayText);
              }}
              className="cursor-pointer py-1 px-2 hover:bg-gray-200/50 rounded transition-all flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800"
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
              className="cursor-pointer py-1 px-2 hover:bg-gray-200/50 rounded transition-all flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800"
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

const AskAiButton = ({
  className,
  isLoading,
  isDisabled,
  onClick = () => {},
}) => {
  return (
    <>
      {!isLoading && (
        <button
          disabled={isDisabled}
          onClick={onClick}
          // onClick={()=>{
          //   console.log("dfjnd")
          // }}
          tabIndex={0}
          className={`disabled:opacity-78 disabled:cursor-default flex max-w-4xl mx-auto items-center justify-start sm:justify-end text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-200  ${className}`}
        >
          <Sparkles size={16} className="mr-2 text-amber-700" />
          Summarize with AI
        </button>
      )}

      {isLoading && (
        <div
          className={`opacity-78 cursor-default w-fit flex gap-3 max-w-4xl mx-auto items-center justify-start sm:justify-end text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold text-gray-700  py-2 px-4 rounded-lg transition-all duration-200  ${className}`}
        >
          <Loader2 size={20} className="text-gray-700 animate-spin "/>
          Summarizing judgment
        </div>
      )}
    </>
  );
};

const FileUploadArea = ({
  selectedModel,
  setselectedModel,
  selectedLang,
  setselectedLang,
  setinput,
}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [isModelDropdownOpen, setisModelDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setisLangDropdownOpen] = useState(false);
  const [isTextExtracting, setisTextExtracting] = useState(true);

  const modelcontainerRef = useRef();
  const modeldropdownRef = useRef();
  const langcontainerRef = useRef();
  const langdropdownRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        modelcontainerRef.current &&
        !modelcontainerRef.current.contains(e.target) &&
        modeldropdownRef.current &&
        !modeldropdownRef.current.contains(e.target)
      ) {
        setisModelDropdownOpen(false);
      }
      if (
        langcontainerRef.current &&
        !langcontainerRef.current.contains(e.target) &&
        langdropdownRef.current &&
        !langdropdownRef.current.contains(e.target)
      ) {
        setisLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modelcontainerRef, modeldropdownRef, langcontainerRef, langdropdownRef]);

  // extract text from file
  useEffect(() => {
    const onError = () => {
      setFile(null);
      setinput("");
    };

    extractTextFromPdf(file, setinput, setisTextExtracting, undefined, onError);
  }, [file]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* File upload area */}
      <div
        className={`border-2 ${
          isDragging ? "border-amber-900/50 bg-orange-50" : "border-gray-400/70"
        } border-dashed rounded-lg p-8 text-center  transition-all duration-200 hover:border-amber-900/50 hover:bg-amber-500/0`}
        // onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-3 bg-amber-700/5 rounded-full">
                <FileText className="w-8 h-8 text-amber-800" />
              </div>
            </div>

            {/* File info section */}
            <div className="text-center">
              <p className="text-md font-medium text-gray-800 truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

            {/* loader while text is extracting from pdf  */}
            {isTextExtracting && (
              <div className=" flex justify-center items-center gap-2">
                <Loader2 size={20} className=" text-gray-700 animate-spin" />
                <p className=" font-medium text-gray-600 text-sm translate-y-[1px]">
                  Processing the text from pdf
                </p>
              </div>
            )}

            {!isTextExtracting && (
              <>
                {/* Dropdowns section */}
                <div className="gap-y-3 gap-x-3 grid sm:grid-cols-2 grid-cols-1">
                  {/* Model selection */}
                  <div className="relative ">
                    <label className="flex items-center gap-2 text-md font-medium text-gray-600 mb-1">
                      <Settings className="w-4 h-4" />
                      Select Model
                    </label>

                    <button
                      ref={modelcontainerRef}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setisModelDropdownOpen((prev) => !prev);
                      }}
                      className="w-full cursor-pointer px-4 py-1.5 flex items-center justify-between gap-1 rounded-sm font-medium text-base text-gray-600  bg-amber-100/10 border border-amber-800/40  transition-colors"
                    >
                      {selectedModel}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isModelDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/*select model Dropdown */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      ref={modeldropdownRef}
                      className={`absolute z-10 top-[95%] left-0 w-full mt-1 bg-gray-50 border border-gray-300 rounded-sm shadow-md transform transition-all duration-300 origin-top ${
                        isModelDropdownOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                    >
                      <ul className="">
                        {["T5", "Phi4-mini"].map((item) => (
                          <li
                            key={item}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("changing");
                              setselectedModel(item);
                              setisModelDropdownOpen(false);
                            }}
                            className="px-4 py-2 border-b-1 border-gray-200 whitespace-nowrap font-medium text-sm text-gray-700 hover:bg-gray-200/50 cursor-pointer"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Language selection */}
                  <div className="relative ">
                    <label className="flex items-center gap-2 text-md font-medium text-gray-600 mb-1">
                      <Globe className="w-4 h-4" />
                      Language
                    </label>

                    <button
                      ref={langcontainerRef}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setisLangDropdownOpen((prev) => !prev);
                      }}
                      className="w-full cursor-pointer px-4 py-1.5 flex items-center justify-between gap-1 rounded-sm font-medium text-base text-gray-600  bg-amber-100/10 border border-amber-800/40  transition-colors"
                    >
                      {selectedLang}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isLangDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/*select model Dropdown */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      ref={langdropdownRef}
                      className={`absolute z-10 top-[95%] max-h-[150px] overflow-auto left-0 w-full mt-1 bg-gray-50 border border-gray-200/10 rounded-sm shadow-md transform transition-all duration-300 origin-top ${
                        isLangDropdownOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                    >
                      <ul className="">
                        {[
                          "English",
                          "Spanish",
                          "French",
                          "German",
                          "Japanese",
                        ].map((item) => (
                          <li
                            key={item}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("changing");
                              setselectedLang(item);
                              setisLangDropdownOpen(false);
                            }}
                            className="px-4 py-2 border-b-1 border-gray-200 whitespace-nowrap font-medium text-sm text-gray-700 hover:bg-gray-200/50 cursor-pointer"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="mt-8 cursor-pointer flex items-center justify-center gap-2 w-fit mx-auto px-4 py-2 text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors border border-amber-200"
                >
                  <X className="w-4 h-4" />
                  Remove File
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-amber-700/7 rounded-full">
                <svg
                  className="w-10 h-10 text-amber-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-600 mb-2">
              Choose a file or drag & drop here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: JPG, PNG, PDF, DOC (Max 10MB)
            </p>
            <button
              type="button"
              className="px-6 py-2 cursor-pointer bg-amber-800 text-white font-medium rounded-md hover:bg-amber-900 transition-colors focus:outline-none focus:ring-2 "
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
            >
              Browse Files
            </button>
          </>
        )}
      </div>

      {/* Selected file info (if any) */}
      {/* {file && (
        <div className="mt-4 p-3 bg-orange-50 rounded-md border border-orange-100">
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-orange-500 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-sm text-gray-700">
              File selected: <span className="font-medium">{file.name}</span>
            </span>
          </div>
        </div>
      )} */}
    </div>
  );
};
