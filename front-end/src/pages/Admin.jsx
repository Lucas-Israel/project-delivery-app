import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AdminCreateNewUserForm from '../components/AdminCreateNewUser';
import UserCard from '../components/UserCard';
import { httpClient, backendUrl, admingUserRegister } from '../httpClient';

function Admin() {
  const [userList, setUserList] = useState([]);

  const newFetch = async () => {
    await httpClient.get(backendUrl('admin/manager'))
      .then((res) => {
        setUserList(res.data);
      });
  };

  const adminRegisterUser = async ({ name, email, password, role }) => {
    const { error } = await admingUserRegister({ name, email, password, role });
    newFetch();
    return error;
  };

  useEffect(() => {
    newFetch();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <h3>
          Cadastrar novo usuário
        </h3>
        <AdminCreateNewUserForm adminRegisterUser={ adminRegisterUser } />
      </div>

      <div>
        Lista de usuários
        {userList.map(({ id, name, email, role }, index) => (<UserCard
          id={ id }
          name={ name }
          email={ email }
          role={ role }
          index={ index }
          key={ index }
        />))}
      </div>
    </div>
  );
}

export default Admin;
