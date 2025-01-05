import 'react-native'
import React from 'react'
import { act } from 'react-test-renderer'
import renderer from 'react-test-renderer'

import App from './App'

it('renders correctly', async () => {
  let tree

  await act(async () => {
    tree = renderer.create(<App />)
  })

  expect(tree).toBeTruthy()
})
