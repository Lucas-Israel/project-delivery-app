import React from 'react';
import PropTypes from 'prop-types';
import DeliveryDetails from '../components/DeliveryDetails';
import NavBar from '../components/NavBar';
import OrderDetails from '../components/OrderDatails';
import bg from '../images/background.png';

function Checkout({ history }) {
  return (
    <div
      className="checkout"
      style={ {
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      } }
    >
      <NavBar />
      <div className="checkout-details">
        <OrderDetails />
        <DeliveryDetails history={ history } />
      </div>
    </div>

  );
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
