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
} from "lucide-react";
import { BackGround } from "../Background/BackGround";
import { useParams, useRouter } from "next/navigation";
import { fetchDocById } from "@/utils/fetchDocById";
import { showToast } from "@/utils/ShowToast";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import DetailCaseCardContentLoader from "./DetailCaseContentLoader";
import { AiSummarization } from "../Ai_response/AiSummarization";
import ScrollButtons from "../ui/ScrollButtons";
import jsPDF from "jspdf";

const LongExpandableContent = ({ ref, content }) => {
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const [plainText, setplainText] = useState("");
  const contentRef = useRef(null);

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
      <div
        ref={(el) => {
          contentRef.current = el;
          if (ref) {
            ref.current = el;
          }
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
      {plainText && <AiSummarization input={plainText} className={"mt-5"} />}
    </div>
  );
};

export const DetailCaseCard = ({  }) => {
  const [data, setdata] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { caseid } = useParams();
  console.log(caseid);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    console.log("anirban");
    try {
      const doc = await fetchDocById(caseid);
      setdata(doc);
    } catch (error) {
      showToast(error.message, 1);
    } finally {
      setisLoading(false);
    }
  }, []);

  // download the doc
  const handleDownload = useCallback(() => {
    try {
      const doc = new jsPDF();

      const content = contentRef.current?.innerText?.trim() || "";
      const title = data.title?.trim() || "Untitled";
      if (!content) return;

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(title, 10, 20);

      // Content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const pageHeight = doc.internal.pageSize.height;
      const marginTop = 30;
      const lineHeight = 7;
      const maxY = pageHeight - 20;

      let y = marginTop;
      const lines = doc.splitTextToSize(content, 190);

      lines.forEach((line) => {
        if (y > maxY) {
          doc.addPage();
          y = 20; // reset y for new page
        }
        doc.text(line, 10, y);
        y += lineHeight;
      });

      doc.save(`${title}.pdf`);
    } catch (error) {
      console.log(error);
      showToast(error.message || "Download failed", 1);
    }
  }, [data]);

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
          ref={containerRef}
          className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-[50px] "
        >
          <div className="max-w-5xl relative mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-amber-100">
            {/* Document Header */}
            <div className="bg-amber-800 text-amber-50 px-6 py-5">
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

            <div
              className=" relative pt-8
            "
            >
              {/* Download button */}
              <button
                onClick={handleDownload}
                className={`disabled:cursor-not-allowed absolute top-2 right-2 flex items-center gap-2 text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 z-50 rounded-lg transition-all duration-200  `}
              >
                <DownloadCloud className=" inline-block w-4 h-4 " />
                Download Judgment
              </button>

              {/* Document Content */}
              <div className="px-6 py-5">
                <LongExpandableContent ref={contentRef} content={data.doc} />

                {/* Metadata Section */}
                <div className="mt-10 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 " />
                    Document Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                      <div className="flex items-center">
                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                          <LibraryBig className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-amber-700">
                            Document Type
                          </p>
                          <p className="text-sm ">
                            {data.divtype || "Legal Provision"}
                          </p>
                        </div>
                      </div>
                    </div>

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

                    <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
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
                  </div>
                </div>

                {/* categories  */}
                {data.cats && (
                  <div className="mt-10 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium  mb-4 flex items-center">
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
                    <h3 className="text-lg font-medium  mb-4 flex items-center">
                      <Search className="h-5 w-5 mr-2 " />
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
            </div>

            {/* Footer */}
            <div className="bg-[#86868610] px-6 py-4 border-t border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm ">
                <p>{data.docsource}</p>
                <div className="mt-2 md:mt-0 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last updated: {new Date().toLocaleDateString("en-IN")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
