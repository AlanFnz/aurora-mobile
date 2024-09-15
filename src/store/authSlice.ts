import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
      state.isLoading = false;
    },
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignout = false;
      state.userToken = action.payload;
    },
    signOut: state => {
      state.isSignout = true;
      state.userToken = null;
    },
  },
});

export const { restoreToken, signIn, signOut } = authSlice.actions;

export const bootstrapAsync = () => async (dispatch: any) => {
  let userToken = null;
  try {
    userToken = await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.error(e);
  }
  dispatch(restoreToken(userToken));
};

export const performSignIn =
  (username: string, password: string) => async (dispatch: any) => {
    if (username === 'user' && password === 'password') {
      const userToken = 'dummy-auth-token';
      await AsyncStorage.setItem('userToken', userToken);
      dispatch(signIn(userToken));
    }
  };

export const performSignOut = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('userToken');
  dispatch(signOut());
};

export default authSlice.reducer;
