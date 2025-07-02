import React from 'react'
import {FeedbackForm} from './FeedbackFrom'
import { BackGround } from '../Background/BackGround'

export const Feedback = () => {
    return (
        <>
            <BackGround />
            <div className="pt-[85px] md:w-[60%] md:min-w-[600px] w-full max-w-[1000px] mx-auto py-12 md:py-24">

                <div className="text-center mb-2 px-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We Value Your Feedback</h1>
                    <p className="mt-4 text-lg text-gray-600 ">
                        Help us improve our services by sharing your experience and suggestions.
                    </p>
                </div>
                <FeedbackForm />

            </div>
        </>
    )
}
