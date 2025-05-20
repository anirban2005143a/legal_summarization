
// "use client"

// import React, { useEffect, useState } from 'react';
// import { MessageSquare, ThumbsUp, ThumbsDown, Bug, Lightbulb, Send, Loader2 } from 'lucide-react';
// import { ToastContainer } from "react-toastify"
// import { showToast } from '../chatting_window/functions/ShowToast';

// export default function FeedbackForm() {

//     const [feedbackType, setFeedbackType] = useState('');
//     const [feedback, setFeedback] = useState('');
//     const [email, setEmail] = useState('');
//     const [isLoading, setisLoading] = useState(false)
//     const [userRating, setuserRating] = useState(-1)

//     const handleSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             setisLoading(true)
//             // Handle feedback submission here
//             // console.log({ feedbackType, feedback, email });
//             //   const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/feedback/save`, {
//             //     feedbackType,
//             //     feedback,
//             //     email
//             //   }, {
//             //     headers: {
//             //       'Content-Type': 'application/json',
//             //       Authorization: `Bearer ${localStorage.getItem('token')}`
//             //     }
//             //   })
//             //   console.log(res.data)
//             showToast(res?.data?.message || "Feedback send successfully.", 0)
//         } catch (error) {
//             console.log(error)
//             showToast(error.response?.data?.message || error.message, 1)
//         } finally {
//             // Reset form
//             setFeedbackType('');
//             setFeedback('');
//             setEmail('');
//             setisLoading(false)
//         }

//     };

//     const feedbackTypes = [
//         { id: 'general', icon: MessageSquare, label: 'General Feedback' },
//         { id: 'positive', icon: ThumbsUp, label: 'Positive Feedback' },
//         { id: 'negative', icon: ThumbsDown, label: 'Negative Feedback' },
//         { id: 'bug', icon: Bug, label: 'Report Bug' },
//         { id: 'suggestion', icon: Lightbulb, label: 'Suggestion' },
//     ];

//     return (
//         <>
//             <ToastContainer />

//             <div id='feedback' className=" text-gray-700 p-4 ">
//                 <div className="max-w-2xl mx-auto">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                             {feedbackTypes.map(({ id, icon: Icon, label }) => (
//                                 <button
//                                     key={id}
//                                     type="button"
//                                     onClick={() => setFeedbackType(id)}
//                                     className={`
//                                             p-4 rounded-lg border-[1px] transition-all bg-amber-50 duration-200 flex flex-col items-center gap-2
//                                             ${feedbackType === id
//                                             ? 'border-blue-700 '
//                                             : 'border-gray-400   hover:bg-gray-800 hover:border-gray-600'}`}
//                                 >
//                                     <Icon className={`w-6 h-6 ${feedbackType === id ? 'text-blue-600' : 'text-gray-500'}`} />
//                                     <span className="text-sm text-center">{label}</span>
//                                 </button>
//                             ))}
//                         </div>


//                         <div className="space-y-4">
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors duration-200"
//                                     placeholder="your@email.com"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Your Feedback
//                                 </label>
//                                 <textarea
//                                     id="feedback"
//                                     value={feedback}
//                                     onChange={(e) => setFeedback(e.target.value)}
//                                     rows={5}
//                                     className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors duration-200 resize-none"
//                                     placeholder="Share your thoughts..."
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
//                         >
//                             {!isLoading && <Send className="w-4 h-4" />}
//                             {isLoading ? <Loader2 className='animate-spin' /> : "Submit Feedback"}
//                         </button>
//                     </form>

//                     <div className="mt-8 text-sm text-gray-400 text-center">
//                         Thank you for helping us improve our product
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


"use client"

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Bug, Lightbulb, Send, Loader2 } from 'lucide-react';
import { ToastContainer } from "react-toastify"
import { showToast } from '../chatting_window/functions/ShowToast';

export default function FeedbackForm() {
    const [feedbackType, setFeedbackType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(-1);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast("Feedback submitted successfully!", 0);
        } catch (error) {
            console.log(error);
            showToast(error.message || "Failed to submit feedback", 1);
        } finally {
            setFeedbackType('');
            setFeedback('');
            setEmail('');
            setIsLoading(false);
        }
    };

    const feedbackTypes = [
        { id: 'general', icon: MessageSquare, label: 'General' },
        { id: 'positive', icon: ThumbsUp, label: 'Positive' },
        { id: 'negative', icon: ThumbsDown, label: 'Negative' },
        { id: 'bug', icon: Bug, label: 'Bug' },
        { id: 'suggestion', icon: Lightbulb, label: 'Suggestion' },
    ];

    return (
        <>
            <ToastContainer />
            
            <div className="md:px-6 px-3 py-6 mx-2 rounded-xl shadow-xl sm:border-0 border border-gray-300 my-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">Share Your Feedback</h2>
                {/* <p className="text-gray-500 mb-6">We value your input to help us improve</p> */}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Feedback Type</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {feedbackTypes.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFeedbackType(id)}
                                    className={`
                                        p-3 rounded-lg border flex flex-col items-center gap-2 transition-all duration-100 ease-out
                                        ${feedbackType === id
                                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'}
                                    `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-xs font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email (optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500  outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Feedback <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="feedback"
                                value={feedback}
                                required
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500  outline-none transition-colors resize-none"
                                placeholder="Please share your detailed feedback..."
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading || !feedback}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Submit Feedback
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    Thank you for helping us improve our service
                </div>
            </div>
        </>
    );
}