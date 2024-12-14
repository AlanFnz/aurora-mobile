import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ToastOptions = {
  isSuccess: boolean
  message: string
}

export const useToast = () => {
  const insets = useSafeAreaInsets()

  const showToast = ({ isSuccess, message }: ToastOptions) => {
    Toast.show({
      type: isSuccess ? 'success' : 'error',
      text1: message,
      position: 'bottom',
      bottomOffset: insets.bottom * 3,
      visibilityTime: 1750,
    })
  }

  return { showToast }
}
