// src/components/ui/SearchInput.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
    </div>
  );
};

export default SearchInput;