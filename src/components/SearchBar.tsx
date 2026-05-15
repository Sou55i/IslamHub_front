import React from "react";
import { Search, X, Loader } from "lucide-react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isSearching?: boolean;
    onClear?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, isSearching, onClear }) => {
    return (
        <div className="relative">
            <input
                type="text"
                aria-label={placeholder || "Rechercher"}
                placeholder={placeholder || "Rechercher..."}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            {isSearching ? (
                <Loader className="absolute right-3 top-2.5 h-5 w-5 text-emerald-500 animate-spin" />
            ) : value && onClear ? (
                <button
                    type="button"
                    onClick={onClear}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            ) : null}
        </div>
    );
};

export default SearchBar;
