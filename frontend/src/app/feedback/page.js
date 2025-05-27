import Feedback from '@/components/Feedback/Feedback'
import FeedbackContentLoader from '@/components/Feedback/FeedbackContentLoader/FeedbackContentLoader'
import Navbar from '@/components/navbar/Navbar'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'

const page = () => {
    return (
        <>
            <Navbar />
            <Feedback />
        </>
        // <>
        //     <NavbarContentLoader />
        //     <FeedbackContentLoader/>
        // </>
    )
}

export default page