export const outputAdministrator = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhI
  p7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBl
  bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc4M
  TI3NzY0LCJleHAiOjE2Nzg3MzI1NjR9.tNkMQWHMp9Vtn-TglLthCaN3_DnWMbq7v1TFlFTmuA8`,
  user: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  },
};

export const outputSeller = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhI
  p7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBl
  bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc4M
  TI3NzY0LCJleHAiOjE2Nzg3MzI1NjR9.tNkMQWHMp9Vtn-TglLthCaN3_DnWMbq7v1TFlFTmuA8`,
  user: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
};

export const outputCustomer = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhI
  p7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBl
  bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc4M
  TI3NzY0LCJleHAiOjE2Nzg3MzI1NjR9.tNkMQWHMp9Vtn-TglLthCaN3_DnWMbq7v1TFlFTmuA8`,
  user: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  },
};

export const testUserEmail = 'zebirita@email.com';

export const tesUserPassword = '$#zebirita#$';

export const returnAllSales = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '68.86',
    deliveryAddress: 'Reis Travessa',
    deliveryNumber: '35',
    saleDate: '2023-03-10T18:22:05.000Z',
    status: 'Pendente',
    SalesProducts: [
      {
        saleId: 1,
        productId: 1,
        quantity: 4,
        Product: {
          id: 1,
          name: 'Skol Lata 250ml',
          price: '2.20',
          urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        },
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 1,
        Product: {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        },
      },
      {
        saleId: 1,
        productId: 4,
        quantity: 4,
        Product: {
          id: 4,
          name: 'Brahma 600ml',
          price: '7.50',
          urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
        },
      },
      {
        saleId: 1,
        productId: 10,
        quantity: 3,
        Product: {
          id: 10,
          name: 'Skol Beats Senses 269ml',
          price: '3.57',
          urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
        },
      },
    ],
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '41.62',
    deliveryAddress: 'Oliveira Rua',
    deliveryNumber: '610',
    saleDate: '2023-03-10T18:23:07.000Z',
    status: 'Pendente',
    SalesProducts: [
      {
        saleId: 2,
        productId: 3,
        quantity: 3,
        Product: {
          id: 3,
          name: 'Antarctica Pilsen 300ml',
          price: '2.49',
          urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        },
      },
      {
        saleId: 2,
        productId: 5,
        quantity: 1,
        Product: {
          id: 5,
          name: 'Skol 269ml',
          price: '2.19',
          urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
        },
      },
      {
        saleId: 2,
        productId: 7,
        quantity: 3,
        Product: {
          id: 7,
          name: 'Becks 330ml',
          price: '4.99',
          urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
        },
      },
      {
        saleId: 2,
        productId: 8,
        quantity: 1,
        Product: {
          id: 8,
          name: 'Brahma Duplo Malte 350ml',
          price: '2.79',
          urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
        },
      },
      {
        saleId: 2,
        productId: 10,
        quantity: 3,
        Product: {
          id: 10,
          name: 'Skol Beats Senses 269ml',
          price: '3.57',
          urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
        },
      },
      {
        saleId: 2,
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

export const outputAllProducts = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
  },
];
