const axios = require('axios').default;

const helpers = require('./helpers').default;

const { getCartProducts, getTotal } = helpers;

const backendUrl = (endpoint) => `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${endpoint}`;

const httpClient = axios.create();

httpClient.defaults.timeout = 500;

const admingUserRegister = async ({ name, email, password, role }) => {
  let error = false;
  try {
    await httpClient.post(
      backendUrl('register'),
      {
        name, email, password, role,
      },
    );
  } catch (err) {
    error = true;
  }
  return { error };
};

const registUser = async ({ name, email, password, role = 'customer' }) => {
  let error = false;
  try {
    const res = await httpClient.post(
      backendUrl('register'),
      {
        name, email, password, role,
      },
    );
    const saveUser = {
      name,
      email,
      role,
      token: res.data.token,
    };
    httpClient.defaults.headers.post.authorization = saveUser.token;
    localStorage.setItem('user', JSON.stringify(saveUser));
  } catch (err) {
    error = true;
  }
  return { error };
};

const loginUser = async ({ email, password }) => {
  let error = false;
  let role;
  localStorage.removeItem('user');
  localStorage.removeItem('carrinho');
  try {
    const res = await httpClient.post(backendUrl('login'), { email, password });
    const { token, user } = res.data;
    const saveUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    httpClient.defaults.headers.post.authorization = token;
    role = user.role;
    localStorage.setItem('user', JSON.stringify(saveUser));
  } catch (err) {
    error = true;
  }
  return { error, role };
};

const sendSale = async ({ deliveryAddress, deliveryNumber }) => {
  const products = getCartProducts();
  const nProducts = products.map((product) => ({ ...product, productId: product.id }));
  const totalPrice = getTotal();
  const { token } = JSON.parse(localStorage.getItem('user'));

  httpClient.defaults.headers.post.authorization = token;
  let error = false;
  try {
    const res = await httpClient.post(backendUrl('sales'), {
      products: nProducts,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    });
    const { saleId } = res.data;
    return { saleId, error };
  } catch (err) {
    error = true;
  }
  return { error };
};

const getMineSales = async () => {
  let error = false;
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    httpClient.defaults.headers.get.authorization = token;
    const res = await httpClient.get(backendUrl('sales'));
    const sales = res.data;
    return { sales, error };
  } catch (err) {
    error = true;
  }
  return { error };
};

const setSaleStatus = async (saleId, status) => {
  let error = false;
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    httpClient.defaults.headers.patch.authorization = token;
    await httpClient.patch(backendUrl(`sales/${saleId}`), { status });
  } catch (err) {
    error = true;
  }
  return { error };
};

module.exports = {
  httpClient,
  registUser,
  loginUser,
  backendUrl,
  sendSale,
  getMineSales,
  admingUserRegister,
  setSaleStatus,
};
