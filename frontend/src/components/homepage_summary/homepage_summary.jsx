"use client";
import {
  Sparkles,
  Bot,
  TreeDeciduous,
  Copy,
  Download,
  ChevronDown,
} from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { HomePageSummaryTextArea } from "./homepage_summary_textarea";
import { showToast } from "@/utils/ShowToast";
import axios from "axios";
import { handleDownload } from "@/utils/downlaodPdfFromText";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { FileText, Upload, X, FileIcon, Settings, Globe } from "lucide-react";

export const HomePageSummary = ({}) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setselectedModel] = useState("T5");
  const [selectedLang, setselectedLang] = useState("English");
  const [input, setinput] = useState("");
  const [isReady, setisReady] = useState(TreeDeciduous);

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
      <section id="home-page-summary">
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
        />

        <AskAiButton
          isDisabled={input ? false : true}
          onClick={() => {
            if (isLoading) return;
            handelGetSummary();
          }}
        />
        <AIResponseDisplay isLoading={isLoading} output={output} />
      </section>
    </>
  );
};

const AIResponseDisplay = ({ output, isLoading }) => {
  return (
    <div className="relative md:pb-4 mt-3 max-w-4xl mx-auto border border-gray-100 bg-gray-50  rounded-lg">
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1  p-4 overflow-auto ">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm  text-gray-600 font-medium">AI Response</h3>
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
              <p className="text-gray-800 text-sm mb-2 whitespace-pre-wrap">
                {output}

                {/* <TypewriterEffect words={output}/> */}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">
              AI response will appear here...
            </p>
          )}
        </div>
      </div>

      {/* copy and download summary  */}
      <div
        className={`${
          output && !isLoading ? "" : "hidden"
        } absolute left-5 bottom-0 flex items-center gap-4 w-fit`}
      >
        <button
          aria-label="copy answer"
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(output);
          }}
          className=" cursor-pointer py-2"
        >
          <Copy className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
        </button>
        <button
          aria-label="download answer"
          onClick={(e) => {
            e.preventDefault();
            handleDownload({
              data: { title: "Judgment Summary" },
              textContent: output,
            });
          }}
          className=" cursor-pointer py-2"
        >
          <Download className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
        </button>
      </div>
    </div>
  );
};

const AskAiButton = ({ className, isDisabled, onClick = () => {} }) => {
  return (
    <>
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
    </>
  );
};

const FileUploadArea = ({
  selectedModel,
  setselectedModel,
  selectedLang,
  setselectedLang,
}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [isModelDropdownOpen, setisModelDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setisLangDropdownOpen] = useState(false);

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
                    {["English", "Spanish", "French", "German", "Japanese"].map(
                      (item) => (
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
                      )
                    )}
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
