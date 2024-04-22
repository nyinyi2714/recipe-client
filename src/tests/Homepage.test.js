import { render, fireEvent, waitFor, queryByTestId } from '@testing-library/react'
import Homepage from '../pages/Homepage/Homepage'

describe('Homepage component', () => {
  afterEach(() => {
    // Clean up any side effects after each test
    jest.clearAllMocks()
  })


  test('renders input field and search button', () => {
    const { getByPlaceholderText, getByText } = render(<Homepage />)
    const inputElement = getByPlaceholderText('Enter Recipe')
    const searchButton = getByText('Search')

    expect(inputElement).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('handles input change', () => {
    const { getByPlaceholderText } = render(<Homepage />)
    const inputElement = getByPlaceholderText('Enter Recipe')

    fireEvent.change(inputElement, { target: { value: 'chicken' } })

    expect(inputElement.value).toBe('chicken')
  })

  test('fetches and displays recipes on search', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<Homepage />)
    const inputElement = getByPlaceholderText('Enter Recipe')
    const searchButton = getByText('Search')

    fireEvent.change(inputElement, { target: { value: 'chicken' } })
    fireEvent.click(searchButton)

    expect(queryByTestId('spinner')).toBeInTheDocument()

    await waitFor(() => {
      expect(queryByTestId('spinner')).not.toBeInTheDocument()
    }, { timeout: 2000 })

    // You can then test if the fetched recipes are displayed
    expect(getByText('chicken pasta')).toBeInTheDocument()
  })
})
