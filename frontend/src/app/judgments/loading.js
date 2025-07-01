import { DocumentLoader } from "@/components/judgments/DocumentLoader"
import { NavbarContentLoader } from "@/components/navbar/NavbarContentLoader"

const Loading = () => {
  return (
    <>
      <NavbarContentLoader />
      <DocumentLoader className="pt-[80px] " width={10/12} />
    </>
  )
}

export default Loading