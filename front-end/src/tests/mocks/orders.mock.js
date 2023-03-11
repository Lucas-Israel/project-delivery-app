export const allSale = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '3.49',
    deliveryAddress: 'xzvzvz',
    deliveryNumber: '1',
    saleDate: '2023-03-11T18:24:50.000Z',
    status: 'Pendente',
    SalesProducts: [
      {
        saleId: 1,
        productId: 11,
        quantity: 1,
        Product: {
          id: 11,
          name: 'Stella Artois 275ml',
          price: '3.49',
          urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
        },
      },
    ],
  },
];

export const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRhdGFWYWx1ZXMiOns
iaWQiOjksIm5hbWUiOiJEZWxpdmVyeSBBcHAgQWRtaW4iLCJlbWFpbCI6Imx1ZHNvbl9wczI1QGhvdG1haWwuY29tI
iwicGFzc3dvcmQiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsInJvbGUiOiJjdXN0b21lciJ9LCJ
fcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiJEZWxpdmVyeSBBcHAgQWRtaW4iLCJlbWFpbCI6Imx1ZHNvbl9wc
zI1QGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiJmY2VhOTIwZjc0MTJiNWRhN2JlMGNmNDJiOGM5Mzc1OSIsInJvbGU
iOiJjdXN0b21lciIsImlkIjo5fSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb
3JkIjp0cnVlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIn0sImlzTmV3UmVjb3JkIjpmYWxzZX0
sImlhdCI6MTY3ODIyNTM0MiwiZXhwIjoxNjc4ODMwMTQyfQ.wIf9bzH0T5A-99P6PTQmDWetfSTj4QXxwJytqb8lJZ
U`;

export const saveCustomer = {
  id: 3,
  name: 'Fulano de tal',
  email: 'Fulano@email.com',
  role: 'customer',
  token,
};

export const dataPedido = 'customer_orders__element-order-id-1';
