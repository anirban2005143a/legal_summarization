import { FileText, BookOpen, Calendar, ExternalLink, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const LegalCaseCard = () => {
  const document = {
    tid: 'DOC-2023-0042',
    publishdate: '2023-11-15T09:30:00Z',
    title: 'Annual Financial Report 2023',
    headline: 'The company achieved record revenue of $4.2 billion in FY2023, representing a 12% year-over-year growth. Key initiatives included expansion into three new markets and successful launch of our premium product line.',
    docsource: 'Corporate Communications',
    covers: [
      { title: 'Financial Statements' },
      { title: 'Executive Summary' }
    ]
  };

  const formatDate = useCallback(
    (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    [],
  )

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Tag size={16} className="text-amber-800" />
            <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-100">
              {document.tid}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar size={14} className="mr-1.5" />
            {formatDate(document.publishdate)}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 ">
          {document.title}
        </h2>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="text-sm text-gray-600 mb-4 leading-relaxed">
          <div
            className="line-clamp-3"
          >{document.headline}</div>
        </div>

        {/* Metadata Section */}
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
            <FileText size={15} className="mr-2.5 text-amber-800" />
            <span className="text-sm font-medium">{document.docsource}</span>
          </div>

          {document.covers && document.covers.length > 0 && (
            <div className="flex md:items-center items-start space-x-2.5">
              <BookOpen size={15} className="mt-0.5 text-amber-800 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {document.covers.map((cover, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200 hover:border-gray-200 transition-colors"
                  >
                    {cover.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="w-full flex items-center justify-start text-sm font-semibold text-amber-900   py-2 rounded-lg  transition-all duration-200 group/button">
            <Link
              href={"#"}
              tabIndex={0}
              className="flex items-start hover:underline underline-offset-4 cursor-pointer">
              <ExternalLink size={16} className="mr-2" />
              View complete document
            </Link>
            {/* <ChevronRight size={16} className="text-amber-400 group-hover/button:translate-x-1 transition-transform duration-200" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCaseCard;
