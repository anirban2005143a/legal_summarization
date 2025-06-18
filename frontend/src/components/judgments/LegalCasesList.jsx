"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import LegalCaseCard from "./LegalCaseCard";
import { DocumentLoader } from "./DocumentLoader";
import LoadMoreButton from "./LoadMoreJudgement";
import { fetchDocByQuery } from "@/utils/fetchDocByQuery";
import { showToast } from "../../utils/ShowToast";
import { ToastContainer } from "react-toastify";
import { Search, X } from "lucide-react";

const LegalCasesList = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState(null);

  const handelFetchData = useCallback(
    async (query = "judgment", pagenum = 0) => {
      console.log("djfnewrjnf");
      try {
        setisLoading(true);
        const fetchData = await fetchDocByQuery(query, pagenum);
        console.log(fetchData);

        sessionStorage.setItem("query", query);

        localStorage.setItem(
          "judgments",
          JSON.stringify(fetchData.slice(0, min(fetchData.length, 30)))
        );

        localStorage.setItem(
          "timestamp",
          JSON.stringify({ timestamp: Date.now() })
        );
        setdata((prevData) => [...prevData, ...fetchData]);
      } catch (error) {
        console.log(error);
        showToast(error.message, 1);
      } finally {
        setisLoading(false);
      }
    },
    []
  );

  console.log(data);

  const checkLocalStore = useCallback(async () => {
    const time = JSON.parse(localStorage.getItem("timestamp"))?.timestamp || 0;
    console.log(time);

    if (Date.now() - time >= 1000 * 3600 * 24 * 7) {
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
    checkLocalStore();
  }, []);

  if (data && data.length === 0) {
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
        <div className="space-y-6 md:w-10/12 mx-auto">
          <SearchBar handelSearch={handelFetchData} />
          {isLoading && <DocumentLoader className="pt-[0px] " />}
          {data &&
            data.map((document, index) => {
              return <LegalCaseCard key={index} document={document} />;
            })}
        </div>

        {!isLoading && (
          <LoadMoreButton
            isLoading={isLoading}
            handelLoadMode={handelFetchData}
          />
        )}
      </div>
    </>
  );
};

export default LegalCasesList;

const SearchBar = ({ handelSearch }) => {
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
