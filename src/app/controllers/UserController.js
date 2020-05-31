import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class SignUpController {
  async index(req, res) {

    const {id} = req.params

    const user = await User.findOne({_id: id}, {_id: 1, nome: 1, email: 1, senha: 1, telefone: 1, ultimo_login: 1});

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
    
    const userExists = await User.findOne({email: req.body.email});

    if(userExists) {
      return res.status(400).json({ messagem: 'E-mail já existente.'});
    }

    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 8);
    }

    req.body.ultimo_login = Date.now();


    const {id, nome, email, senha, telefone, ultimo_login} = await User.create(req.body);

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
    
    const userExists = await User.findOne({email: req.body.email});

    if(!userExists) {
      return res.status(401).json({ messagem: 'Usuário e/ou senha inválidos'});
    }

    req.body.ultimo_login = Date.now();

    await User.update(req.body);

    const {id , nome, email, senha, telefone, ultimo_login} = await User.findOne({email: req.body.email});

    return res.json({id, nome, email, senha, telefone, ultimo_login});
  }
}

export default new SignUpController();