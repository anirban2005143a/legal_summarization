
import BackGround from '@/components/Background/BackGround'
import { DocumentLoader } from '@/components/librery_section/DocumentLoader'
import LegalCasesList from '@/components/librery_section/LegalCasesList'
import Navbar from '@/components/navbar/Navbar'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'
import React from 'react'

const JudgementPage = async () => {

  return (
    <>
      <BackGround />
      <Navbar />
      <LegalCasesList />
      {/* <div className=' overflow-hidden'>
        <NavbarContentLoader />
        <DocumentLoader className="pt-[80px] " />
      </div> */}
    </>
  )
}

export default JudgementPage