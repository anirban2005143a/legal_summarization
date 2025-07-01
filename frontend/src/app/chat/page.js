import { Chat } from '@/components/chatting_window/Chat'
import { ChatContentLoader } from '@/components/chatting_window/ChatContentLoader'
import { NavbarContentLoader } from '@/components/navbar/NavbarContentLoader'

const page = () => {
    return (
        <Chat />
    //    <div className=' h-[100dvh] md:px-6 sm:px-4 px-2'>
    //         <NavbarContentLoader />
    //         <ChatContentLoader className="pt-[90px] " />
    //     </div>
    )
}

export default page