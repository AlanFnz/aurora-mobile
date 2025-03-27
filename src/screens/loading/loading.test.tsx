import React from 'react'
import { render } from '@testing-library/react-native'
import { Loading } from './loading'

describe('<Loading />', () => {
  it('renders ActivityIndicator', () => {
    const { getByTestId } = render(<Loading />)
    const spinner = getByTestId('activity-indicator')

    expect(spinner).toBeTruthy()
  })
})
