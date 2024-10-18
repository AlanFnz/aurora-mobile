import colors from '@theme/colors';
import React from 'react';
import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.feedback.positive,
        backgroundColor: colors.lowOpacity.feedback.positive,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.common.offWhite,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.feedback.negative,
        backgroundColor: colors.lowOpacity.feedback.negative,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.common.offWhite,
      }}
    />
  ),
};

export default toastConfig;
