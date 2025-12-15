import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface SearchbarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Searchbar = ({ onSearch, placeholder = "Search..." }: SearchbarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      border: '1px solid #d1d5db',
      borderRadius: '25px',
      padding: '8px 12px',
      backgroundColor: 'white'
    }}>
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        style={{ 
          flex: 1, 
          border: 'none', 
          outline: 'none', 
          fontSize: '14px',
          backgroundColor: 'transparent',
          color: '#374151'
        }}
      />

      <button 
        onClick={handleSearch}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <svg 
          style={{ width: '20px', height: '20px', color: '#6b7280' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </div>
  );
};

export default Searchbar;