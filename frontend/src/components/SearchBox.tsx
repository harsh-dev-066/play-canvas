import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import { StyledSearchBox } from '../styles/SearchBox.styled';

interface SearchBoxProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = 'Search', onChange, onSearch }) => {
  const [search, setSearch] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (onChange) onChange(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (onSearch) onSearch(search);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(search);
  };

  const handleSearchClear = () => {
    setSearch('');
    if (onSearch) onSearch('');
  };

  return (
    <StyledSearchBox>
      <div className="search-box">
        <button onClick={handleSearchClick}>
          <CiSearch />
        </button>
        <input
          type="search"
          name="focus"
          placeholder={placeholder}
          id="search-input"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {search?.length > 0 && (
          <button onClick={handleSearchClear}>
            <MdClear />
          </button>
        )}
      </div>
    </StyledSearchBox>
  );
};

export default SearchBox;
