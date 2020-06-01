"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SignUpController {
  async index(req, res) {

    const {id} = req.params

    const user = await _User2.default.findOne({_id: id}, {_id: 1, nome: 1, email: 1, senha: 1, telefone: 1, ultimo_login: 1});

    if(!user) {
      return res.status(401).json({ messagem: 'Usuário não cadastrado'});
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      telefone: Yup.array().of(
        Yup.object().shape({
          numero: Yup.string(),
          ddd: Yup.string()
        })
      ),
      ultimo_login: Yup.date()
    });
    
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({mensagem: 'Validação Falhou'});
    }
    
    const userExists = await _User2.default.findOne({email: req.body.email});

    if(userExists) {
      return res.status(400).json({ messagem: 'E-mail já existente.'});
    }

    if (req.body.senha) {
      req.body.senha = await _bcryptjs2.default.hash(req.body.senha, 8);
    }

    req.body.ultimo_login = Date.now();


    const {id, nome, email, senha, telefone, ultimo_login} = await _User2.default.create(req.body);

    return res.json({id, nome, email, senha, telefone, ultimo_login});
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6)
    });
    
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({mensagem: 'Validação Falhou'});
    }
    
    const userExists = await _User2.default.findOne({email: req.body.email});

    if(!userExists) {
      return res.status(401).json({ messagem: 'Usuário e/ou senha inválidos'});
    }

    req.body.ultimo_login = Date.now();

    await _User2.default.update(req.body);

    const {id , nome, email, senha, telefone, ultimo_login} = await _User2.default.findOne({email: req.body.email});

    return res.json({id, nome, email, senha, telefone, ultimo_login});
  }
}

exports. default = new SignUpController();