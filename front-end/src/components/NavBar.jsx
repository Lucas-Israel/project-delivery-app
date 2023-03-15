import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { IoPersonOutline } from 'react-icons/io5';
import context from '../context/myContext';

import logo from '../images/logo.png';

function NavBar() {
  const {
    setShoppingCart,
  } = useContext(context);
  const [name, setName] = useState('User Name');
  const [role, setRole] = useState('customer');
  const [activeHamb, setActiveHamburguer] = useState(false);

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
    localStorage.removeItem('carrinho');
    setShoppingCart([]);
  };

  const activeHamburguer = () => {
    setActiveHamburguer(!activeHamb);
  };

  const closeNavBarMobile = () => {
    setActiveHamburguer(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-item-logo">
        <img src={ logo } alt="logo" />
      </div>
      <div
        className="nav-list"
        style={ activeHamb ? {
          transform: 'translateX(0)',
        } : {} }
      >
        <button
          className={ activeHamb ? ('x open') : ('x') }
          type="button"
          onClick={ closeNavBarMobile }
        >
          close nav mobile
        </button>
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
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
          >
            <FiLogOut className="ico-logout" />
            {' '}
            Sair
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={ activeHamburguer }
        className={ activeHamb ? ('hamburguer active-hamburguer') : ('hamburguer') }
      >
        <div className={ activeHamb ? ('line-1 active-line-1') : ('line-1') } />
        <div className={ activeHamb ? ('line-2 active-line-2') : ('line-2') } />
        <div className={ activeHamb ? ('line-3 active-line-3') : ('line-3') } />
      </button>
    </nav>
  );
}

export default NavBar;
