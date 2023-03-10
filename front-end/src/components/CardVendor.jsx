import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardVendor({ id, status, date, price, address }) {
  return (
    <Link to={ `/seller/orders/${id}` }>
      <div>
        <p>Pedido</p>
        <p
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          { id }
        </p>
      </div>
      <div>
        <div>
          <div>
            <h2
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              { status }
            </h2>
          </div>
          <div>
            <h3
              data-testid={ `seller_orders__element-order-date-${id}` }
            >
              { date }
            </h3>
            <h3
              data-testid={ `seller_orders__element-card-price-${id}` }
            >
              { price.toString().replace('.', ',') }
            </h3>
          </div>
        </div>
        <p>{ address }</p>
      </div>
    </Link>
  );
}

CardVendor.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default CardVendor;
