import React from 'react'
import FeedbackForm from './FeedbackFrom'
import BackGround from '../Background/BackGround'

const Feedback = () => {
    return (
        <>
            <BackGround />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-12 md:py-24">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-2">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We Value Your Feedback</h1>
                            <p className="mt-4 text-lg text-gray-600">
                                Help us improve our services by sharing your experience and suggestions.
                            </p>
                        </div>
                        <FeedbackForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback