import mongoose from 'mongoose';

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  matricula: {
    type: String,
    required: [true, 'Matrícula é obrigatória'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  curso: {
    type: String,
    required: [true, 'Curso é obrigatório'],
    trim: true
  },
  periodo: {
    type: Number,
    required: [true, 'Período é obrigatório'],
    min: 1,
    max: 10
  },
  dataNascimento: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Aluno', alunoSchema);