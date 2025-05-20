// "use client"

// import React, { useState } from "react"
// import { CheckCircle } from "lucide-react"

// export default function FeedbackForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     feedbackType: "",
//     rating: "",
//     message: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     setIsSubmitting(false)
//     setIsSubmitted(true)
//   }

//   if (isSubmitted) {
//     return (
//       <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
//         <div className="flex flex-col items-center justify-center py-10 text-center">
//           <div className="mb-4 rounded-full bg-green-100 p-3">
//             <CheckCircle className="h-10 w-10 text-green-600" />
//           </div>
//           <h3 className="mt-2 text-2xl font-semibold text-gray-900">Thank You!</h3>
//           <p className="mt-4 text-gray-600">
//             Your feedback has been successfully submitted. We appreciate your input and will use it to improve our
//             services.
//           </p>
//           <button
//             className="mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//             onClick={() => setIsSubmitted(false)}
//           >
//             Submit Another Response
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold">Feedback Form</h2>
//         <p className="text-sm text-gray-500">
//           Please fill out the form below with your feedback. All fields marked with an asterisk (*) are required.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="name"
//               name="name"
//               required
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               placeholder="john.doe@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="feedbackType" className="block text-sm font-medium">
//             Feedback Type <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="feedbackType"
//             name="feedbackType"
//             required
//             value={formData.feedbackType}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           >
//             <option value="">Select feedback type</option>
//             <option value="general">General Feedback</option>
//             <option value="suggestion">Suggestion</option>
//             <option value="bug">Bug Report</option>
//             <option value="compliment">Compliment</option>
//             <option value="complaint">Complaint</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">
//             How would you rate your experience? <span className="text-red-500">*</span>
//           </label>
//           <div className="flex space-x-4">
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <label key={rating} className="flex flex-col items-center space-y-1 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={rating}
//                   checked={formData.rating === rating.toString()}
//                   onChange={handleChange}
//                   className="sr-only peer"
//                   required
//                 />
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-sm font-medium bg-white peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white hover:bg-gray-50">
//                   {rating}
//                 </div>
//                 <span className="text-xs text-gray-500">
//                   {rating === 1
//                     ? "Poor"
//                     : rating === 2
//                     ? "Fair"
//                     : rating === 3
//                     ? "Good"
//                     : rating === 4
//                     ? "Very Good"
//                     : "Excellent"}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label htmlFor="message" className="block text-sm font-medium">
//             Your Feedback <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             required
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Please share your thoughts, suggestions, or concerns..."
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[8rem]"
//           ></textarea>
//         </div>

//         <div className="flex justify-between border-t pt-4">
//           <button
//             type="button"
//             onClick={() =>
//               setFormData({
//                 name: "",
//                 email: "",
//                 feedbackType: "",
//                 rating: "",
//                 message: "",
//               })
//             }
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//           >
//             Reset
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Feedback"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

"use client"

import React, { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Bug, Lightbulb, Send, Loader2 } from 'lucide-react';
import { ToastContainer } from "react-toastify"
import { showToast } from '../chatting_window/functions/ShowToast';

export default function FeedbackForm() {

    const [feedbackType, setFeedbackType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const [userRating, setuserRating] = useState(-1)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setisLoading(true)
            // Handle feedback submission here
            // console.log({ feedbackType, feedback, email });
            //   const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/feedback/save`, {
            //     feedbackType,
            //     feedback,
            //     email
            //   }, {
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Authorization: `Bearer ${localStorage.getItem('token')}`
            //     }
            //   })
            //   console.log(res.data)
            showToast(res?.data?.message || "Feedback send successfully.", 0)
        } catch (error) {
            console.log(error)
            showToast(error.response?.data?.message || error.message, 1)
        } finally {
            // Reset form
            setFeedbackType('');
            setFeedback('');
            setEmail('');
            setisLoading(false)
        }

    };

    const feedbackTypes = [
        { id: 'general', icon: MessageSquare, label: 'General Feedback' },
        { id: 'positive', icon: ThumbsUp, label: 'Positive Feedback' },
        { id: 'negative', icon: ThumbsDown, label: 'Negative Feedback' },
        { id: 'bug', icon: Bug, label: 'Report Bug' },
        { id: 'suggestion', icon: Lightbulb, label: 'Suggestion' },
    ];

    return (
        <>
            <ToastContainer />

            <div id='feedback' className=" text-gray-700 p-4 ">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {feedbackTypes.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFeedbackType(id)}
                                    className={`
                                            p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                                            ${feedbackType === id
                                            ? 'border-blue-700 '
                                            : 'border-gray-700   hover:bg-gray-800 hover:border-gray-600'}`}
                                >
                                    <Icon className={`w-6 h-6 ${feedbackType === id ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className="text-sm text-center">{label}</span>
                                </button>
                            ))}
                        </div>


                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email (optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors duration-200"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                                    Your Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors duration-200 resize-none"
                                    placeholder="Share your thoughts..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                        >
                            {!isLoading && <Send className="w-4 h-4" />}
                            {isLoading ? <Loader2 className='animate-spin' /> : "Submit Feedback"}
                        </button>
                    </form>

                    <div className="mt-8 text-sm text-gray-400 text-center">
                        Thank you for helping us improve our product
                    </div>
                </div>
            </div>
        </>
    );
}
