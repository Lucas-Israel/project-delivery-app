import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('NotFound page', () => {
  it('Verificar', async () => {
    renderWithRouter(<App />, ['/rotaerrada']);

    const notFountTitle = screen.getByText('Not Found');

    expect(notFountTitle).toBeInTheDocument();
  });
});
