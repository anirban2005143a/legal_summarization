"use client"
import { useState, useEffect, useCallback, useRef } from 'react';
import LegalCaseCard from './LegalCaseCard';
import { DocumentLoader } from './DocumentLoader';
import LoadMoreButton from './LoadMoreJudgement';
import { fetchDocByQuery } from '@/utils/fetchDocByQuery';
import { showToast } from '../chatting_window/functions/ShowToast';
import { ToastContainer } from 'react-toastify';

const LegalCasesList = () => {

  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState(null)
  const [query, setquery] = useState("judgment")

  const fetchData = useCallback(
    async () => {
      const fetchData = await fetchDocByQuery(query)
      console.log(fetchData)
      !data && fetchData.length < 30 && localStorage.setItem("judgments", JSON.stringify(fetchData))
      setdata(fetchData)
    },
    [],
  )


  const checkLocalStore = useCallback(
    () => {
      const localStoreData = localStorage.getItem("judgments")
      if (localStoreData) {
        try {
          const parseData = JSON.parse(localStoreData)
          parseData ? setdata(parseData) : fetchData()
        } catch (error) {
          console.log(error)
          showToast(error.message, 1)
        }
      } else fetchData()
    },
    [],
  )


  useEffect(() => {
    checkLocalStore()
  }, [])


  return (
    <>
      <ToastContainer />
      <div className=' max-w-[1500px] mx-auto md:px-6 sm:px-4 px-2 pt-[80px] pb-5'>

        {/* {isLoading && <DocumentLoader />} */}

        {/* {!isLoading && data && data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      )} */}

        <div className="space-y-6 md:w-10/12 mx-auto">

          {data && data.map((document, index) => {
            return (
              <LegalCaseCard key={index} document={document} />
            )
          })}

        </div>

        <LoadMoreButton />

      </div>
    </>
  );
};

export default LegalCasesList;


