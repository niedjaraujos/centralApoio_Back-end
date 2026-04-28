const pool = require("../config/db");

// LISTAR
const listarVoluntarios = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM voluntarios ORDER BY id_voluntario",
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar voluntários" });
  }
};

// CRIAR
const criarVoluntario = async (req, res) => {
  try {
    const { nome, telefone, cidade, disponibilidade, habilidade, observacoes } =
      req.body;

    if (!nome || !telefone || !cidade) {
      return res.status(400).json({
        erro: "Campos obrigatórios não preenchidos",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO voluntarios 
      (nome, telefone, cidade, disponibilidade, habilidade, observacoes)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, telefone, cidade, disponibilidade, habilidade, observacoes],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar voluntário" });
  }
};

// ATUALIZAR
const atualizarVoluntario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, cidade, disponibilidade, habilidade, observacoes } =
      req.body;

    const resultado = await pool.query(
      `UPDATE voluntarios SET
        nome = COALESCE($1, nome),
        telefone = COALESCE($2, telefone),
        cidade = COALESCE($3, cidade),
        disponibilidade = COALESCE($4, disponibilidade),
        habilidade = COALESCE($5, habilidade),
        observacoes = COALESCE($6, observacoes)
      WHERE id_voluntario = $7 RETURNING *`,
      [
        nome || null,
        telefone || null,
        cidade || null,
        disponibilidade || null,
        habilidade || null,
        observacoes || null,
        id,
      ],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Voluntário não encontrado" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar voluntário" });
  }
};

// DELETAR
const deletarVoluntario = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM voluntarios WHERE id_voluntario = $1 RETURNING id_voluntario",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Voluntário não encontrado" });
    }

    res.status(200).json({ mensagem: "Voluntário removido" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar voluntário" });
  }
};

module.exports = {
  listarVoluntarios,
  criarVoluntario,
  atualizarVoluntario,
  deletarVoluntario,
};
