import renderWithRouter from '../renderWithRouter';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { outputAdministrator } from './mocks/login.mock';

const testUserInputEmail = 'common_login__input-email';
const testUserInputPassword = 'common_login__input-password';
const tesButtonEnter = 'common_login__button-login';

const allUsers = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.coma',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.coma',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.coma',
    role: 'customer',
  },
  {
    id: 9999,
    name: 'AAAAAAAAAAAAA',
    email: 'BBB@CCC.DDD',
    role: 'customer',
  }
];

describe('Admin tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('01 - It is possible to login as an admin', async () => {
    httpClient.post = jest.fn().mockResolvedValue({data: outputAdministrator});

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(testUserInputEmail);
    const passwordInput = screen.getByTestId(testUserInputPassword);
    const loginButton = screen.getByTestId(tesButtonEnter);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    const adminElement = await screen.findByTestId('admin_manage__input-name');
    expect(adminElement).toBeInTheDocument();
  })

  it('02 - The admin can see all Users', async () => {
    httpClient.get = jest.fn().mockResolvedValue({data: allUsers});

    renderWithRouter(<App />, ['/admin/manage'])
    
    const user1 = await screen.findByTestId('admin_manage__element-user-table-email-0');
    const user2 = await screen.findByTestId('admin_manage__element-user-table-email-1');
    const user3 = await screen.findByTestId('admin_manage__element-user-table-email-2');
    const user4 = await screen.findByTestId('admin_manage__element-user-table-email-3');
    
    expect(user1.innerHTML).toBe('adm@deliveryapp.coma');
    expect(user2.innerHTML).toBe('fulana@deliveryapp.coma');
    expect(user3.innerHTML).toBe('zebirita@email.coma');
    expect(user4.innerHTML).toBe('BBB@CCC.DDD');
  })

  it('03 - The admin can create an User', async () => {
    httpClient.get = jest.fn().mockResolvedValue({data: allUsers});

    renderWithRouter(<App />, ['/admin/manage']);

    const adminUserNameInput = await screen.findByTestId('admin_manage__input-name');
    expect(adminUserNameInput).toBeInTheDocument();
  })
})