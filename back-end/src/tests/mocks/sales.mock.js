const validInput = {
  userId: 1,
  sellerId: 2,
  totalPrice: 10,
  deliveryAddress: "xablau",
  deliveryNumber: 3,
  status: "Pendente",
  products: [{
    productId : 1,
    quantity:1
  },{
    productId : 3,
    quantity:1
  }]
}

const validOutput = {
    saleDate: "2023-03-02T14:43:26.802Z",
    id: 1,
    saleId: 1,
    userId: 1,
    sellerId: 2,
    totalPrice: 10,
    deliveryAddress: "xablau",
    deliveryNumber: 3,
    status: "Pendente",
}

const gettedSales = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "25.87",
    "deliveryAddress": "dasda",
    "deliveryNumber": "12",
    "saleDate": "2023-03-09T17:37:55.000Z",
    "status": "Pendente",
    "SalesProducts": [
      {
        "saleId": 1,
        "productId": 11,
        "quantity": 3,
        "Product": {
          "id": 11,
          "name": "Stella Artois 275ml",
          "price": "3.49",
          "urlImage": "http://localhost:3001/images/stella_artois_275ml.jpg"
        }
      },
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 7,
        "Product": {
          "id": 1,
          "name": "Skol Lata 250ml",
          "price": "2.20",
          "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
        }
      }
    ]
  }
]

const verificationOutput = { id:1, role:'customer',name:'iare',email:'ikj98uhy7gt6rf5de4@gmail.com' }

const output = [
  {
    "id": 1,
    "name": "Delivery App Admin",
    "email": "adm@deliveryapp.com",
    "role": "administrator"
  },
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "role": "seller"
  },
  {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "role": "customer"
  },
  {
    "id": 4,
    "name": "Delivery App Admin",
    "email": "ludson_ps28@hotmail.com",
    "role": "customer"
  }
]

module.exports = {
  validInput,
  validOutput,
  gettedSales,
  verificationOutput,
  output
}