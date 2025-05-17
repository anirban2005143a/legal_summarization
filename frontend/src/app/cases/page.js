
import React from 'react'
import LegalCasesList from "@/components/librery_section/LegalCasesList";

const Cases = async () => {

  const res = await fetch(`${process.env.NEXT_APP_URL}/api/data?page=1&limit=10`, {
    cache: 'no-store',
  });
  const initialData = await res.json();

  return (
    <LegalCasesList initialData={initialData} />
  )
}

export default Cases