# 🌊 Desafio Técnico Final — Pessoas Afetadas por Enchentes - Central Apoio
## 💡 Apresentação da Ideia

Este projeto surgiu a partir do desafio sobre enchentes no Brasil.
Diante desse cenário, muitas pessoas ficam desabrigadas e precisam de ajuda imediata.
O objetivo deste desafio é desenvolver uma solução tecnológica capaz de organizar e conectar informações relevantes em um cenário de enchente, facilitando a comunicação entre pessoas que precisam de ajuda e aquelas que podem ajudar.


## 🚨 Problema Escolhido

- Falta organização das informações sobre abrigos
- Dificuldade em saber quais locais ainda têm capacidade.
- Falta controle sobre necessidades (alimentos, roupas, etc.)
- Doadores e voluntários não sabem onde ajudar

## 🧠 Solução Proposta

- Cadastrar abrigos com capacidade e localização
- Registrar necessidades de cada abrigo
- Cadastrar voluntários
- Registrar doações
- Atualizar status (abrigo lotado, doação entregue, etc.)

A ideia é centralizar as informações em um único lugar, facilitando a tomada de decisão e a ajuda mais rápida.


## 📊 Metodologia e Dados


> **Nota:** Este projeto foi desenvolvido com base em dados reais coletados via [PESQUISA](https://docs.google.com/forms/d/e/1FAIpQLSfIp2aZZB8zM57P41qyvOmkfisVCGlWK1ioxs462SAmICfe0g/viewform?usp=dialog).
> A análise desses resultados direcionou o desenvolvimento de uma plataforma centralizada de apoio em enchentes com foco principal em abrigos disponíveis, podendo ter como extensão a organização de doações e voluntários, garantindo uma solução alinhada às necessidades do usuário.

## 🏗️ Estrutura do Sistema
🎨 Front-end

Desenvolvido com ferramentas modernas React + Vite + Tailwind CSS.

- Interface do usuário
- Seleção de estado/cidade
- Visualização dos abrigos
- Cadastro de informações

🔗 Acesse o projeto:
https://central-apoio-front-end.vercel.app/

⚙️ Back-end
- Node.js
- Express

Responsável por:

- Criação das rotas
- Regras de negócio
- Integração com o banco de dados

🗄️ Banco de Dados
   PostgreSQL
   
 Tabelas principais:
- abrigos → dados dos locais de apoio
- necessidades → itens necessários por abrigo
- voluntarios → pessoas disponíveis para ajudar
- doacoes → registros de doações
🔗 Relacionamentos:
- Um abrigo pode ter várias necessidades
- Doações podem ser vinculadas a um abrigo
- Exclusão de abrigo remove suas necessidades automaticamente

## 🎯 Objetivo do Projeto

- Pensamento crítico
- Organização de dados
- Estruturação de um sistema completo (front + back + banco)
- Criação de soluções reais com tecnologia


## 🔮 Melhorias Futuras
- 🔐 Sistema de autenticação (admin, voluntário, vítima)
- 📍 Integração com geolocalização (mapa dos abrigos)
- 🔎 Filtros avançados (tipo de necessidade, prioridade)
- 📊 Dashboard com dados em tempo real
- 🔔 Notificações para novas necessidades urgentes
