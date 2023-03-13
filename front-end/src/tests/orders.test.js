import React from "react";
import renderWithRouter from '../renderWithRouter'
import App from '../App';
import { httpClient } from "../httpClient";
import { allSale, saveCustomer, dataPedido } from './mocks/orders.mock';
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe('Orders page', () => {
  beforeEach( () => {
    localStorage.setItem('user', JSON.stringify(saveCustomer))
  });

  it('Pri', async () => {
    await act(async () => {
      httpClient.get = jest.fn().mockResolvedValue({ data: allSale });
      renderWithRouter(<App />, ['/customer/orders']);
    })

    const titlePedido = screen.getByTestId(dataPedido);

    expect(titlePedido).toBeInTheDocument();
  })
})