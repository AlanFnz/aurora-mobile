import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '@theme/colors'

interface SearchBoxProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const hasInput = searchQuery.length > 0
  return (
    <SearchContainer hasInput={hasInput}>
      {!hasInput && (
        <Icon
          name="search"
          size={20}
          color="#c4c4c4"
          style={{ marginLeft: 20, marginBottom: 2 }}
        />
      )}

      <SearchInput
        testID="search-input"
        placeholder="Search"
        placeholderTextColor={colors.lowOpacity.whiteMid}
        value={searchQuery}
        onChangeText={setSearchQuery}
        hasInput={hasInput}
      />

      {hasInput && (
        <ClearButton onPress={() => setSearchQuery('')}>
          <Icon name="times-circle" size={18} color="#c4c4c4" />
        </ClearButton>
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled.View<{ hasInput: boolean }>`
  background-color: ${colors.lowOpacity.whitePointOne};
  border-radius: 23px;
  margin: 10px 22px 15px 20px;
  flex-direction: row;
  align-items: center;
  ${({ hasInput }) => hasInput && 'justify-content: space-between;'}
`

const SearchInput = styled.TextInput<{ hasInput: boolean }>`
  height: 44px;
  font-size: 14px;
  color: ${colors.common.offWhite};
  background-color: ${colors.lowOpacity.transparent};
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 15px 15px 15px ${({ hasInput }) => (hasInput ? '25' : '15')}px;
`

const ClearButton = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 10px;
`

export default SearchBox
