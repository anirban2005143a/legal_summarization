"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Download, MessageSquareText } from 'lucide-react';
import { downloadAsTextFile } from '@/utils/fileUtils';
import { useRouter } from 'next/navigation';

const LegalCaseCard = ({ legalCase , isExpand , onToggle,id }) => {
  const [isExpanded, setIsExpanded] = useState(isExpand);
  const [showSummary, setShowSummary] = useState(false);

  const router = useRouter()

  // Function to truncate content for preview
  const truncateContent = (content, maxLength = 300) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Handle downloading content
  const handleDownload = () => {
    const fileName = `${legalCase["heading"].replace(/\s+/g, '_')}.txt`;
    const contentToDownload = `
        ${legalCase["heading"]}
        ${'-'.repeat(legalCase["heading"].length)}

        FULL CONTENT:
        ${legalCase["main_content"]}

        SUMMARY:
        ${legalCase["summary"]}
        `;
    downloadAsTextFile(fileName, contentToDownload);
  };

  // Handle ask AI button click
  const handleAskAI = () => {
    alert('AI Assistant feature will be integrated in the next version.');
  };

  return (
    <section id={`${id}`} className=" bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 md:hover:shadow-xl border border-gray-200 mb-6">
      <div className="md:p-6 p-3">
        <h2 className="md:text-2xl text-lg font-bold text-gray-900 mb-4">{legalCase["heading"]}</h2>

        <div className="prose max-w-none text-gray-700 text-sm">
          {isExpanded ? (
            <p className="whitespace-pre-line animate-fadeIn">{legalCase["main_content"]}</p>
          ) : (
            <p className=' whitespace-pre-line'>{truncateContent(legalCase["main_content"])}</p>
          )}
        </div>

        {showSummary && (
          <div className="mt-4 bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 animate-slideDown">
            <h3 className="md:text-lg text-base font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700 text-sm">{legalCase["summary"]}</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <div className="flex flex-wrap gap-3 justify-between items-center md:text-sm text-xs">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                onToggle()
                if (isExpanded) router.push(`/cases/#${id}`)
                setIsExpanded(!isExpanded)
              }}
              className="inline-flex items-center px-4 py-2  font-medium rounded-md bg-indigo-50 text-indigo-700 md:hover:bg-indigo-100 transition duration-200"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                // if(showSummary) router.push(`cases/#${legalCase["id"]}`)
                setShowSummary(!showSummary)
              }}
              className="inline-flex items-center px-4 py-2  font-medium rounded-md bg-amber-50 text-amber-700 md:hover:bg-amber-100 transition duration-200"
            >
              <FileText className="w-4 h-4 mr-1" />
              {showSummary ? 'Hide Summary' : 'Show Summary'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAskAI}
              className="inline-flex items-center px-4 py-2 font-medium rounded-md bg-purple-50 text-purple-700 md:hover:bg-purple-100 transition duration-200"
            >
              <MessageSquareText className="w-4 h-4 mr-1" />
              Ask AI
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2  font-medium rounded-md bg-green-50 text-green-700 md:hover:bg-green-100 transition duration-200"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalCaseCard;
