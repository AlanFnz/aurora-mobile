import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '@theme/colors';

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
      <Icon
        name="search"
        size={20}
        color="#c4c4c4"
        style={{ marginLeft: 20, marginBottom: 2 }}
      />

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
  margin: 10px 26px 15px 23px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  height: 50px;
  font-size: 14px;
  color: ${colors.common.offWhite};
  background-color: ${colors.lowOpacity.transparent};
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 15px;
`;

export default SearchBox;
