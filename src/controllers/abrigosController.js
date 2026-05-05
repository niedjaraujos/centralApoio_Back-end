import pool from "../config/db.js";

// listar todos abrigos ou filtrar por estado
const listarAbrigos = async (req, res) => {
  const { estado } = req.query;

  try {
    let query = "SELECT * FROM abrigos";
    const values = [];

    if (estado) {
      query += " WHERE estado = $1";
      values.push(estado.toUpperCase());
    }

    query += " ORDER BY id_abrigo";

    const resultado = await pool.query(query, values);

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("ERRO SQL:", error);
    res.status(500).json({ erro: error.message });
  }
};

// criar abrigo
const criarAbrigo = async (req, res) => {
  try {
    const {
      nome,
      cidade,
      estado,
      bairro,
      endereco,
      capacidade_total,
      capacidade_disponivel,
      status,
      telefone,
      observacoes,
    } = req.body;

    if (!nome || !cidade || !estado || !endereco) {
      return res.status(400).json({
        erro: "Campos obrigatórios não preenchidos",
      });
    }

    let statusFinal = status || "disponivel";

    if (capacidade_disponivel === 0) {
      statusFinal = "lotado";
    }

    const resultado = await pool.query(
      `INSERT INTO abrigos 
      (nome, cidade, estado, bairro, endereco, capacidade_total, capacidade_disponivel, status, telefone, observacoes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        nome,
        cidade,
        estado.toUpperCase(),
        bairro,
        endereco,
        capacidade_total,
        capacidade_disponivel,
        statusFinal,
        telefone,
        observacoes,
      ],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({ erro: "Erro ao criar abrigo" });
  }
};

// atualizar
const atualizarAbrigo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      cidade,
      estado,
      bairro,
      endereco,
      capacidade_total,
      capacidade_disponivel,
      status,
      telefone,
      observacoes,
    } = req.body;

    let statusFinal = status ?? null;

    if (capacidade_disponivel === 0) {
      statusFinal = "lotado";
    }

    const resultado = await pool.query(
      `UPDATE abrigos SET
        nome = COALESCE($1, nome),
        cidade = COALESCE($2, cidade),
        estado = COALESCE($3, estado),
        bairro = COALESCE($4, bairro),
        endereco = COALESCE($5, endereco),
        capacidade_total = COALESCE($6, capacidade_total),
        capacidade_disponivel = COALESCE($7, capacidade_disponivel),
        status = COALESCE($8, status),
        telefone = COALESCE($9, telefone),
        observacoes = COALESCE($10, observacoes)
      WHERE id_abrigo = $11 RETURNING *`,
      [
        nome ?? null,
        cidade ?? null,
        estado ? estado.toUpperCase() : null,
        bairro ?? null,
        endereco ?? null,
        capacidade_total ?? null,
        capacidade_disponivel ?? null,
        statusFinal,
        telefone ?? null,
        observacoes ?? null,
        id,
      ],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Abrigo não encontrado" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar abrigo" });
  }
};

// deletar abrigo
const deletarAbrigo = async (req, res) => {
  try {
    const { id } = req.params;

    // PRIMEIRO verifica permissão
    if (!req.user) {
      return res.status(403).json({ erro: "Sem permissão" });
    }

    const resultado = await pool.query(
      "DELETE FROM abrigos WHERE id_abrigo = $1 RETURNING id_abrigo",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Abrigo não encontrado" });
    }

    res.status(200).json({
      mensagem: "Abrigo removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar abrigo" });
  }
};

export { listarAbrigos, criarAbrigo, atualizarAbrigo, deletarAbrigo };
