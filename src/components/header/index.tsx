import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BackButtonIcon from 'react-native-vector-icons/FontAwesome'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import colors from '@theme/colors'

import {
  BackButton,
  HeaderContainer,
  HeaderTitle,
  TitleContainer,
} from './styles'

const Header: React.FC<{
  title?: string
  showBackButton?: boolean
  rightColumnContent?: any
}> = ({ title, rightColumnContent = true, showBackButton = true }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handleBackPress = () => {
    navigation.goBack()
  }

  return (
    <HeaderContainer insets={insets}>
      {showBackButton && (
        <BackButton onPress={handleBackPress} testID="back-button">
          <BackButtonIcon
            name="arrow-left"
            size={20}
            color={colors.common.offWhite}
          />
        </BackButton>
      )}
      <TitleContainer>
        {title && <HeaderTitle>{title}</HeaderTitle>}
      </TitleContainer>
      {rightColumnContent && rightColumnContent}
    </HeaderContainer>
  )
}

export default Header
