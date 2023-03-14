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

const userAdded = [
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
  },
  {
    id:50,
    name: 'abcdefghijkl',
    email: 'number@number.com',
    role: 'seller',
  }
];

const tokenReturn = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjQsIm5hbWUiOiJ0ZXN0aW5nIiwiZW1haWwiOiJ0ZXN0aW5nQHRlc3RpbmcuY29tIiwicGFzc3dvcmQiOiJhZTJiMWZjYTUxNTk0OWU1ZDU0ZmIyMmI4ZWQ5NTU3NSIsInJvbGUiOiJjdXN0b21lciJ9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiJ0ZXN0aW5nIiwiZW1haWwiOiJ0ZXN0aW5nQHRlc3RpbmcuY29tIiwicGFzc3dvcmQiOiJhZTJiMWZjYTUxNTk0OWU1ZDU0ZmIyMmI4ZWQ5NTU3NSIsInJvbGUiOiJjdXN0b21lciIsImlkIjo0fSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb3JkIjp0cnVlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIn0sImlzTmV3UmVjb3JkIjpmYWxzZX0sImlhdCI6MTY3ODczNTM0MywiZXhwIjoxNjc5MzQwMTQzfQ.Ja9VNAF57r8zeW5amXhHr8D6Ol0BePKw7a9FomYCxdk"
}

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

  it('02 - The admin can see all users', async () => {
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

  it('03 - The admin can create an user', async () => {
    httpClient.get = jest.fn().mockResolvedValueOnce({data: allUsers});

    renderWithRouter(<App />, ['/admin/manage']);

    const adminUserNameInput = await screen.findByTestId('admin_manage__input-name');
    const adminUserEmailInput = await screen.findByTestId('admin_manage__input-email');
    const adminUserPasswordInput = await screen.findByTestId('admin_manage__input-password');
    const adminUserSelectRole = await screen.findByTestId('admin_manage__select-role');
    const adminUsereCreateButton = await screen.findByTestId('admin_manage__button-register');

    userEvent.type(adminUserNameInput, userAdded[4].name);
    userEvent.type(adminUserEmailInput, userAdded[4].email);
    userEvent.type(adminUserPasswordInput, '123456');
    userEvent.selectOptions(adminUserSelectRole, userAdded[4].role);
    httpClient.post = jest.fn().mockResolvedValueOnce({ data: tokenReturn });
    httpClient.get = jest.fn().mockResolvedValueOnce({data: userAdded});
    userEvent.click(adminUsereCreateButton);

    const fifthElementUserTable = await screen.findByTestId('admin_manage__element-user-table-email-4');

    expect(fifthElementUserTable.innerHTML).toBe(userAdded[4].email);
  })

  it('04 - The admin can delete an user', async () => {
    httpClient.get = jest.fn().mockResolvedValueOnce({data: userAdded});

    renderWithRouter(<App />, ['/admin/manage']);

    const lastUserRemoveBtn = await screen.findByTestId('admin_manage__element-user-table-remove-4');
    
    const fifthElementUserTable = await screen.findByTestId('admin_manage__element-user-table-email-4');

    expect(fifthElementUserTable.innerHTML).toBe(userAdded[4].email);
    
    httpClient.delete = jest.fn().mockResolvedValueOnce();

    httpClient.get = jest.fn().mockResolvedValueOnce({data: allUsers});

    userEvent.click(lastUserRemoveBtn);

    const lastElement = await screen.findByTestId('admin_manage__element-user-table-email-3')

    expect(lastElement).toBeInTheDocument();

    expect(fifthElementUserTable).not.toBeInTheDocument();
  })

  it('05 - Testing an error when trying to add an existing user', async () => {
    httpClient.get = jest.fn().mockResolvedValueOnce({data: allUsers});
    
    renderWithRouter(<App />, ['/admin/manage']);

    const adminUserNameInput = await screen.findByTestId('admin_manage__input-name');
    const adminUserEmailInput = await screen.findByTestId('admin_manage__input-email');
    const adminUserPasswordInput = await screen.findByTestId('admin_manage__input-password');
    const adminUserSelectRole = await screen.findByTestId('admin_manage__select-role');
    const adminUsereCreateButton = await screen.findByTestId('admin_manage__button-register');

    userEvent.type(adminUserNameInput, userAdded[0].name);
    userEvent.type(adminUserEmailInput, userAdded[0].email);
    userEvent.type(adminUserPasswordInput, '123456');
    userEvent.selectOptions(adminUserSelectRole, userAdded[0].role);
    httpClient.post = jest.fn().mockRejectedValue({ data: {message:"User already registered"}});
    httpClient.get = jest.fn().mockResolvedValueOnce({data: allUsers});
    userEvent.click(adminUsereCreateButton);

    const errorElement = await screen.findByTestId('admin_manage__element-invalid-register');
  
    expect(errorElement).toBeEnabled();
  })
})