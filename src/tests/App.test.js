import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders search bar', () => {
    const { getByLabelText } = render(<App />);
    const searchInput = getByLabelText('Search game');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders API key input', () => {
    const { getByLabelText } = render(<App />);
    const apiKeyInput = getByLabelText('Api Key');
    expect(apiKeyInput).toBeInTheDocument();
  });

  it('renders save API key button', () => {
    const { getByRole } = render(<App />);
    const saveButton = getByRole('button', { name: 'Save API Key' });
    expect(saveButton).toBeInTheDocument();
  });

  it('disables search bar when no API key is provided', () => {
    const { getByLabelText } = render(<App />);
    const searchInput = getByLabelText('Search game');
    expect(searchInput).toBeDisabled();
  });

  it('enables search bar when API key is provided', async () => {
    const { getByLabelText, getByRole } = render(<App />);
    const apiKeyInput = getByLabelText('Api Key');
    const saveButton = getByRole('button', { name: 'Save API Key' });

    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const searchInput = getByLabelText('Search game');
      expect(searchInput).toBeEnabled();
    });
  });

  it('calls fetchGames when search query changes', () => {
    const fetchGamesMock = jest.fn();
    const { getByLabelText } = render(<App fetchGames={fetchGamesMock} />);
    const searchInput = getByLabelText('Search');

    fireEvent.change(searchInput, { target: { value: 'test-query' } });

    expect(fetchGamesMock).toHaveBeenCalledWith('test-query', 1);
  });

  it('calls fetchGames when page number changes', () => {
    const fetchGamesMock = jest.fn();
    const { getByPlaceholderText } = render(<App fetchGames={fetchGamesMock} />);
    const pageInput = getByPlaceholderText('Page');

    fireEvent.change(pageInput, { target: { value: '2' } });

    expect(fetchGamesMock).toHaveBeenCalledWith('', 2);
  });
});
