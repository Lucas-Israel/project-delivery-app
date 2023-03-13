import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductsOrderDetails from './ProductOrderDetails';
import { setSaleStatus } from '../httpClient';

const statusTestID = [
  'customer_order_details__element-order-details-label-delivery-status'];
function SaleDetailsBox({ products, sale }) {
  const { id } = useParams();
  const [statusOrder, setSTatusOrder] = useState('Pendente');
  const getTotal = (saleProducts) => {
    const total = saleProducts.reduce(
      (
        accomulator,
        product,
      ) => accomulator + (Number(product.price) * Number(product.quantity)),
      0,
    );
    return total;
  };
  useEffect(() => {
    setSTatusOrder(sale.status);
  }, [sale]);

  const handleStatus = async ({ target }) => {
    const status = target.value;
    const { error } = await setSaleStatus(id, status);
    if (!error) {
      setSTatusOrder(target.value);
    }
  };

  return (
    <div className="sale-details-container">
      <div className="sale-title-list">
        <h1
          className="title-1"
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          PEDIDO
          {' '}
          {sale.id || 0}
        </h1>
        <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
          P. Vend: Fulana Pereira

        </h1>
        <h1
          className="title-3"
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {(((sale.saleDate) || 'T').split('T')[0]).replaceAll('-', '/')
            .split('/').reverse().join('/')}

        </h1>
        <h1
          className="title-4"
          data-testid={ `${statusTestID[0]}${sale.id}` }
        >
          { statusOrder }

        </h1>
        <button
          type="button"
          value="Entregue"
          onClick={ handleStatus }
          data-testid="customer_order_details__button-delivery-check"
          disabled={ (statusOrder !== 'Em Trânsito') }
          style={ (statusOrder !== 'Em Trânsito') ? { opacity: '0.1' } : {} }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ false }
        />
        <div className="total-check-container">
          <div
            className="total-checkout"
            data-testid="customer_order_details__element-order-total-price"
          >
            Total:
            {' '}
            R$
            {' '}
            {getTotal(products).toFixed(2).toString().replace('.', ',') || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

SaleDetailsBox.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  sale: PropTypes.shape({
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SaleDetailsBox;
