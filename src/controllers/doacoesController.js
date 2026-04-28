const pool = require("../config/db");

// LISTAR
const listarDoacoes = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM doacoes ORDER BY data_cadastro DESC",
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar doações" });
  }
};

// CRIAR
const criarDoacao = async (req, res) => {
  try {
    const { nome_doador, telefone, item, quantidade, id_abrigo, status } =
      req.body;

    if (!nome_doador || !item) {
      return res.status(400).json({
        erro: "Campos obrigatórios não preenchidos",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO doacoes 
      (nome_doador, telefone, item, quantidade, id_abrigo, status)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        nome_doador,
        telefone,
        item,
        quantidade,
        id_abrigo || null,
        status || "pendente",
      ],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar doação" });
  }
};

// ATUALIZAR STATUS (muito útil no seu app)
const atualizarDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const resultado = await pool.query(
      `UPDATE doacoes SET
        status = COALESCE($1, status)
      WHERE id_doacao = $2 RETURNING *`,
      [status || null, id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Doação não encontrada" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar doação" });
  }
};

// DELETAR
const deletarDoacao = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM doacoes WHERE id_doacao = $1 RETURNING id_doacao",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Doação não encontrada" });
    }

    res.status(200).json({ mensagem: "Doação removida" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar doação" });
  }
};

module.exports = {
  listarDoacoes,
  criarDoacao,
  atualizarDoacao,
  deletarDoacao,
};
