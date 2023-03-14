const { SuperService } = require('./SuperService');
const { SalesProduct } = require('../database/models');

class SaleProduct extends SuperService {
  constructor() {
    super(SalesProduct);
  }

  async createSaleProduct({ saleId, productId, quantity }) {
    const result0 = await super.create({ saleId, productId, quantity });

    return { type: null, payload: result0.dataValues };
  }
}

module.exports = { SaleProduct };