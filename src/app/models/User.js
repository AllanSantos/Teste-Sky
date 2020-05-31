import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

module.exports = User;