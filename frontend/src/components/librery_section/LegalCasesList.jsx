"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import LegalCaseCard from './LegalCaseCard';
import { useDebounce } from '@/hooks/useDebounce';

const LegalCasesList = ({ cases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCases, setFilteredCases] = useState(cases);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filterCases = useCallback((term) => {
    if (term.trim() === '') {
      return cases;
    }

    const lowercaseSearch = term.toLowerCase();
    return cases.filter(
      (legalCase) =>
        legalCase.title.toLowerCase().includes(lowercaseSearch) ||
        legalCase.content.toLowerCase().includes(lowercaseSearch) ||
        legalCase.summary.toLowerCase().includes(lowercaseSearch)
    );
  }, [cases]);

  useEffect(() => {
    const filtered = filterCases(debouncedSearchTerm);
    setFilteredCases(filtered);
  }, [debouncedSearchTerm, filterCases]);

  return (
    <div className=' max-w-7xl mx-auto md:px-6 sm:px-4 px-2 pt-[100px] pb-5'>
      {/* <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for cases..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search cases"
          />
        </div>
      </div> */}

      {filteredCases.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No cases matching your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCases.map((legalCase) => (
            <LegalCaseCard key={legalCase.id} legalCase={legalCase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LegalCasesList;
