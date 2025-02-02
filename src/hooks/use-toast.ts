import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ToastOptions = {
  isSuccess: boolean
  message: string
  additionalOffset?: number
  visibilityTime?: number
}

export const useToast = () => {
  const insets = useSafeAreaInsets()

  const showToast = ({
    isSuccess,
    message,
    additionalOffset = 0,
    visibilityTime = 1750,
  }: ToastOptions) => {
    Toast.show({
      type: isSuccess ? 'success' : 'error',
      text1: message,
      position: 'bottom',
      bottomOffset: insets.bottom * 3 + additionalOffset,
      visibilityTime,
    })
  }

  return { showToast }
}
