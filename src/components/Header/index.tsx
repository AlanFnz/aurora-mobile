import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton, HeaderContainer, HeaderTitle } from './styles';

const Header: React.FC<{ title?: string }> = ({ title }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <HeaderContainer insets={insets}>
      <BackButton onPress={handleBackPress} testID="back-button">
        <Icon name="arrow-left" size={20} color="#f6f6f6" />
      </BackButton>
      {title && <HeaderTitle>{title}</HeaderTitle>}
    </HeaderContainer>
  );
};

export default Header;
