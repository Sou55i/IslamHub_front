import React from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder || "Rechercher..."}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
    );
};

export default SearchBar;
