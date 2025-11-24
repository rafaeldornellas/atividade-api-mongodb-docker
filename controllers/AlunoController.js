import * as AlunoService from "../services/AlunoService.js";

// CREATE - Criar novo aluno
export async function create(req, res) {
  try {
    const aluno = await AlunoService.createAluno(req.body);
    res.status(201).json({
      success: true,
      data: aluno,
      message: "Aluno criado com sucesso"
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Matrícula ou email já existe"
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// READ - Listar todos os alunos
export async function list(req, res) {
  try {
    const alunos = await AlunoService.findAllAlunos();
    res.json({
      success: true,
      count: alunos.length,
      data: alunos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// READ - Buscar aluno por ID
export async function findOne(req, res) {
  try {
    const aluno = await AlunoService.findAluno(req.params.id);
    if (!aluno) {
      return res.status(404).json({
        success: false,
        error: "Aluno não encontrado"
      });
    }
    res.json({
      success: true,
      data: aluno
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "ID inválido"
    });
  }
}

// UPDATE - Atualizar aluno
export async function update(req, res) {
  try {
    const aluno = await AlunoService.updateAluno(req.params.id, req.body);
    if (!aluno) {
      return res.status(404).json({
        success: false,
        error: "Aluno não encontrado"
      });
    }
    res.json({
      success: true,
      data: aluno,
      message: "Aluno atualizado com sucesso"
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Matrícula ou email já existe"
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// DELETE - Remover aluno
export async function remove(req, res) {
  try {
    const aluno = await AlunoService.deleteAluno(req.params.id);
    if (!aluno) {
      return res.status(404).json({
        success: false,
        error: "Aluno não encontrado"
      });
    }
    res.json({
      success: true,
      message: "Aluno deletado com sucesso",
      data: aluno
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// EXTRAS - Alunos por curso
export async function getAlunosPorCurso(req, res) {
  try {
    const alunos = await AlunoService.listarAlunosPorCurso(req.params.curso);
    res.json({
      success: true,
      count: alunos.length,
      data: alunos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// EXTRAS - Buscar aluno por matrícula
export async function getAlunoPorMatricula(req, res) {
  try {
    const aluno = await AlunoService.buscarAlunoPorMatricula(req.params.matricula);
    if (!aluno) {
      return res.status(404).json({
        success: false,
        error: "Aluno não encontrado"
      });
    }
    res.json({
      success: true,
      data: aluno
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// EXTRAS - Alunos ativos
export async function getAlunosAtivos(req, res) {
  try {
    const alunos = await AlunoService.listarAlunosAtivos();
    res.json({
      success: true,
      count: alunos.length,
      data: alunos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// EXTRAS - Alunos por período
export async function getAlunosPorPeriodo(req, res) {
  try {
    const periodo = parseInt(req.params.periodo);
    const alunos = await AlunoService.listarAlunosPorPeriodo(periodo);
    res.json({
      success: true,
      count: alunos.length,
      data: alunos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}