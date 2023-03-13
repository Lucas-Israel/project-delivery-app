import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { 
  dataMessageError,
  dataInputName,
  dataInputEmail,
  dataInputPwd,
  dataFullName,
  name,
  email,
  password,
  token,
} from './mocks/register.mock'

describe('Register page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Check that all elements are created.', () => {
    renderWithRouter(<App />, ['/register']);

    const titleRegister = screen.getByText(/register/i);
    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    expect(titleRegister).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPwd).toBeInTheDocument();
    expect(btnCadastrar).toBeInTheDocument();
  });

  it('Check if I can register successfully.', async () => {
    httpClient.post = jest.fn().mockResolvedValueOnce({ data: token });
    
    const { history } = renderWithRouter(<App />, ['/register']);

    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    userEvent.type(inputPwd, password);

    userEvent.click(btnCadastrar);

    await waitFor(() => {
      const titleName = screen.getByTestId(dataFullName);
      expect(titleName).toBeInTheDocument();
      expect(history.location.pathname).toBe('/customer/products');
    });

  });

  it('Checks if it returns an error when registering with existing email', async () => {
    httpClient.post = jest.fn().mockRejectedValue({
      response: {
        data: { message: 'User already registered' },
      },
    });

    renderWithRouter(<App />, ['/register']);

    const inputName = screen.getByTestId(dataInputName);
    const inputEmail = screen.getByTestId(dataInputEmail);
    const inputPwd = screen.getByTestId(dataInputPwd);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, 'Cliente Zé Birita');
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPwd, '$#zebirita#$');

    userEvent.click(btnCadastrar);

    await waitFor(() => {
      const messageError = screen.getByTestId(dataMessageError);
      expect(messageError).toBeInTheDocument();
    });
  });
});
