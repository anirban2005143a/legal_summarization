import { BackGround } from "@/components/Background/BackGround"
import { DocumentLoader } from "@/components/judgments/DocumentLoader"
import { LegalCasesList } from "@/components/judgments/LegalCasesList"
import { Navbar } from "@/components/navbar/Navbar"
import { NavbarContentLoader } from "@/components/navbar/NavbarContentLoader"

const JudgementPage = async () => {

  return (
    <>
      <BackGround />
      <Navbar />
      <LegalCasesList />
      {/* <>
        <NavbarContentLoader />
        <DocumentLoader className="pt-[80px] " width={10/12} />
      </> */}
    </>
  )
}

export default JudgementPage