"use client";
import { Send, ChevronDown, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ShowUploadedFiles } from "../ui/ShowUploadedFiles";
import { extractTextFromPdf } from "@/utils/extractTextFromPdf";

export const TextAreaForQuery = ({
  isEmpty,
  handelSubmitQuery,
  isReady,
  setisReady,
  isFetching,
  selectedFiles,
  setselectedFiles,
  selectedModel,
  setselectedModel,
}) => {
  const [input, setInput] = useState("");
  const [isModelDropdownOpen, setisModelDropdownOpen] = useState(false);
  const [isTextExtracting, setisTextExtracting] = useState(false);
  const modelcontainerRef = useRef();
  const modeldropdownRef = useRef();
  const textareaRef = useRef(null);
  const maxHeight = 150; // px

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;

      // Show scrollbar if content exceeds max height
      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [input]);

  const handelAskAI = (e) => {
    if (e.key === "Enter" && !isFetching && !e.shiftKey) {
      e.preventDefault();
      handelSubmitQuery(input, setInput);
    }
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

    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modelcontainerRef, modeldropdownRef]);

  useEffect(() => {
    if (!selectedFiles || selectedFiles.length == 0) {
      setInput("");
      return;
    }
    extractTextFromPdf(
      selectedFiles[0],
      setInput,
      setisTextExtracting,
      setisReady
    );
  }, [selectedFiles]);

  return (
    <>
      {/* Input Form */}
      <div className={`${!isEmpty ? "border-t border-gray-500" : ""}  p-4 `}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handelSubmitQuery(input, setInput);
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative flex items-center rounded-2xl border border-amber-800 bg-gray-200/30 ">
            <div className="w-full">
              {!selectedFiles || selectedFiles.length == 0 ? (
                <textarea
                  ref={textareaRef}
                  value={input}
                  onInput={(e) => {
                    e.preventDefault();
                    !isReady && setisReady(e.target.value.trim() !== "");
                    setInput(e.target.value);
                  }}
                  onKeyDown={handelAskAI}
                  placeholder="Type your message..."
                  rows="1"
                  className={`w-full ${
                    isEmpty ? "px-6 py-5 " : "py-3 px-3"
                  }  focus:outline-none text-gray-800 text-sm transition-colors placeholder-gray-500 resize-none`}
                  style={{
                    minHeight: "44px",
                    maxHeight: "150px",
                  }}
                />
              ) : (
                <ShowUploadedFiles
                  files={selectedFiles}
                  setFiles={setselectedFiles}
                  extractedText={input}
                  setExtractedText={setInput}
                  isLoading={isTextExtracting}
                  textareaRef={textareaRef}
                />
              )}

              <div className=" flex items-center justify-start gap-1 pl-1">
                {/* select model from dropdown  */}
                <div className="relative w-fit mx-1 mb-1">
                  <button
                    ref={modelcontainerRef}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setisModelDropdownOpen((prev) => !prev);
                    }}
                    className="w-full cursor-pointer px-1.5 py-1 flex items-center justify-between gap-1 rounded-full font-medium text-xs text-gray-900  bg-amber-200/20 border border-amber-900/40 hover:bg-amber-200/10 transition-colors"
                  >
                    {selectedModel}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isModelDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/*type Dropdown */}
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    ref={modeldropdownRef}
                    className={`absolute z-10 bottom-full left-0 w-fit mt-1 bg-white border border-gray-300 rounded-md shadow-md transform transition-all duration-300 origin-top ${
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
                          className="px-4 py-1.5  whitespace-nowrap text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>



                {/* select pdf file  */}
                <div className="relative w-fit mb-1">
                  <label
                    htmlFor="file-input"
                    className="w-full cursor-pointer px-1.5 py-1 flex items-center justify-between gap-1 rounded-full font-medium text-gray-900 text-xs bg-amber-200/20 border border-amber-900/40 hover:bg-amber-200/10 transition-colors"
                  >
                    <Plus
                      className="w-5 h-5 transition-transform duration-300"
                    />
                    Select file
                  </label>
                  {/*file input */}
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    multiple={false}
                    // value={selectedFiles}
                    onChange={(e) => {
                      setselectedFiles(Array.from(e.target.files));
                      e.target.value = null;
                    }}
                    id="file-input"
                    className=" hidden"
                  />
                </div>
              </div>
            </div>
            <div className=" control-buttons w-fit px-3 flex justify-center gap-2 h-full">
              {/* <VoiceRecognization isReady={isReady} setInput={setInput} /> */}
              <button
                type="submit"
                className={` p-1 text-gray-600 cursor-pointer hover:text-indigo-500 transition-colors disabled:cursor-not-allowed disabled:opacity-70`}
                disabled={!isReady || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
