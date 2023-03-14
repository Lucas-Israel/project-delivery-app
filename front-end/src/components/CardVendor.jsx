import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardVendor({ id, status, date, price, address }) {
  const leftZerosSlice = -4;
  const statusColor = {
    Pendente: '#E7B10A',
    Preparando: '#56ca59',
    Entregue: '#036B52',
  };

  return (
    <Link to={ `/seller/orders/${id}` } className="card-vendor">
      <div className="pedido">
        <p>Pedido</p>
        <p
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          { (`0000${id}`).slice(leftZerosSlice) }
        </p>
      </div>
      <div className="date-status-price-address">
        <div className="date-status-price">
          <div
            className="status"
            style={ {
              backgroundColor: statusColor[status],
            } }
          >
            <h2
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              { status }
            </h2>
          </div>
          <div className="date-price">
            <h3
              className="date"
              data-testid={ `seller_orders__element-order-date-${id}` }
            >
              { date }
            </h3>
            <h3
              className="price"
              data-testid={ `seller_orders__element-card-price-${id}` }
            >
              { price.toString().replace('.', ',') }
            </h3>
          </div>

        </div>
        <p className="address">{ `Endereço: ${address}` }</p>
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
