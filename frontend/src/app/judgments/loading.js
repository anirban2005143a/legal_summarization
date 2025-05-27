import { DocumentLoader } from '@/components/librery_section/DocumentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const Loading = () => {
  return (
    <div className=' overflow-hidden md:px-6 sm:px-4 px-2'>
        <NavbarContentLoader />
        <DocumentLoader className="pt-[80px] " />
      </div>
  )
}

export default Loading