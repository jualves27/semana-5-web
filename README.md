# semana-5-web
Desafios JS: Validação de Dados, ViaCEP e PokéAPI

Este repositório contém a resolução dos exercícios práticos de JavaScript assíncrono, consumo de APIs REST e manipulação de arrays.

 Conteúdo do Projeto

1. Parte 1 – Manipulação e Validação de Dados: Tratamento de arrays de objetos, filtragem de dados inválidos/pendentes e cálculo de totais com `reduce`.
2. Parte 2 – Consulta de CEP (ViaCEP): Integração com a API do ViaCEP com tratamento dos 4 estados de interface (*Carregando*, *Erro*, *Vazio* e *Sucesso*) e histórico de pesquisas.
3. Parte 3 – Mini PokéDEX: Consumo da PokéAPI via `fetch` com `async/await`, exibição de sprite/tipos e tratamento manual de erros HTTP (status 404).

 Parte 4 – Reflexão

Por que o `Promise.all` pode ser mais rápido do que vários `await` seguidos?

Quando utilizamos múltiplos `await` em sequência:
```javascript
const res1 = await fetch(url1);
const res2 = await fetch(url2);
