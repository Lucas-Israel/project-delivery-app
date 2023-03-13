import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CardVendor from '../components/CardVendor';
import { httpClient, getMineSales } from '../httpClient';

httpClient.defaults.timeout = 500;

function Vendor() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const { sales } = await getMineSales();
      setOrders(sales);
    };
    getSales();
  }, []);

  return (
    <div className="vendor">
      <NavBar />
      {
        orders.map((order, index) => (
          <CardVendor
            key={ `order${order.id}` }
            id={ order.id }
            status={ order.status }
            date={ (order.saleDate.split('T')[0]).replaceAll('-', '/')
              .split('/').reverse().join('/') }
            price={ order.totalPrice }
            address={ `${order.deliveryAddress}, ${order.deliveryNumber}` }
            index={ index }
          />
        ))
      }
    </div>
  );
}

export default Vendor;
