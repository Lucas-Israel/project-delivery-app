import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AdminCreateNewUserForm({ adminRegisterUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [buttonDisabled, setButtondisabled] = useState(true);

  useEffect(() => {
    const passwordMinLength = 6;
    const minName = 12;
    const emailIsValid = email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);

    if (emailIsValid && password.length >= passwordMinLength && name.length >= minName) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [email, password, name]);

  const sendAndClearInputs = () => {
    adminRegisterUser({ name, email, password, role });
    setName('');
    setEmail('');
    setPassword('');
    setRole('customer');
  };

  const nameHandler = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const emailHandler = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const passwordHandler = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const roleHandler = ({ target }) => {
    const { value } = target;
    setRole(value);
  };

  return (
    <div className="admin-form-container">
      <form>
        <label htmlFor="nameInput">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            value={ name }
            onChange={ nameHandler }
          />
        </label>

        <label htmlFor="EmailInput">
          <span>Email</span>
          <input
            type="email"
            placeholder="seu-email@site.com"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ emailHandler }
          />
        </label>

        <label htmlFor="SenhaInput">
          <span>Senha</span>
          <input
            type="password"
            placeholder="******"
            data-testid="admin_manage__input-password"
            value={ password }
            onChange={ passwordHandler }
          />
        </label>

        <label htmlFor="RoleDropDown">
          <span>Tipo</span>
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ roleHandler }
          >
            <option>administrator</option>
            <option>seller</option>
            <option>customer</option>
          </select>
        </label>

        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ buttonDisabled }
          style={ buttonDisabled ? { opacity: '20%' } : {} }
          onClick={ () => sendAndClearInputs() }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

AdminCreateNewUserForm.propTypes = {
  adminRegisterUser: PropTypes.func.isRequired,
};

export default AdminCreateNewUserForm;
