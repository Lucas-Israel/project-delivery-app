const { SaleService } = require('../services/Sale.service');
const { SaleProduct } = require('../services/SaleProduct.service');
const verifiers = require('../auth/jwtFunctions');
const { getStatusCode } = require('./helpers/htmlcodes');

class SaleController {
  constructor() {
    this.SaleService = new SaleService();
    this.SaleProductService = new SaleProduct();
    this.createSale = this.createSale.bind(this);
    this.getSales = this.getSales.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  async createSale(req, res) {
    try {
      const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
      const { authorization } = req.headers;
      const { id } = verifiers.verifyToken(authorization);
      const result = await this.SaleService
        .createSale({
          userId: id, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });
      await Promise.all(products.map(({ productId, quantity }) => this.SaleProductService
        .createSaleProduct({ saleId: result.payload.id, productId, quantity })));
      return res.status(201).json({ saleId: result.payload.id });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar uma venda no banco',
        error: erro.message,
      });
    }
  }

  async getSales(req, res) {
    try {
      const { authorization } = req.headers;
      const { id, role } = verifiers.verifyToken(authorization);
      const { type, payload } = await this.SaleService.getSales({ userId: id, role });
      if (type) return res.status(getStatusCode(type)).json({ payload });
      return res.status(200).json(payload);
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao listar as vendas do banco',
        error: erro.message,
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { type, payload } = await this.SaleService.updateStatus(status, id);
      if (type) return res.status(getStatusCode(type)).json({ payload });
      return res.status(200).json(payload);
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao editar status no banco',
        error: erro.message,
      });
    }
  }
}

module.exports = {
  SaleController,
};