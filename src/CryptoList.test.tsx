import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CryptoList from './CryptoList';
import fetchMock from 'jest-fetch-mock';

const mockApiResponse = {
  assets: [
    {
      symbol: 'BTC',
      display_symbol: 'BTC',
      name: 'Bitcoin',
      type: 'CRYPTO',
      subtype: null,
      decimals: 8,
      icon_url:
        'https://resources.cryptocompare.com/asset-management/1/1659708726266.png',
      status: 'ACTIVE',
    },
  ],
};

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('CryptoList', (): void => {
  it('renders the component', async (): Promise<void> => {
    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse), {status: 200});

    const {getByPlaceholderText} = render(<CryptoList />);

    await waitFor(() => {
      expect(getByPlaceholderText('Search by asset name')).toBeTruthy();
    });
  });

  it('displays a list of assets', async (): Promise<void> => {
    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse), {status: 200});

    const {getByText} = render(<CryptoList />);

    await waitFor(() => {
      expect(getByText('BTC')).toBeTruthy();
      expect(getByText('Bitcoin')).toBeTruthy();
    });
  });

  it('filters assets when searching', async (): Promise<void> => {
    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse), {status: 200});

    const {getByPlaceholderText, getByText} = render(<CryptoList />);
    const searchInput = getByPlaceholderText('Search by asset name');

    fireEvent.changeText(searchInput, 'Bitcoin');

    await waitFor(() => {
      expect(getByText('Bitcoin')).toBeTruthy();
    });
  });
});
