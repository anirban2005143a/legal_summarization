"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { LegalCaseCard } from "./LegalCaseCard";
import { DocumentLoader } from "./DocumentLoader";
import { fetchDocByQuery } from "@/utils/fetchDocByQuery";
import { showToast } from "../../utils/ShowToast";
import { ToastContainer } from "react-toastify";
import { Search, X, ChevronDown, Loader } from "lucide-react";

export const LegalCasesList = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [pagenum, setpagenum] = useState(0);

  const handelFetchData = useCallback(
    async (query = "judgment", pageNumber = 0) => {
      if (!query) {
        showToast("Search query not found", 1);
        setisLoading(false);
        return;
      }
      if (pageNumber < 0) {
        showToast("Page number can not be negative", 1);
        setisLoading(false);
        return;
      }

      console.log(query);

      try {
        const fetchData = await fetchDocByQuery(query, pageNumber);
        console.log(fetchData);

        query != "judgment" && sessionStorage.setItem("query", query);

        if (pageNumber !== 0) setdata((prev) => [...prev, ...fetchData]);
        else setdata(fetchData);
      } catch (error) {
        console.log(error);
        showToast(error.message, 1);
      } finally {
        setisLoading(false);
      }
    },
    []
  );

  console.log(pagenum);

  const checkLocalStore = useCallback(async () => {
    const time = JSON.parse(localStorage.getItem("timestamp"))?.timestamp || 0;
    console.log("fetch data form local store : ", time);

    if (Date.now() - time >= 1000 * 3600 * 24) {
      console.log("long");
      handelFetchData();
      return;
    }

    const localStoreData = localStorage.getItem("judgments");
    if (localStoreData) {
      try {
        // setisLoading(true)
        const parseData = await JSON.parse(localStoreData);
        if (parseData && Array.isArray(parseData) && parseData.length > 0) {
          setdata(parseData);
          setisLoading(false);
        } else handelFetchData();
      } catch (error) {
        setisLoading(false);
        console.log(error);
        showToast(error.message, 1);
      }
    } else handelFetchData();
  }, []);

  useEffect(() => {
    !sessionStorage.getItem("query") && checkLocalStore();
    sessionStorage.getItem("query") &&
      handelFetchData(sessionStorage.getItem("query"));
  }, []);

  //store first 10 entries of data to localStorage to prevent api call overhead
  useEffect(() => {
    if (!data) return;

    localStorage.setItem(
      "judgments",
      JSON.stringify(data.slice(0, Math.min(data.length, 30)))
    );

    localStorage.setItem(
      "timestamp",
      JSON.stringify({ timestamp: Date.now() })
    );
  }, [data]);

  if (!isLoading && data && data.length === 0) {
    return (
      <div className="text-center py-8 rounded-lg border border-gray-200 pt-[180px]">
        <p className="text-gray-500 text-lg">
          No cases matching your search criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className=" max-w-[1500px] mx-auto md:px-6 sm:px-4 px-2 pt-[80px] pb-5">
        <div className="space-y-6 md:w-10/12 md:mx-auto">
          <SearchBar
            handelSearch={handelFetchData}
            setisLoading={setisLoading}
          />
          {isLoading && <DocumentLoader className="pt-[0px] " />}
          {data &&
            data.map((document, index) => {
              return <LegalCaseCard key={index} document={document} />;
            })}
        </div>

        {!isLoading && (
          <LoadMoreButton
            handelLoadMode={handelFetchData}
            pagenum={pagenum}
            setpagenum={setpagenum}
          />
        )}
      </div>
    </>
  );
};

const SearchBar = ({ handelSearch, setisLoading }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setsearchQuery("");
  };

  return (
    <div className=" border-b ">
      <div className="container mx-auto px-4 py-3">
        <div
          className={`relative max-w-3xl mx-auto ${
            isFocused ? "ring-1 ring-amber-600" : ""
          } rounded-lg transition-all`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setisLoading(true);
                handelSearch(searchQuery);
              }
            }}
            placeholder="Search judgments, acts, or legal documents..."
            className="block w-full pl-10 pr-12 py-3 bg-white border border-amber-800/50 rounded-lg text-gray-600 placeholder-gray-500/70 focus:outline-none  transition-colors"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-800 hover:text-black transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadMoreButton = ({ handelLoadMode, pagenum, setpagenum }) => {
  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="flex justify-center my-10 px-4">
      <button
        aria-label="load more button"
        disabled={isLoading}
        onClick={async (e) => {
          e.preventDefault();
          const query = sessionStorage.getItem("query") || "judgment";
          setisLoading(true);
          await handelLoadMode(query, pagenum + 1);
          setpagenum(pagenum + 1);
          setisLoading(false);
        }}
        className={`
          relative overflow-hidden
          flex items-center justify-center 
          px-8 py-3.5 rounded-lg
          text-base font-medium tracking-wide
          bg-white border border-gray-200
          shadow-xs hover:shadow-sm
          text-gray-700 hover:text-gray-900
          transition-all duration-300
          group
          ${isLoading ? "cursor-wait" : "cursor-pointer hover:border-amber-100"}
        `}
      >
        {/* Animated background (appears on hover) */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-white/30 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 -z-10"
        />

        {/* Loading spinner */}
        {isLoading ? (
          <div className="flex items-center gap-2.5">
            <Loader className="h-5 w-5 animate-spin text-amber-700" />
            <span className="text-gray-600">Loading Cases...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span>Load More Cases</span>
            <ChevronDown
              className={`h-5 w-5 text-amber-700 transition-transform duration-300 
                                    ${
                                      isLoading
                                        ? "opacity-0"
                                        : "group-hover:translate-y-0.5"
                                    }`}
            />
          </div>
        )}

        {/* Animated border bottom (appears on hover) */}
        <span
          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-700 
                        group-hover:w-4/5 group-hover:left-[10%] 
                        transition-all duration-300"
        />
      </button>
    </div>
  );
};
