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

  const dataIds = {
    id: 'seller_order_details__element-order-details-label-order-id',
    date: 'seller_order_details__element-order-details-label-order-date',
    statusId: 'seller_order_details__element-order-details-label-delivery-status',
    prepara: 'seller_order_details__button-preparing-check',
    prodId: (i) => `seller_order_details__element-order-table-item-number-${i}`,
    prodName: (i) => `seller_order_details__element-order-table-name-${i}`,
    prodQuant: (i) => `seller_order_details__element-order-table-quantity-${i}`,
    prodUnitPrice: (i) => `seller_order_details__element-order-table-unit-price-${i}`,
    prodPrice: (i) => `seller_order_details__element-order-table-sub-total-${i}`,
  };

  return (
    <div className="vendor-details">
      <NavBar />
      <div className="details-container">
        <p>Detalhes do Pedido</p>
        <div className="details-order">
          <span
            data-testid={ dataIds[id] }
          >
            { `PEDIDO ${id}` }
          </span>
          <span
            data-testid={ dataIds.date }
          >
            {(((expectedSale.saleDate) || 'T').split('T')[0]).replaceAll('-', '/')
              .split('/').reverse().join('/')}
          </span>
          <span
            data-testid={ dataIds.statusId }
          >
            { expectedSale.status }
          </span>
          <button
            type="button"
            className="preparando"
            value="Preparando"
            data-testid={ dataIds.prepara }
            onClick={ handleStatus }
            disabled={ statusOrder !== 'Pendente' }
            style={
              statusOrder !== 'Pendente'
                ? { opacity: 0.1 } : {}
            }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            className="saiu"
            value="Em Trânsito"
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ handleStatus }
            style={
              statusOrder !== 'Preparando'
                ? { opacity: 0.1 } : {}
            }
            disabled={ statusOrder !== 'Preparando' }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
        {
          products.map((prod, index) => (
            <div
              className="list-item"
              key={ `prodSeller${prod.Product.id}` }
            >
              <div
                className="item-1"
                data-testid={ dataIds.prodId(prod.Product.id) }
              >
                { index + 1 }

              </div>
              <div
                className="item-2"
                data-testid={ dataIds.prodName(prod.Product.id) }
              >
                { prod.Product.name }

              </div>
              <div
                className="item-3"
                data-testid={ dataIds.prodQuant(prod.Product.id) }
              >
                { prod.quantity }

              </div>
              <div
                className="item-4"
                data-testid={ dataIds.prodUnitPrice(prod.Product.id) }
              >
                { prod.Product.price.replace('.', ',') }

              </div>
              <div
                className="item-5"
                data-testid={ dataIds.prodPrice(prod.Product.id) }
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
          className="total"
          data-testid="seller_order_details__element-order-total-price"
        >
          TOTAL R$
          {' '}
          { totalPrice.toFixed(2).toString().replace('.', ',') }

        </h1>
      </div>
    </div>
  );
}

export default VendorDetails;
