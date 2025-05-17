"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LegalCaseCard from './LegalCaseCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import FetchData from './FetchData';
import { DocumentLoader } from './DocumentLoader';

const LegalCasesList = () => {
  const [data, setdata] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  const [isLoading, setisLoading] = useState(true)
  const [AllExpandedContent, setAllExpandedContent] = useState({})

  const allCasesRef = useRef()

  const fetchMoreData = async () => {
    setpage((prevPage) => prevPage + 1); // Increment page on scroll
  }

  useEffect(() => {
    if (allCasesRef.current) {
      try {
        console.log("again")
        FetchData({ page, data, setdata, allCasesRef, sethasMore, setisLoading })
      } catch (error) {
        console.log(error)
      }
    }
  }, [allCasesRef.current, page])

  const toggleExpand = (id) => {
    setAllExpandedContent(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className=' max-w-7xl mx-auto md:px-6 sm:px-4 px-2 pt-[100px] pb-5'>

      {isLoading && <DocumentLoader />}

      {!isLoading && data && data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      )}

      <div className="space-y-6">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<><DocumentLoader /></>}
          ref={allCasesRef}
        >
          {data.map((legalCase, index) => (
            <LegalCaseCard
              key={index}
              id={index}
              legalCase={legalCase}
              isExpand={AllExpandedContent[index]}
              onToggle={() => toggleExpand(index)} />
          ))}

        </InfiniteScroll>
      </div>


    </div>
  );
};

export default LegalCasesList;
