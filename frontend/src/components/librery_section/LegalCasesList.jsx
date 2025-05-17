"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import LegalCaseCard from './LegalCaseCard';
import { useDebounce } from '@/hooks/useDebounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import FetchData from './fetchData';
import { DocumentLoader } from './DocumentLoader';

const LegalCasesList = ({ initialData }) => {
  const [data, setdata] = useState(initialData || [])
  const [page, setpage] = useState(2)
  const [hasMore, sethasMore] = useState(true)
  const [isLoading, setisLoading] = useState(true)

  const fetchMoreData = async () => {
    setpage((prevPage) => prevPage + 1); // Increment page on scroll
  }

  // useEffect(() => {
  //   try {
  //     console.log("again")
  //     FetchData({ page, setdata, sethasMore, setisLoading })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [page])

  return (
    <div className=' max-w-7xl mx-auto md:px-6 sm:px-4 px-2 pt-[100px] pb-5'>

      {isLoading && <DocumentLoader />}

      {!isLoading && data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">

          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h1>loading...</h1>}
          >
            {data.map((legalCase) => (
              <LegalCaseCard key={legalCase.id} legalCase={legalCase} />
            ))}
          </InfiniteScroll>
        </div>
      )}

    </div>
  );
};

export default LegalCasesList;
