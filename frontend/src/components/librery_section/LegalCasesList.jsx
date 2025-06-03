"use client"
import { useState, useEffect, useCallback, useRef } from 'react';
import LegalCaseCard from './LegalCaseCard';
import FetchData from './FetchData';
import { DocumentLoader } from './DocumentLoader';

const LegalCasesList = () => {

  const [isLoading, setisLoading] = useState(true)
  const [AllExpandedContent, setAllExpandedContent] = useState({})
  const [data, setdata] = useState(null)
  const [query, setquery] = useState("")

  useEffect(() => {
    // fetchInitialData()
  }, [])

  const toggleExpand = useCallback(
    (id) => {
      setAllExpandedContent(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    },
    [],
  )


  return (
    <div className=' max-w-[1500px] mx-auto md:px-6 sm:px-4 px-2 pt-[80px] pb-5'>

      {/* {isLoading && <DocumentLoader />} */}

      {/* {!isLoading && data && data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      )} */}

      <div className="space-y-6 md:w-10/12 mx-auto">

        <LegalCaseCard />

      </div>


    </div>
  );
};

export default LegalCasesList;
