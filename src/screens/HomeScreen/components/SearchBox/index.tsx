import React from 'react';
import styled from 'styled-components/native';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <SearchContainer>
      <SearchInput
        placeholder="Search"
        placeholderTextColor="#c4c4c4"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  color: #f6f6f6;
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 10px;
`;

export default SearchBox;
