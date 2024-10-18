import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import colors from '@theme/colors';
import { TouchableOpacity } from 'react-native';

const SaveButton: React.FC<{ handleSave: any }> = ({ handleSave }) => {
  return (
    <ButtonContainer onPress={handleSave} testID="back-button">
      <Icon name="save-sharp" size={20} color={colors.common.offWhite} />
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)``;

export default SaveButton;
