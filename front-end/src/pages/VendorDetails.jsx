import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getMineSales, setSaleStatus } from '../httpClient';

function VendorDetails() {
  const { id } = useParams();
  const [expectedSale, setExpectedSale] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [statusOrder, setSTatusOrder] = useState('Pendente');

  useEffect(() => {
    const getProducts = async () => {
      const { sales } = await getMineSales();
      const resultSale = sales.filter((sale) => sale.id === Number(id))[0];
      setExpectedSale(resultSale);
      setProducts(resultSale.SalesProducts);
      console.log(resultSale);
    };
    getProducts();
  }, [id, statusOrder]);

  useEffect(() => {
    const total = products.reduce((acm, cur) => (
      acm + (Number(cur.Product.price) * Number(cur.quantity))
    ), 0);
    setTotalPrice(total);
  }, [products]);

  const handleStatus = async ({ target }) => {
    const status = target.value;
    const { error } = await setSaleStatus(id, status);
    if (!error) setSTatusOrder(target.value);
  };

  return (
    <div>
      <NavBar />
      <p>Detalhes do Pedido</p>
      <div>
        <span
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `PEDIDO ${id}` }
        </span>
        <span
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {(((expectedSale.saleDate) || 'T').split('T')[0]).replaceAll('-', '/')
            .split('/').reverse().join('/')}
        </span>
        <span
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { expectedSale.status }
        </span>
        <button
          type="button"
          value="Preparando"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ handleStatus }
          disabled={ statusOrder !== 'Preparando' || statusOrder !== 'Em Trânsito' }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          value="Em Trânsito"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ handleStatus }
          disabled={ statusOrder !== 'Pendente' || statusOrder !== 'Em Trânsito' }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      {
        products.map((prod) => (
          <div
            key={ `prodSeller${prod.Product.id}` }
          >
            <div
              data-testid="seller_order_details__element-order-table-item-number-<index>"
            >
              { prod.Product.id }

            </div>
            <div
              data-testid="seller_order_details__element-order-table-name-<index>"
            >
              { prod.Product.name }

            </div>
            <div
              data-testid="seller_order_details__element-order-table-quantity-<index>"
            >
              { prod.quantity }

            </div>
            <div
              data-testid="seller_order_details__element-order-table-unit-price-<index>"
            >
              { prod.Product.price.replace('.', ',') }

            </div>
            <div
              data-testid="seller_order_details__element-order-table-sub-total-<index>"
            >
              {
                (Number(prod.Product.price) * Number(prod.quantity)).toFixed(2)
                  .toString().replace('.', ',')
              }
            </div>
          </div>
        ))
      }
      <h1
        data-testid="seller_order_details__element-order-total-price"
      >
        TOTAL R$
        {' '}
        { totalPrice.toFixed(2).toString().replace('.', ',') }

      </h1>
    </div>
  );
}

export default VendorDetails;
