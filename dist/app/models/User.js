"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const UserSchema = new _mongoose2.default.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  senha: {
    type: String,
    required: true, 
  },
  telefone: [{
    numero: {
      type: String,
    },
    ddd: {
      type: String,
    }
  }],
  ultimo_login: {
    type: Date,
  }
}, {
  timestamps: true
}
);

const User = _mongoose2.default.model('User', UserSchema);

module.exports = User;