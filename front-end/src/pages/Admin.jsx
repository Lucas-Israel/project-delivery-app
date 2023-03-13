import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AdminCreateNewUserForm from '../components/AdminCreateNewUser';
import UserCard from '../components/UserCard';
import { httpClient, backendUrl, admingUserRegister } from '../httpClient';

function Admin() {
  const [userList, setUserList] = useState([]);
  const [erro, setErro] = useState('');

  const adminRegisterUser = async ({ name, email, password, role }) => {
    const { error } = await admingUserRegister({ name, email, password, role });
    if (error) setErro('Usuário ja existe');
    newFetch();
    return error;
  };

  useEffect(() => {
    const controller = new AbortController();
    httpClient.get(backendUrl('admin/manager'), { signal: controller.signal })
      .then((res) => {
        setUserList(res.data);
      })
      .catch(() => controller.signal.aborted);
    return () => controller.abort();
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
