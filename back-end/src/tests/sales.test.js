const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { Sale,SalesProduct} = require('../database/models');
const { validOutput, validInput, gettedSales, verificationOutput } = require('./mocks/sales.mock');
const verifiers = require('../auth/jwtFunctions');
chai.use(chaiHttp);

const { expect } = chai;
describe('Testing endpoint "/sales"', () => {
  describe('Register a sale', function() {
    afterEach(sinon.restore);
    
    it('successfully', async () => {
      sinon
        .stub(Sale, "create")
        .resolves(validOutput);
      
      sinon
        .stub(SalesProduct, 'create')
        .resolves('nothing');
      

      const response = await chai
        .request(app)
        .post('/sales')
        .send(validInput);

      expect(response.status).to.be.equal(201);
      // expect(response.body).to.deep.equal(validOutput)
    });

    it('internal Error', async () => {
      sinon
        .stub(Sale, 'create')
        .throws(Error('db query failed'))
      sinon
        .stub(SalesProduct, "verifyToken")
        .resolves(verificationOutput);
      
        const response = await chai
        .request(app)
        .post('/sales')
        .send(validInput);;

      expect(response.status).to.be.equal(500);
      expect(response.body.message).to.deep.equal('Erro ao criar uma venda no banco');
      expect(response.body.error).to.deep.equal('db query failed');
    });
  }) 

  it('verify if i can get all sales', async () => {
    sinon
      .stub(Sale, "findAll")
      .resolves(gettedSales);
    sinon
      .stub(verifiers, "verifyToken")
      .resolves(verificationOutput);


      const response = await chai
      .request(app)
      .get('/sales')

    expect(response.status).to.be.equal(200);
  });
})