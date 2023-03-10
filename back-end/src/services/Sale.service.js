const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');
const { Product } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
    this.saleProduct = SalesProduct;
    this.products = Product;
  }

  async createSale({ userId, sellerId = 2, totalPrice, deliveryAddress,
    deliveryNumber, status = 'pendente' }) {  
    console.log("🚀 ~ file: Sale.service.js:16 ~ SaleService ~ totalPrice:", totalPrice)
    const result = await super.create({
      totalPrice,
      userId,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      status,
    });
  
    return { type: null, payload: result };
  }

  async getSales({ userId, role }) {
    const idFinder = (role === 'customer') ? { userId } : { sellerId: userId };
    const result = await super.findAll({
      where: idFinder,
      include: {
        model: this.saleProduct,
        include: {
          model: this.products,
        },
      },
    });

    if (!result) return { type: 'NOT_FOUND', payload: result };

    return { type: null, payload: result };
  }

  async updateStatus(status, id) {
    console.log("🚀 ~ file: Sale.service.js:46 ~ SaleService ~ updateStatus ~ status:", status)
    const result = await super.update({ status }, { where: { id } });
    if (!result) return { type: 'NOT_FOUND', payload: result };
    return { type: null, payload: result };
  }
}

module.exports = {
  SaleService,
};