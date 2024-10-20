import colors from '@theme/colors';
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
        placeholderTextColor={colors.lowOpacity.whiteMid}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  background-color: ${colors.lowOpacity.whitePointOne};
  border-radius: 24px;
  margin-bottom: 20px;
  margin: 10px 26px 15px 24px;
`;

const SearchInput = styled.TextInput`
  height: 50px;
  color: ${colors.common.offWhite};
  background-color: ${colors.lowOpacity.transparent};
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 15px;
`;

export default SearchBox;
