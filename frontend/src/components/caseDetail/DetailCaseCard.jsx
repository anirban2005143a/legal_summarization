"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Calendar,
  FileText,
  Layers,
  Bookmark,
  Search,
  Clock,
  Scale,
  LibraryBig,
  ChevronUp,
  ChevronDown,
  DownloadCloud,
  Sparkles,
  Bot,
  Download,
  Copy,
  Globe,
  Loader2,
} from "lucide-react";
import { BackGround } from "../Background/BackGround";
import { useParams, useRouter } from "next/navigation";
import { fetchDocById } from "@/utils/fetchDocById";
import { showToast } from "@/utils/ShowToast";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import DetailCaseCardContentLoader from "./DetailCaseContentLoader";
import axios from "axios";
import ScrollButtons from "../ui/ScrollButtons";
import { handleDownload } from "@/utils/downlaodPdfFromText";
import { copyToClipboard } from "@/utils/copyToClipboard";

const LongExpandableContent = ({ contentRef, content, plainText, setplainText }) => {
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  function htmlToPlainText(htmlString) {
    // Create a temporary DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Extract and return the plain text
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  useEffect(() => {
    if (contentRef.current && content) {
      setNeedsExpansion(contentRef.current.scrollHeight > 500);
      const text = htmlToPlainText(content);
      setplainText(text);
    }
  }, [content]);

  return (
    <div className=" relative">
      {/* main text content  */}
      <div
        ref={(el) => {
          contentRef.current = el;
          // if (ref) {
          //   ref.current = el;
          // }
        }}
        className={`prose prose-amber max-w-none text-gray-800 overflow-hidden transition-all duration-300 ${
          !isContentExpanded && needsExpansion
            ? "max-h-[500px]"
            : "max-h-[none]"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {needsExpansion && (
        <button
          tabIndex={0}
          aria-label="expand and close button"
          onClick={() => setIsContentExpanded(!isContentExpanded)}
          className="mt-4 cursor-pointer flex items-center text-sm text-amber-700 hover:text-amber-800"
        >
          {isContentExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export const DetailCaseCard = ({}) => {
  const [data, setdata] = useState(null);
  const [plainText, setplainText] = useState("");
  const [isGetSummary, setisGetSummary] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const { caseid } = useParams();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    // console.log("anirban");
    try {
      const doc = await fetchDocById(caseid);
      setdata(doc);
    } catch (error) {
      showToast(error.message, 1);
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    !data && fetchData();
  }, []);

  if (isLoading) return <DetailCaseCardContentLoader />;

  return (
    <>
      <ToastContainer />
      <ScrollButtons containerRef={containerRef} />
      <BackGround />
      {data && (
        <div
          className="min-h-screen py-8 px-3 sm:px-4 lg:px-6 mt-[50px] "
        >
          <div className=" grid md:grid-cols-10 grid-cols-1 gap-4 relative mx-auto  ">
            {/* left section  */}
            <div className=" h-fit relative md:col-span-7 col-span-1 bg-white shadow-sm rounded-lg overflow-hidden border border-amber-100">
              {/* Document Header */}
              <div className="bg-amber-800 text-amber-50 md:px-6 px-4 py-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="w-[90%]  flex items-center ">
                    <Scale className="mr-2 h-8 w-8 text-amber-50" />
                    <div className="w-[90%]">
                      <h2 className="text-2xl  md:text-2xl font-bold tracking-tight text-amber-50">
                        {data.title}
                      </h2>
                      <p className="text-amber-50 mt-1 text-sm whitespace-nowrap">
                        {data.docsource}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 text-right">
                    <div className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded bg-amber-700 text-white text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(data.publishdate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <p className="text-amber-100 text-xs mt-1 whitespace-nowrap">
                      Document ID: {data.docid || data.tid}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="md:px-6 px-3 md:py-18 py-20 relative">
                {/* buttons  */}
                <div className=" absolute top-4 md:right-2 left-0 w-full px-3 flex items-center justify-end gap-3">
                  {/* ask ai button */}
                  {plainText && (
                    <AskAiButton
                      onClick={(e) => {
                        e.preventDefault();
                        setisGetSummary(true);
                        window.location.href = "#summary";
                      }}
                    />
                  )}
                  {/* Download button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload({
                        data: data,
                        textContent: null,
                        textContentRef: contentRef,
                      });
                    }}
                    className={`disabled:cursor-not-allowed  flex items-center gap-2 text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 z-50 rounded-lg transition-all duration-200  `}
                  >
                    <Download className=" inline-block w-4 h-4 " />
                    <span className=" md:inline-block hidden">
                      Download Judgment
                    </span>
                  </button>
                </div>

                <LongExpandableContent
                  contentRef={contentRef}
                  content={data.doc}
                  plainText={plainText}
                  setplainText={setplainText}
                />

                {/* ai summary appear here  */}
                <section id="summary" className=" pt-6">
                  <SummaryContent
                    input={plainText}
                    isGetSummary={isGetSummary}
                    setisGetSummary={setisGetSummary}
                  />
                </section>
              </div>
            </div>

            {/* right section  */}
            <div className=" relative md:col-span-3 col-span-1 p-3 bg-white rounded-lg">
              {/* Metadata Section */}
              <div className="pt-6">
                <h3 className="xl:text-lg md:text-base text-sm font-medium mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 " />
                  Document Information
                </h3>

                <div className=" grid grid-cols-2 items-start gap-4 py-3 overflow-x-auto">
                  <div className="border border-amber-100 bg-amber-100/10 p-3  rounded">
                    <div className="flex items-center">
                      <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                        <LibraryBig className="h-4 w-4 text-amber-700" />
                      </div>
                      <div>
                        <p className="text-xs whitespace-nowrap font-medium text-amber-700">
                          Document Type
                        </p>
                        <p className="text-sm whitespace-nowrap">
                          {data.divtype || "Legal Provision"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {data.numcites != undefined && (
                    <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                      <div className="flex items-center">
                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                          <Bookmark className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-amber-700">
                            Citations
                          </p>
                          <p className="text-sm ">{data.numcites}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.numcitedby && (
                    <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                      <div className="flex items-center">
                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                          <Layers className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-amber-700">
                            References
                          </p>
                          <p className="text-sm ">
                            {data.numcitedby?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.covers && (
                    <div className="border max-h-[80px] overflow-auto border-amber-100 bg-amber-100/10 p-3 rounded">
                      <div className="flex items-center">
                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                          <Layers className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-amber-700">
                            Coverage
                          </p>
                          <p className="text-sm ">
                            {data.covers?.map((cover, index) => (
                              <span key={index}>
                                {cover.title}
                                {index < data.covers.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* categories  */}
              {data.cats && (
                <div className="mt-10 border-t border-gray-200 pt-6">
                  <h3 className="xl:text-lg md:text-base text-sm font-medium  mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.cats?.map((category, index) => (
                      <Link
                        href={`/case/`}
                        key={index}
                        className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full md:text-sm text-xs
                       font-medium bg-amber-100/20   border border-amber-100 hover:bg-amber-100/50 transition-colors"
                      >
                        {category.value}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Queries */}
              {data.relatedqs && (
                <div className="mt-10 border-t border-gray-200 pt-6">
                  <h3 className="xl:text-lg md:text-base text-sm font-medium  mb-4 flex items-center">
                    <Search className="xl:h-5 w-4 xl:w-5 h-4 mr-2 " />
                    Related Search Queries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.relatedqs?.map((query, index) => (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          sessionStorage.setItem("query", query.formInput);
                          router.push("/judgments");
                        }}
                        key={index}
                        className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full md:text-sm text-xs font-medium bg-amber-100/20   border border-amber-100 hover:bg-amber-100/50 transition-colors"
                      >
                        {query.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {/* <div className="bg-[#86868610] px-6 py-4 border-t border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm ">
                <p>{data.docsource}</p>
                <div className="mt-2 md:mt-0 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last updated: {new Date().toLocaleDateString("en-IN")}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

const SummaryContent = ({ input, isGetSummary = false, setisGetSummary }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelDropDownOpen, setisModelDropDownOpen] = useState(false);
  const [isLangDropdownOpen, setisLangDropdownOpen] = useState(false);
  const [selectedModel, setselectedModel] = useState("T5");
  const [selectedLang, setselectedLang] = useState("English");
  const modelcontainerRef = useRef();
  const modeldropdownRef = useRef();
  const langcontainerRef = useRef();
  const langdropdownRef = useRef();

  const handelGetSummary = useCallback(
    async (e) => {
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
            model_name: selectedModel || "t5",
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
        setisGetSummary(false);
      }
    },
    [input, selectedModel]
  );

  useEffect(() => {
    // if (isGetSummary && !output && !isLoading) {
    //   handelGetSummary();
    // }
    if (isGetSummary && !isLoading) {
      handelGetSummary();
    }
    console.log(isGetSummary, isLoading);
  }, [isGetSummary, isLoading]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        modelcontainerRef.current &&
        !modelcontainerRef.current.contains(e.target) &&
        modeldropdownRef.current &&
        !modeldropdownRef.current.contains(e.target)
      ) {
        setisModelDropDownOpen(false);
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
    <div className=" md:py-4">
      <div className="flex items-center border-b pb-3 border-gray-200 mb-3 gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-semibold text-[#555555]">
            AI Summarization
          </h2>
        </div>

        {/* select model from dropdown  */}
        <div className="relative inline-block w-fit">
          <button
            ref={modelcontainerRef}
            onClick={() => setisModelDropDownOpen((prev) => !prev)}
            className="w-full cursor-pointer px-3 py-2 flex items-center justify-between gap-2 rounded-md font-semibold text-gray-700 text-sm bg-amber-200/20 border border-amber-900/50 hover:bg-amber-200/30 transition-colors"
          >
            {selectedModel}
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isModelDropDownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {/*model Dropdown */}
          <div
            ref={modeldropdownRef}
            className={`absolute z-10 top-full left-0 w-fit mt-1 bg-white border border-gray-300 rounded-md shadow-md transform transition-all duration-300 origin-top ${
              isModelDropDownOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
            } ${isLoading ? "cursor-not-allowed" : ""}`}
          >
            <ul className="py-2">
              {["T5", "phi4-mini"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setselectedModel(item);
                    setisModelDropDownOpen(false);
                  }}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* select lang from dropdown  */}
        <div className="relative inline-block w-fit">
          <button
            ref={langcontainerRef}
            onClick={() => setisLangDropdownOpen((prev) => !prev)}
            className="w-full cursor-pointer px-3 py-2 flex items-center justify-between gap-2 rounded-md font-semibold text-gray-700 text-sm bg-amber-200/20 border border-amber-900/50 hover:bg-amber-200/30 transition-colors"
          >
            {selectedLang}
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isLangDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {/*language Dropdown */}
          <div
            ref={langdropdownRef}
            className={`absolute z-10 top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md transform transition-all duration-300 origin-top ${
              isLangDropdownOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
            }`}
          >
            <ul className="py-2">
              {["Engish", "Hindi", "Tamil"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setselectedLang(item);
                    setisLangDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex flex-col">
        <AIResponseDisplay output={output} isLoading={isLoading} />
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
          {displayText.split("\n").map((paragraph, index) => (
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

const AskAiButton = ({ className, onClick = () => {} }) => {
  return (
    <>
      <button
        onClick={onClick}
        tabIndex={0}
        className={`flex items-center justify-start sm:justify-end text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-200  ${className}`}
      >
        <Sparkles size={16} className="mr-2 text-amber-700" />
        Summarize with AI
      </button>
    </>
  );
};
