import { Formik } from 'formik'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { NoteDetailScreenNavigationProp } from '@navigation/types'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { BackgroundLayers } from '@components/background-layers'
import { performSignUp } from '@store/slices'
import { AppDispatch } from '@store/store'

import { useToast } from '@hooks/use-toast'
import {
  Container,
  Input,
  Title,
  ErrorMessage,
  SignInButton,
  SignInText,
  FooterContainer,
  SignInPromptText,
  SignInPromptLink,
} from './sign-up.styled'

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<NoteDetailScreenNavigationProp>()
  const { showToast } = useToast()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  return (
    <>
      <BackgroundLayers />
      <Container>
        <Title>Sign Up Screen</Title>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await dispatch(
                performSignUp({
                  username: values.username,
                  password: values.password,
                }),
              )
            } catch {
              showToast({
                isSuccess: false,
                message: 'Sign up failed. Please try again.',
                visibilityTime: 3000,
              })
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Input
                placeholder="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
              />
              {touched.username && errors.username && (
                <ErrorMessage>{errors.username}</ErrorMessage>
              )}

              <Input
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}

              <SignInButton onPress={() => handleSubmit()}>
                <SignInText>Sign Up</SignInText>
              </SignInButton>
            </>
          )}
        </Formik>
        <FooterContainer>
          <SignInPromptText>{`Already have an account?`}</SignInPromptText>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <SignInPromptLink>Sign In</SignInPromptLink>
          </TouchableOpacity>
        </FooterContainer>
      </Container>
    </>
  )
}
