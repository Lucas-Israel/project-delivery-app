const { USerService } = require('../services/User.service');
const { getStatusCode } = require('./helpers/htmlcodes');

class UserController {
  constructor() {
    this.service = new USerService();
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { type, payload: { token, user } } = await this.service.login({ email, password });
      if (type) return res.status(getStatusCode(type)).json({ hasToken: false });
      return res.status(200).json({ token, user });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao entrar no site.',
        error: erro.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = req.body;
      const { type, payload: { token } } = await this.service.createUser(newUser);
      if (type) {
        return res.status(getStatusCode(type)).json({ message: 'User already registered' }); 
      } 
      return res.status(201).json({ token });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco',
        error: erro.message,
      });
    }
  }

  async getAllUsers(_req, res) {
    try {
      const { type, payload } = await this.service.getAllUsers();
      if (type) return res.status(getStatusCode(type)).json({ message: type, payload });
      return res.status(200).json(payload);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { email } = req.body;
      await this.service.deleteUser(email);
      return res.status(204).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao deletar usuário',
        error: error.message,
      });
    }
  }
}

module.exports = {
  UserController,
};