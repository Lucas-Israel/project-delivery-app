import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { act } from 'react-dom/test-utils';
import {
  allSale,
  saveUser,
  testNPedido
} from './mocks/saleDetails.mock';



describe('saleDetails page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify(saveUser));
  });
  
  it( 'Check if you are returning all specific sales.', async () => {
      httpClient.get = jest.fn().mockResolvedValue({ data: allSale });
      renderWithRouter(<App />, ['/customer/orders/1']);

      const numeroPedido = screen.getByTestId(testNPedido);

      expect(numeroPedido).toBeInTheDocument();
    },
  );
});