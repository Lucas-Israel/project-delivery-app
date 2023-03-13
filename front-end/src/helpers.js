const getCartProducts = () => {
  const StorageCart = JSON.parse(localStorage.getItem('carrinho'));
  console.log('🚀 ~ file: helpers.js:3 ~ getCartProducts ~ StorageCart:', StorageCart);
  return StorageCart;
};

const addCartProduct = (item) => {
  localStorage.setItem(
    'carrinho',
    JSON.stringify(item),
  );
};

const getTotal = () => {
  const products = getCartProducts();
  const total = products.reduce(
    (
      accomulator,
      product,
    ) => accomulator + (Number(product.price) * Number(product.quantity)),
    0,
  );
  return total;
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export default {
  getCartProducts,
  addCartProduct,
  getTotal,
  getUser,
};
