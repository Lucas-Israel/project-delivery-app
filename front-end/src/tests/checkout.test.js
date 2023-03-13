import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { carrinhoObj } from './mocks/product.mock';
import { saveCustomer } from './mocks/orders.mock';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const numberOfProducts = carrinhoObj.length;

describe('checkout page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.getItem = jest.fn((key) => {
      const item = (key === 'user') ? saveCustomer : carrinhoObj;
      return JSON.stringify(item);
    });
    localStorage.setItem = jest.fn();
  });
  it('verify if checkout screen works as expected', async () => {
    await act(async () => {
      renderWithRouter(<App />, ['/customer/checkout']);
    });
    const removesBtn = screen.getByText('Remover', { exact: true });
    expect(removesBtn.length).toBe(numberOfProducts);
  });
});
