import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import SaleDetailsBox from '../components/SaleDetailsBox';
import { getMineSales } from '../httpClient';
import bg from '../images/background.png';

function SaleDetails() {
  const [products, setProducts] = useState([]);
  const [expectedSale, setExpectedSale] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getProducts = async () => {
      const { sales } = await getMineSales();
      const correctSale = sales.filter((sale) => sale.id === Number(id))[0];
      setExpectedSale(correctSale);
      const r = correctSale.SalesProducts.map((product) => (
        {
          ...product.Product,
          quantity: product.quantity,
          title: product.Product.name,
        }
      ));
      setProducts(r);
    };
    getProducts();
  }, [id]);

  return (
    <div
      className="sale-details"
      style={ {
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      } }
    >
      <h1>Detalhe do pedido</h1>
      <NavBar />
      <SaleDetailsBox
        products={ products }
        sale={ ({ ...expectedSale, SalesProducts: undefined }) }
      />
    </div>
  );
}

export default SaleDetails;
