import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';

import { saveCustomer } from './mocks/orders.mock';
import renderWithRouter from '../renderWithRouter';
// import { outputCustomer } from './mocks/login.mock';

const randomNumber = 243549;
const checkoutRemoveTestId = 'customer_checkout__element-order-table-remove-0';
const checkoutTotalTestId = 'customer_checkout__element-order-total-price';
const checkoutBTestId = 'customer_products__checkout-bottom-value';
const dataPlus1 = 'customer_products__button-card-add-item-1';
const inputAdressNumberTestId = 'customer_checkout__input-address-number';
const inputAdressDataTestId = 'customer_checkout__input-address';
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

const goToCheckout = async () => {
  await act(async () => {
    httpClient.get = jest.fn().mockResolvedValue({ data: products });
    renderWithRouter(<App />, ['/customer/products']);
  });

  const btnCartPlus = screen.getByTestId(dataPlus1);
  const checkoutBtn = screen.getByTestId(checkoutBTestId);

  userEvent.click(btnCartPlus);

  checkoutBtn.click();
};

describe('verify if checkout screen works as expected', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(saveCustomer));
    jest.clearAllMocks();
    await goToCheckout();
  });
  it('verify if remove button works as expected', async () => {
    const totalDiv = screen.getByTestId(checkoutTotalTestId);
    expect(totalDiv).toBeInTheDocument();
    expect(totalDiv).toHaveTextContent('10,00');

    const removeBtn = screen.getByTestId(checkoutRemoveTestId);
    removeBtn.click();
    expect(removeBtn).not.toBeInTheDocument();
  });
  it('verify if i can send a sale as expected', async () => {
    const inputAdressNumber = screen.getByTestId(inputAdressNumberTestId);
    const inputAdress = screen.getByTestId(inputAdressDataTestId);

    userEvent.type(inputAdress, 'aqui');
    userEvent.type(inputAdressNumber, randomNumber);
    const sendSaleBtn = screen.getByText('FINALIZAR PEDIDO');
    expect(sendSaleBtn).toBeInTheDocument();
    sendSaleBtn.click();
  });
});
