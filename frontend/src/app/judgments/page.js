
import BackGround from '@/components/Background/BackGround'
import { DocumentLoader } from '@/components/judgments/DocumentLoader'
import LegalCasesList from '@/components/judgments/LegalCasesList'
import Navbar from '@/components/navbar/Navbar'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'
import React from 'react'

const JudgementPage = async () => {

  return (
    <>
      <BackGround />
      <Navbar />
      <LegalCasesList />
      {/* <>
        <NavbarContentLoader />
        <DocumentLoader className="pt-[80px] " />
      </> */}
    </>
  )
}

export default JudgementPage