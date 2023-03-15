import React from 'react';
import PropTypes from 'prop-types';

function UserCard({ id, name, email, role, index, handleDeleteUser }) {
  return (
    <div key={ index } className="user-card">
      <div
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
        className="item-checkout-1"
      >
        {id}
      </div>

      <div
        data-testid={ `admin_manage__element-user-table-name-${index}` }
        className="item-checkout-2"
      >
        {name}
      </div>

      <div
        data-testid={ `admin_manage__element-user-table-email-${index}` }
        className="item-checkout-3"
      >
        {email}
      </div>

      <div
        data-testid={ `admin_manage__element-user-table-role-${index}` }
        className="item-checkout-4"
      >
        {role}
      </div>

      <button
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
        type="button"
        onClick={ () => handleDeleteUser(id) }
        className="item-checkout-5"
      >
        Excluir
      </button>
    </div>
  );
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

export default UserCard;
