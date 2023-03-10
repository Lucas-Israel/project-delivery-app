import React from 'react';
import PropTypes from 'prop-types';

function UserCard({ id, name, email, role, index, handleDeleteUser }) {
  return (
    <div key={ index }>
      <div data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
        {id}
      </div>

      <div data-testid={ `admin_manage__element-user-table-name-${index}` }>
        {name}
      </div>

      <div data-testid={ `admin_manage__element-user-table-email-${index}` }>
        {email}
      </div>

      <div data-testid={ `admin_manage__element-user-table-role-${index}` }>
        {role}
      </div>

      <button
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
        type="button"
        onClick={ () => handleDeleteUser(id) }
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
