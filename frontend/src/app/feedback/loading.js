import FeedbackContentLoader from '@/components/Feedback/FeedbackContentLoader/FeedbackContentLoader'
import NavbarContentLoader from '@/components/navbar/NavbarContentLoader'
import React from 'react'

const loading = () => {
    return (
        <>
            <NavbarContentLoader />
            <FeedbackContentLoader/>
        </>
    )
}

export default loading