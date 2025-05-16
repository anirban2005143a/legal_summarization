import React from 'react'
import data from "../../../legal_judgments.json"
import LegalCasesList from "@/components/librery_section/LegalCasesList";

const Cases = () => {
  return (
    <LegalCasesList cases={data}/>
  )
}

export default Cases