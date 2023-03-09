import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { IoPersonOutline } from 'react-icons/io5';

import logo from '../images/logo.png';

function NavBar() {
  const [name, setName] = useState('User Name');
  const [role, setRole] = useState('customer');

  const dataIds = {
    customer: {
      id: 'customer_products__element-navbar-link-products',
      text: 'PRODUTOS',
      rota: '/customer/products',
    },
    seller: {
      id: 'customer_products__element-navbar-link-orders',
      text: 'PEDIDOS',
      rota: '/seller/orders',
    },
    administrator: {
      id: 'customer_products__element-navbar-link-orders',
      text: 'GERENCIAR USUÁRIOS',
      rota: '/admin/manage',
    },
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const stringUser = JSON.parse(user);
    setName(stringUser.name);
    setRole(stringUser.role);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav className="navbar">
      <div className="nav-item-logo">
        <img src={ logo } alt="logo" />
      </div>
      <div className="nav-item-1">
        <Link
          to={ dataIds[role].rota }
          data-testid={ dataIds[role].id }
        >
          { dataIds[role].text }
        </Link>

      </div>
      <div className="nav-item-2">
        {
          role === 'customer' ? (
            <Link
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS

            </Link>
          ) : null
        }
      </div>
      <div className="nav-item-3">
        <h2
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <IoPersonOutline className="icon-person" />
          { name }
        </h2>
      </div>
      <div className="nav-item-4">
        <Link
          onClick={ logout }
          to="/login/clean"
          data-testid="customer_products__element-navbar-link-logout"
        >
          <FiLogOut className="ico-logout" />
          {' '}
          Sair
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
