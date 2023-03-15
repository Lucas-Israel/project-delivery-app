import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AdminCreateNewUserForm from '../components/AdminCreateNewUser';
import UserCard from '../components/UserCard';
import { httpClient, backendUrl, admingUserRegister } from '../httpClient';

function Admin() {
  const [userList, setUserList] = useState([]);
  const [erro, setErro] = useState('');

  const newFetch = async (option) => {
    await httpClient.get(backendUrl('admin/manager'), { signal: option.signal })
      .then((res) => {
        setUserList(res.data);
      })
      .catch(() => option.signal.aborted);
  };

  const adminRegisterUser = async ({ name, email, password, role }) => {
    const controller = new AbortController();
    const { error } = await admingUserRegister({ name, email, password, role });
    if (error) setErro('Usuário ja existe');
    newFetch(controller);
    return error;
  };

  useEffect(() => {
    const controller = new AbortController();
    newFetch(controller);
    return () => controller.abort();
  }, []);

  const handleDeleteUser = (id) => {
    httpClient.delete(backendUrl(`admin/manager/${id}`))
      .then(() => {
        const newList = userList.filter((user) => user.id !== id);
        setUserList(newList);
      });
    const { token } = JSON.parse(localStorage.getItem('user'));
    httpClient.defaults.headers.post.authorization = token;
  };

  return (
    <div className="admin">
      <NavBar />
      <div className="title-container">
        <h3 className="page-title">
          Cadastrar novo usuário
        </h3>
        {
          erro ? (
            <small
              data-testid="admin_manage__element-invalid-register"
            >
              {erro}
            </small>) : null
        }
        <AdminCreateNewUserForm adminRegisterUser={ adminRegisterUser } />
      </div>

      <div className="users-list-container">
        <p>Lista de usuários</p>
        <div className="users-list">
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
    </div>
  );
}

export default Admin;
