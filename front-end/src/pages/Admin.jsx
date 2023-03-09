import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AdminCreateNewUserForm from '../components/AdminCreateNewUser';
import UserCard from '../components/UserCard';
import { httpClient, backendUrl } from '../httpClient';

function Admin() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    httpClient.get(backendUrl('admin/manager'))
      .then((res) => {
        setUserList(res.data);
      });
  }, []);

  const handleDeleteUser = (id) => {
    try {
      httpClient.delete(backendUrl(`admin/manager/${id}`))
        .then(() => {
          const newList = userList.filter((user) => user.id !== id);
          setUserList(newList);
        });
      const { token } = JSON.parse(localStorage.getItem('user'));
      httpClient.defaults.headers.post.authorization = token;
    } catch (e) {
      return e.message;
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <h3>
          Cadastrar novo usuário
        </h3>
        <AdminCreateNewUserForm />
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
          handleDeleteUser={ handleDeleteUser }
        />))}
      </div>
    </div>
  );
}

export default Admin;
