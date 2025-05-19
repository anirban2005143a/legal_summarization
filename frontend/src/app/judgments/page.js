
import LegalCasesList from '@/components/librery_section/LegalCasesList'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import Loading from './loading'

const  CasesPage = async() => {

  return (
    <>
      <Navbar />
      <LegalCasesList />
    </>
  )
}

export default CasesPage