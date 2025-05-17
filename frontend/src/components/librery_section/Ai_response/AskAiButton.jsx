import { MessageSquareText } from 'lucide-react'
import React from 'react'

const AskAiButton = ({onClick}) => {
  return (
    <button
        onClick={onClick}
        className="inline-flex items-center px-4 py-2 font-medium rounded-md bg-blue-600 text-white md:hover:bg-blue-700 transition duration-200 shadow-sm"
      >
        <MessageSquareText className="w-4 h-4 mr-1" />
        Ask AI
      </button>
  )
}

export default AskAiButton