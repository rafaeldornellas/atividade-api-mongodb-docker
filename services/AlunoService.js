import Aluno from "../models/Aluno.js";

// CRUD
export async function createAluno(data) {
  return await Aluno.create(data);
}

export async function updateAluno(id, data) {
  return await Aluno.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteAluno(id) {
  return await Aluno.findByIdAndDelete(id);
}

export async function findAluno(id) {
  return await Aluno.findById(id);
}

export async function findAllAlunos() {
  return await Aluno.find();
}

// Métodos extras específicos para Aluno
export async function listarAlunosPorCurso(curso) {
  return await Aluno.find({ 
    curso: new RegExp(curso, "i") 
  });
}

export async function buscarAlunoPorMatricula(matricula) {
  return await Aluno.findOne({ 
    matricula: matricula 
  });
}

export async function listarAlunosAtivos() {
  return await Aluno.find({ ativo: true });
}

export async function listarAlunosPorPeriodo(periodo) {
  return await Aluno.find({ periodo: periodo });
}