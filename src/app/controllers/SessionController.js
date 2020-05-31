import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth'

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({mensagem: 'Validação Falhou'});
    }

    const { email, senha} = req.body;

    const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({mensagem: 'Usuário e/ou senha inválidos'});
     }

     if (!(await bcrypt.compare(senha, user.senha))) {
       return res.status(401).json({mensagem: 'Usuário e/ou senha inválidos'});
     }

     const {id, nome} = user;

     return res.json({
       user: {
         id,
         nome,
         email,
       },
       token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
       }),
     });
  }
}

export default new SessionController();