import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { renderWithProviders } from '@root/src/test-utils'
import { Home } from './home'

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}))

describe('Home', () => {
  beforeEach(() => {
    ;(useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the background layers', () => {
    const { getByTestId } = renderWithProviders(<Home />)
    expect(getByTestId('background-layers')).toBeTruthy()
  })

  it('renders the container with correct insets', () => {
    const { getByTestId } = renderWithProviders(<Home />)
    const container = getByTestId('container')
    expect(container.props.style.paddingTop).toBe(20)
    expect(container.props.style.paddingLeft).toBe(0)
    expect(container.props.style.paddingRight).toBe(-2)
  })

  it('renders the folder list', async () => {
    const { getByTestId } = renderWithProviders(<Home />)
    await waitFor(() => expect(getByTestId('folder-list')).toBeTruthy())
  })

  it('renders the notes results list when there is a search query', async () => {
    const { getByTestId } = renderWithProviders(<Home />)

    const searchInput = getByTestId('search-input')
    fireEvent.changeText(searchInput, 'Sample Note')

    await waitFor(() => expect(getByTestId('notes-results')).toBeTruthy())
  })
})
