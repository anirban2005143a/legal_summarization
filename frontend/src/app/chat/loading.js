import ChatContentLoader from '@/components/chatting_window/ChatContentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const Loading = () => {
    return (
        <div className=' h-[100dvh]'>
            <NavbarContentLoader />
            <ChatContentLoader className="pt-[150px] " />
        </div>

    )
}

export default Loading