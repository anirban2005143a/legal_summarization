
"use client"

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Bug, Lightbulb, Send, Loader2 } from 'lucide-react';
import { ToastContainer } from "react-toastify"
import { showToast } from '../../utils/ShowToast';

export const FeedbackForm = ()=> {
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
                                            ? 'border-amber-600 bg-amber-50 text-amber-600'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-amber-200 hover:bg-amber-50'}
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
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-amber-600  outline-none transition-colors"
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
                                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-amber-600  outline-none transition-colors resize-none"
                                placeholder="Please share your detailed feedback..."
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading || !feedback}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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