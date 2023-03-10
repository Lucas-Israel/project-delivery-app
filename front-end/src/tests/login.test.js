import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { httpClient } from '../httpClient';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import {
  outputAdministrator,
  outputSeller,
  outputCustomer,
  testUserEmail,
  tesUserPassword,
  returnAllSales,
  outputAllProducts,
} from './mocks/login.mock';

const testUserInputEmail = 'common_login__input-email';
const testUserInputPassword = 'common_login__input-password';
const tesButtonEnter = 'common_login__button-login';
const testButtonRegister = 'common_login__button-register';
const testUserInvalidEmail = 'common_login__element-invalid-email';

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    'Checks if the email, password and login button are rendered on the login screen',
    async () => {
      httpClient.post = jest.fn().mockRejectedValue({ data: { hasToken: false } });

      const { history } = renderWithRouter(<App />);

      const emailInput = screen.getByTestId(testUserInputEmail);
      const passwordInput = screen.getByTestId(testUserInputPassword);
      const loginButton = screen.getByTestId(tesButtonEnter);
      const registerButton = screen.getByTestId(testButtonRegister);

      userEvent.type(emailInput, 'teste@hotmail.com');
      userEvent.type(passwordInput, '123456789');

      userEvent.click(loginButton);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId(testUserInvalidEmail)).toBeInTheDocument();
      });

      expect(history.location.pathname).toBe('/login');
    },
  );

  it('Checks if the user can type in the email and password inputs', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(testUserInputEmail);
    const passwordInput = screen.getByTestId(testUserInputPassword);

    userEvent.type(emailInput, testUserEmail);
    userEvent.type(passwordInput, tesUserPassword);

    expect(emailInput).toHaveValue(testUserEmail);
    expect(passwordInput).toHaveValue(tesUserPassword);

    expect(history.location.pathname).toBe('/login');
  });

  it(`'User is able to click the sign in button after a valid email address
  and password of 6 or more characters'`, () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(testUserInputEmail);
    const passwordInput = screen.getByTestId(testUserInputPassword);
    const loginButton = screen.getByTestId(tesButtonEnter);

    userEvent.type(emailInput, 'incorrectEmail');
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, '12345');
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, testUserEmail);
    userEvent.type(passwordInput, tesUserPassword);
    expect(loginButton).toBeEnabled();
  });

  it('Checks if the user can click the register button', () => {
    const { history } = renderWithRouter(<App />);

    const registerButton = screen.getByTestId(testButtonRegister);

    userEvent.click(registerButton);

    expect(history.location.pathname).toBe('/register');
  });

  it(
    'Administrator is redirected to the page after clicking the enter button',
    async () => {
      httpClient.post = jest.fn().mockResolvedValue({ data: outputAdministrator });

      const { history } = renderWithRouter(<App />);

      const emailInput = screen.getByTestId(testUserInputEmail);
      const passwordInput = screen.getByTestId(testUserInputPassword);
      const loginButton = screen.getByTestId(tesButtonEnter);

      userEvent.type(emailInput, outputAdministrator.user.email);
      userEvent.type(passwordInput, '--adm2@21!!--');
      userEvent.click(loginButton);

      await waitFor(async () => {
        expect(history.location.pathname).toBe('/admin/manage');
      });
      localStorage.clear();
    },
  );

  it(
    'Seller is redirected to the page after clicking the enter button',
    async () => {
      httpClient.post = jest.fn().mockResolvedValueOnce({ data: outputSeller });

      const { history } = renderWithRouter(<App />);

      const emailInput = screen.getByTestId(testUserInputEmail);
      const passwordInput = screen.getByTestId(testUserInputPassword);
      const loginButton = screen.getByTestId(tesButtonEnter);

      userEvent.type(emailInput, outputSeller.user.email);
      userEvent.type(passwordInput, 'fulana@123');
      userEvent.click(loginButton);

      httpClient.get = jest.fn().mockResolvedValueOnce({ data: returnAllSales });

      await waitFor(async () => {
      expect(history.location.pathname).toBe('/seller/orders');
      });
      localStorage.clear();
    },
  );

  it('Customer is redirected to the page after clicking the enter button', async () => {
    httpClient.post = jest.fn().mockResolvedValue({ data: outputCustomer });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(testUserInputEmail);
    const passwordInput = screen.getByTestId(testUserInputPassword);
    const loginButton = screen.getByTestId(tesButtonEnter);

    userEvent.type(emailInput, outputCustomer.user.email);
    userEvent.type(passwordInput, '$#zebirita#$');
    userEvent.click(loginButton);

    httpClient.get = jest.fn().mockResolvedValueOnce({ data: outputAllProducts });

    await waitFor(async () => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
