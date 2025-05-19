import { DocumentLoader } from '@/components/librery_section/DocumentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const Loading = () => {
  return (
    <div className=' overflow-hidden'>
      <NavbarContentLoader />
      <DocumentLoader className="pt-[80px] " />
    </div>
  )
}

export default Loading