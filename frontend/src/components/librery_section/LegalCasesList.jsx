"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LegalCaseCard from './LegalCaseCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import FetchData from './FetchData';
import { DocumentLoader } from './DocumentLoader';

const LegalCasesList = () => {
  const [data, setdata] = useState(null)
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  const [isLoading, setisLoading] = useState(true)

  const fetchMoreData = async () => {
    setpage((prevPage) => prevPage + 1); // Increment page on scroll
  }

  useEffect(() => {
    try {
      console.log("again")
      FetchData({ page, data, setdata, sethasMore, setisLoading })
    } catch (error) {
      console.log(error)
    }
  }, [page])


  return (
    <div className=' max-w-7xl mx-auto md:px-6 sm:px-4 px-2 pt-[100px] pb-5'>

      {isLoading && <DocumentLoader />}

      {!isLoading && data && data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      )}

      {!isLoading && data && <div className="space-y-6">

        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<><DocumentLoader /></>}
        >
          {data.map((legalCase) => (
            <LegalCaseCard key={legalCase.id} legalCase={legalCase} />
          ))}

        </InfiniteScroll>
      </div>}


    </div>
  );
};

export default LegalCasesList;
