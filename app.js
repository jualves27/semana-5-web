// PARTE 1 – MANIPULAÇÃO E VALIDAÇÃO DE DADOS

console.log("--- PARTE 1 ---");

const pedidos = [
  { cliente: "Bia", valor: 120, status: "pago" },
  { cliente: "Carlos", valor: 0, status: "pago" }, // inválido (valor <= 0)
  { cliente: "", valor: 50, status: "pago" },      // inválido (cliente vazio)
  { cliente: "Ana", valor: 85.5, status: "pendente" },
  { cliente: "Pedro", valor: 200, status: "pago" }
];

// 1. Validar cada pedido (cliente não vazio e valor > 0)
const pedidosValidos = pedidos.filter(p => p.cliente && typeof p.cliente === "string" && p.cliente.trim() !== "" && typeof p.valor === "number" && p.valor > 0);

// 2. Filtrar apenas com status "pago"
const pedidosPagos = pedidosValidos.filter(p => p.status === "pago");

// 3. Calcular o total faturado usando reduce
const totalFaturado = pedidosPagos.reduce((acc, p) => acc + p.valor, 0);

// 4. Gerar textos no formato "Cliente – R$ Valor"
const textosFormatados = pedidosPagos.map(p => `${p.cliente} – R$ ${p.valor.toFixed(2)}`);

console.log("Pedidos Válidos e Pagos:", pedidosPagos);
console.log("Total Faturado:", totalFaturado.toFixed(2));
console.log("Formatados:", textosFormatados);



// PARTE 2 – CONSULTA VIACEP E ESTADOS DA TELA

console.log("\n--- PARTE 2 ---");

const btnBuscarCep = document.getElementById("btnBuscarCep");
const campoCep = document.getElementById("cep");
const statusCep = document.getElementById("statusCep");
const resultadoCep = document.getElementById("resultadoCep");
const listaHistorico = document.getElementById("historicoCep");

// Bônus: Array de histórico de CEPs
const historicoCeps = [];

async function buscarCep() {
  const cep = campoCep.value.trim().replace(/\D/g, "");

  if (!cep) {
    statusCep.textContent = "Por favor, informe um CEP válido.";
    statusCep.className = "status erro";
    return;
  }

  // Estado: Carregando
  statusCep.textContent = "Buscando...";
  statusCep.className = "status";
  btnBuscarCep.disabled = true;
  resultadoCep.replaceChildren();

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Estado: Erro HTTP
    if (!response.ok) {
      throw new Error("Falha na conexão com o servidor.");
    }

    const data = await response.json();

    // Estado: Vazio / Não Encontrado
    if (data.erro) {
      statusCep.textContent = "CEP não encontrado.";
      statusCep.className = "status erro";
      return;
    }

    // Estado: Sucesso
    statusCep.textContent = "";
    
    const dtRua = document.createElement("dt");
    dtRua.textContent = "Rua:";
    const ddRua = document.createElement("dd");
    ddRua.textContent = data.logradouro || "N/A";

    const dtBairro = document.createElement("dt");
    dtBairro.textContent = "Bairro:";
    const ddBairro = document.createElement("dd");
    ddBairro.textContent = data.bairro || "N/A";

    const dtCidade = document.createElement("dt");
    dtCidade.textContent = "Cidade:";
    const ddCidade = document.createElement("dd");
    ddCidade.textContent = data.localidade || "N/A";

    const dtUf = document.createElement("dt");
    dtUf.textContent = "UF:";
    const ddUf = document.createElement("dd");
    ddUf.textContent = data.uf || "N/A";

    resultadoCep.append(dtRua, ddRua, dtBairro, ddBairro, dtCidade, ddCidade, dtUf, ddUf);

    // Guardar no histórico
    historicoCeps.push({ cep: data.cep, logradouro: data.logradouro, localidade: data.localidade, uf: data.uf });
    atualizarHistorico();

  } catch (erro) {
    // Estado: Erro de rede
    statusCep.textContent = "Falha na conexão ou erro ao buscar CEP.";
    statusCep.className = "status erro";
  } finally {
    btnBuscarCep.disabled = false;
  }
}

function atualizarHistorico() {
  listaHistorico.replaceChildren();
  historicoCeps.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.cep} - ${item.logradouro}, ${item.localidade}/${item.uf}`;
    listaHistorico.append(li);
  });
}

btnBuscarCep.addEventListener("click", buscarCep);


// PARTE 3 – TAREFA DE CASA: DESAFIO MINI POKÉDEX

console.log("\n--- PARTE 3 ---");

const btnBuscarPokemon = document.getElementById("btnBuscarPokemon");
const campoPokemon = document.getElementById("nomePokemon");
const statusPokemon = document.getElementById("statusPokemon");
const resultadoPokemon = document.getElementById("resultadoPokemon");

async function buscarPokemon() {
  const nome = campoPokemon.value.trim().toLowerCase();

  if (!nome) {
    statusPokemon.textContent = "Por favor, digite o nome de um Pokémon.";
    statusPokemon.className = "status erro";
    return;
  }

  // Estado: Carregando
  statusPokemon.textContent = "Buscando Pokémon...";
  statusPokemon.className = "status";
  btnBuscarPokemon.disabled = true;
  resultadoPokemon.replaceChildren();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    // Tratamento de erro 404 e erros HTTP
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon não encontrado.");
      }
      throw new Error("Erro ao buscar dados do Pokémon.");
    }

    const data = await response.json();

    // Estado: Sucesso
    statusPokemon.textContent = "";

    const titulo = document.createElement("h3");
    titulo.textContent = data.name.toUpperCase();

    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.alt = data.name;

    const pTipos = document.createElement("p");
    const tipos = data.types.map(t => t.type.name).join(", ");
    pTipos.textContent = `Tipo(s): ${tipos}`;

    resultadoPokemon.append(titulo, img, pTipos);

  } catch (erro) {
    statusPokemon.textContent = erro.message;
    statusPokemon.className = "status erro";
  } finally {
    btnBuscarPokemon.disabled = false;
  }
}

btnBuscarPokemon.addEventListener("click", buscarPokemon);