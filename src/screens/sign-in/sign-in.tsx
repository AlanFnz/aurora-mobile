import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import BackgroundLayers from '@components/background-layers'
import { performSignIn } from '@store/slices'
import { AppDispatch } from '@store/store'
import { useToast } from '@hooks/use-toast'
import { NoteDetailScreenNavigationProp } from '@navigation/types'

import {
  Container,
  ErrorMessage,
  FooterContainer,
  Input,
  SignInButton,
  SignInText,
  SignUpPromptLink,
  SignUpPromptText,
  Title,
} from './sign-in.styled'

export const SignIn: React.FC = () => {
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
        <Title>Sign In Screen</Title>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await dispatch(
                performSignIn({
                  username: values.username,
                  password: values.password,
                }),
              )
            } catch {
              showToast({
                isSuccess: false,
                message: 'Wrong user or password.',
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
                <SignInText>Sign In</SignInText>
              </SignInButton>
            </>
          )}
        </Formik>
        <FooterContainer>
          <SignUpPromptText>{`Don't have an account?`}</SignUpPromptText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <SignUpPromptLink>Sign Up</SignUpPromptLink>
          </TouchableOpacity>
        </FooterContainer>
      </Container>
    </>
  )
}
