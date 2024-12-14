import styled from 'styled-components/native'

import colors from '@theme/colors'

const MainContainer = styled.View`
  width: 95%;
  margin-left: 2.5%;
  border-radius: 12px;
  margin-bottom: 18px;
  overflow: hidden;
`

const FolderContainer = styled.View`
  padding: 10px;
  background-color: ${colors.lowOpacity.blackSuperLow};
  box-shadow: 0px 2px 5px ${colors.lowOpacity.blackSuperLow};
`

const FolderHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 12px;
`

const FolderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.common.offWhite};
  padding-left: 0px;
`

export { MainContainer, FolderContainer, FolderHeader, FolderTitle }
