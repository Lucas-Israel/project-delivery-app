import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { allSale, saveUser } from './mocks/saleDetails.mock';

import { dataNPedido, dataBtnPrepara } from './mocks/VendorDetails.mock';

describe('VendorDetails page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify(saveUser))
  });

  it('Verifica', async () => {
      await act(async () => {
        httpClient.get = jest.fn().mockResolvedValue({ data: allSale });
        renderWithRouter(<App />, ['/seller/orders/1']);
      });

      const numeroPedido = screen.getByTestId(dataNPedido);
      const preparaPedido = screen.getByTestId(dataBtnPrepara);

      userEvent.click(preparaPedido)

      httpClient.patch = jest.fn().mockResolvedValue({ data: allSale });

      expect(numeroPedido).toBeInTheDocument();
      expect(preparaPedido).toBeInTheDocument();
    },
  );
});