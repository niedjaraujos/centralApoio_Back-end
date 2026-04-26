const pool = require("../config/db");

//  listar todos abrigos ou filtrar por estado
const listarAbrigos = async (req, res) => {
  // Aqui pegamos o estado que vem da URL exemplo: /abrigos?estado=PE
  const { estado } = req.query;

  try {
    // Começa buscando todos os abrigos
    let query = "SELECT * FROM abrigos";
    // Array para armazenar os valores da query (evita SQL Injection)
    const values = [];

    if (estado) {
      // Adiciona filtro na query
      // $1 é um placeholder (posição no array values)
      query += " WHERE estado = $1";
      // Adiciona o valor do estado no array
      // toUpperCase garante que "pe", "Pe", "PE" funcionem igual
      values.push(estado.toUpperCase());
    }
    // Ordena os resultados pelo ID do abrigo
    query += " ORDER BY id_abrigo";

    // Executa a query no banco, query = string SQL, values = valores seguros para substituir $1, $2...
    const resultado = await pool.query(query, values);

    // Retorna os dados encontrados para o front-end
    res.status(200).json(resultado.rows);
  } catch (error) {
    // Se der erro, retorna erro 500 (erro interno do servidor)
    res.status(500).json({ erro: "Erro ao listar abrigos" });
  }
};
//criar abrigo
const criarAbrigo = async (req, res) => {
  try {
    // Pegando os dados enviados pelo front (body da requisição)
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

    // Validação básica
    if (!nome || !cidade || !estado || !endereco) {
      return res.status(400).json({
        erro: "Campos obrigatórios não preenchidos",
      });
    }

    // Executa a query de inserção no banco
    const resultado = await pool.query(
      `INSERT INTO abrigos (nome, cidade, estado, bairro, endereco, capacidade_total, capacidade_disponivel, status, telefone, observacoes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        nome,
        cidade,
        estado.toUpperCase(), // Garante que o estado será sempre maiúsculo
        bairro,
        endereco,
        capacidade_total,
        capacidade_disponivel,
        status || "disponivel", // Se não vier status, usa "disponivel"
        telefone,
        observacoes,
      ],
    );
    // Retorna que o abrigo foi criado com sucesso
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar abrigo" });
  }
};

//atualizar
const atualizarAbrigo = async (req, res) => {
  try {
    // Pegando o ID do abrigo pela URL
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
    const resultado = await pool.query(
      // COALESCE: se o valor vier NULL, mantém o valor antigo do banco
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

         
       WHERE id_abrigo = $11 RETURNING *`, // Atualiza apenas o abrigo com o ID informado
      [
        nome || null,
        cidade || null,
        estado ? estado.toUpperCase() : null,
        bairro || null,
        endereco || null,
        capacidade_total || null,
        capacidade_disponivel || null,
        status || null,
        telefone || null,
        observacoes || null,
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

// //excluir um abrigo
const deletarAbrigo = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "DELETE FROM abrigos WHERE id_abrigo = $1 RETURNING id_abrigo",
      [id],
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ erro: "Abrigo não encontrado" });

    res.status(200).json({
      mensagem: "Abrigo removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar abrigo" });
  }
};
module.exports = { listarAbrigos, criarAbrigo, atualizarAbrigo, deletarAbrigo };
