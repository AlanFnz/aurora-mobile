import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import BackgroundLayers from '@components/background-layers'
import { performSignIn } from '@store/slices/auth.slice'
import { AppDispatch } from '@store/store'

import {
  Container,
  ErrorMessage,
  Input,
  SignInButton,
  SignInText,
  Title,
} from './sign-in.styled'
import { useToast } from '@hooks/use-toast'

export const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showToast } = useToast()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  return (
    <>
      <BackgroundLayers />
      <Container>
        <Title>Login Screen</Title>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await dispatch(performSignIn(values.username, values.password))
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
      </Container>
    </>
  )
}
