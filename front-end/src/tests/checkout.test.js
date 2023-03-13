import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const checkoutRemoveTestId = 'customer_checkout__element-order-table-remove-0';
const checkoutTotalTestId = 'customer_checkout__element-order-total-price';
const checkoutBTestId = 'customer_products__checkout-bottom-value';
const dataPlus1 = 'customer_products__button-card-add-item-1';
const dataTotal = 'customer_products__checkout-bottom-value';
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '10.0',
    urlImage: 'https://example.com/product1.png',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '20.0',
    urlImage: 'https://example.com/product2.png',
  },
];

describe('checkout page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  it('verify if checkout screen works as expected', async () => {
    await act(async () => {
      httpClient.get = jest.fn().mockResolvedValue({ data: products });
      renderWithRouter(<App />, ['/customer/products']);
    });

    const btnCartPlus = screen.getByTestId(dataPlus1);
    const total = screen.getByTestId(dataTotal);
    const checkoutBtn = screen.getByTestId(checkoutBTestId);

    userEvent.click(btnCartPlus);

    expect(btnCartPlus).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('10,00');

    checkoutBtn.click();

    const totalDiv = screen.getByTestId(checkoutTotalTestId);
    expect(totalDiv).toBeInTheDocument();
    expect(totalDiv).toHaveTextContent('10,00');

    const removeBtn = screen.getByTestId(checkoutRemoveTestId);
    removeBtn.click();
    expect(removeBtn).not.toBeInTheDocument();
  });
});
