"use client"
import { useEffect, useRef, useState } from "react";
import {
    Calendar,
    FileText,
    Layers,
    Bookmark,
    Search,
    Clock,
    Scale,
    LibraryBig,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import BackGround from "../Background/BackGround";

const LongExpandableContent = ({ content }) => {
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [needsExpansion, setNeedsExpansion] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current && content) {
            setNeedsExpansion(contentRef.current.scrollHeight > 500);
        }
    }, [content]);

    return (
        <>
            <div
                ref={contentRef}
                className={`prose prose-amber max-w-none text-gray-800 overflow-hidden transition-all duration-300 ${!isContentExpanded && needsExpansion ? 'max-h-[500px]' : 'max-h-[none]'
                    }`}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {needsExpansion && (
                <button
                    tabIndex={0}
                    aria-label="expand and close button"
                    onClick={() => setIsContentExpanded(!isContentExpanded)}
                    className="mt-4 cursor-pointer flex items-center text-sm text-amber-700 hover:text-amber-800"
                >
                    {isContentExpanded ? (
                        <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show More
                        </>
                    )}
                </button>
            )}
        </>
    )
}

export const DetailCaseCard = ({ data }) => {
    return (
        <>
            <BackGround />
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-[50px]">
                <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-amber-100">
                    {/* Document Header */}
                    <div className="bg-amber-800 text-amber-50 px-6 py-5">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <div className="text-2xl md:text-2xl flex items-center font-bold tracking-tight">
                                    <Scale className="mr-2 h-8 w-8 text-amber-50" />
                                    <h2 className="w-[95%] text-amber-50">{data.title}</h2>
                                </div>
                                <p className="text-amber-50 mt-1 text-sm">{data.docsource}</p>
                            </div>
                            <div className="mt-3 md:mt-0 text-right">
                                <div className="inline-flex items-center px-3 py-1 rounded bg-amber-700 text-white text-xs">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(data.publishdate).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                <p className="text-amber-100 text-xs mt-1">Document ID: {data.docid}</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Content */}
                    <div className="px-6 py-5">
                        <LongExpandableContent content={data.doc} />

                        {/* Metadata Section */}
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2 " />
                                Document Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                                            <LibraryBig className="h-4 w-4 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-amber-700">Document Type</p>
                                            <p className="text-sm ">{data.divtype || 'Legal Provision'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                                            <Bookmark className="h-4 w-4 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-amber-700">Citations</p>
                                            <p className="text-sm ">{data.numcites}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                                            <Layers className="h-4 w-4 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-amber-700">References</p>
                                            <p className="text-sm ">{data.numcitedby.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-amber-100 bg-amber-100/10 p-3 rounded">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100/50 p-2 rounded-full mr-3">
                                            <Layers className="h-4 w-4 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-amber-700">Coverage</p>
                                            <p className="text-sm ">
                                                {data.covers.map((cover, index) => (
                                                    <span key={index}>
                                                        {cover.title}{index < data.covers.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Queries */}
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium  mb-4 flex items-center">
                                <Search className="h-5 w-5 mr-2 " />
                                Related Search Queries
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.relatedqs.map((query, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100/20   border border-amber-100 hover:bg-amber-100/50 transition-colors"
                                    >
                                        {query.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#ab691d27] px-6 py-4 border-t border-gray-300">
                        <div className="flex flex-col md:flex-row items-center justify-between text-sm ">
                            <p>{data.docsource}</p>
                            <div className="mt-2 md:mt-0 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Last updated: {new Date().toLocaleDateString('en-IN')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};