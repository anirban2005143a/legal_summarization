import ChatContentLoader from '@/components/chatting_window/ChatContentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const Loading = () => {
    return (
        <div className=' flex flex-col h-screen overflow-hidden'>
            <NavbarContentLoader />
            <ChatContentLoader />
        </div>
    )
}

export default Loading