import { DocumentLoader } from '@/components/Loader/DocumentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const Loading = () => {
  return (
    <div className=' flex flex-col h-screen overflow-hidden'>
      <NavbarContentLoader />
      <DocumentLoader />
    </div>
  )
}

export default Loading