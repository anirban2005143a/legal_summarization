import { BookOpen, Calendar, ExternalLink, Tag, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const LegalCaseCard = ({ document }) => {
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
              Doc ID: {document.tid}
            </span>
          </div>
          <div className="flex items-start text-gray-500 text-xs">
            <Calendar size={14} className="mr-1.5" />
            {formatDate(document.publishdate)}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 ">
          {document.title}
        </h2>
        <span className=' text-xs italic text-gray-700'>{document.author} {document.author ? "|" : ""} {document.docsource} </span>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="text-sm text-gray-600 mb-4 leading-relaxed">
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: document.headline }}
          />
        </div>

        {/* Metadata Section */}
        <div className="space-y-3 pt-3 border-t border-gray-200">
          {document.covers && document.covers.length > 0 && (
            <div className="flex md:items-center items-start space-x-2.5">
              <BookOpen size={15} className="mt-0.5 text-amber-800 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {document.covers.map((cover, index) => (
                  <div key={index} className="group/cover flex items-center">
                    <div className="relative">
                      <Link
                        tabIndex={0}
                        href={`/cover/${cover.tid}`}
                        target="_blank"
                        className="flex items-center gap-1.5 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 group/link"
                      >
                        <span className="font-medium text-gray-800 group-hover/link:text-gray-900">{cover.title}</span>
                        <span className="text-xs text-gray-500 font-mono">#{cover.tid}</span>
                        <ArrowUpRight
                          size={12}
                          className="text-amber-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                        />
                      </Link>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center justify-start text-sm font-semibold text-amber-900 py-2 rounded-lg transition-all duration-200 group/button">
              <Link
                href={`/case/${document.tid}`}
                tabIndex={0}
                className="flex items-start hover:underline underline-offset-4 cursor-pointer">
                <ExternalLink size={16} className="mr-2" />
                View complete document
              </Link>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCaseCard;