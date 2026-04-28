const pool = require("../config/db");

// LISTAR necessidades (com filtro por abrigo)
const listarNecessidades = async (req, res) => {
  const { id_abrigo } = req.query;

  try {
    let query = "SELECT * FROM necessidades";
    const values = [];

    if (id_abrigo) {
      query += " WHERE id_abrigo = $1";
      values.push(id_abrigo);
    }

    query += " ORDER BY id_necessidade";

    const resultado = await pool.query(query, values);
    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar necessidades" });
  }
};

// CRIAR necessidade
const criarNecessidade = async (req, res) => {
  try {
    const { id_abrigo, item, categoria, prioridade, quantidade, status } =
      req.body;

    if (!id_abrigo || !item || !categoria) {
      return res.status(400).json({
        erro: "Campos obrigatórios não preenchidos",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO necessidades 
      (id_abrigo, item, categoria, prioridade, quantidade, status)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        id_abrigo,
        item,
        categoria,
        prioridade || "media",
        quantidade,
        status || "pendente",
      ],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar necessidade" });
  }
};

// ATUALIZAR necessidade
const atualizarNecessidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, categoria, prioridade, quantidade, status } = req.body;

    const resultado = await pool.query(
      `UPDATE necessidades SET
        item = COALESCE($1, item),
        categoria = COALESCE($2, categoria),
        prioridade = COALESCE($3, prioridade),
        quantidade = COALESCE($4, quantidade),
        status = COALESCE($5, status)
      WHERE id_necessidade = $6 RETURNING *`,
      [
        item || null,
        categoria || null,
        prioridade || null,
        quantidade || null,
        status || null,
        id,
      ],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Necessidade não encontrada" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar necessidade" });
  }
};

// DELETAR
const deletarNecessidade = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM necessidades WHERE id_necessidade = $1 RETURNING id_necessidade",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Necessidade não encontrada" });
    }

    res.status(200).json({ mensagem: "Necessidade removida" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar necessidade" });
  }
};

module.exports = {
  listarNecessidades,
  criarNecessidade,
  atualizarNecessidade,
  deletarNecessidade,
};
