// Cria um objeto com os conteúdos que serão exibidos para cada hotspot.
const topics = { // Inicia o conjunto de dados da aplicação.
  cabecote: { // Define os dados associados ao hotspot do cabeçote.
    title: "Cabeçote e placa", // Define o título apresentado ao usuário.
    text: "A placa fixa e centraliza a peça que será usinada. O cabeçote fornece o movimento de rotação ao conjunto.", // Explica a função do componente.
    detail: "Na demonstração didática, observe a relação entre fixação da peça, rotação e segurança antes da usinagem." // Acrescenta uma observação técnica sem instruir operação real.
  }, // Encerra os dados do cabeçote.
  torre: { // Define os dados associados ao hotspot da torre.
    title: "Torre de ferramentas", // Define o título apresentado ao usuário.
    text: "A torre organiza diferentes ferramentas de corte e permite selecionar a ferramenta necessária durante o programa CNC.", // Explica a função do componente.
    detail: "Em um programa CNC, a troca de ferramenta está relacionada à sequência planejada de operações de usinagem." // Relaciona o componente ao software CNC.
  }, // Encerra os dados da torre.
  comando: { // Define os dados associados ao hotspot do comando.
    title: "Comando CNC", // Define o título apresentado ao usuário.
    text: "O comando CNC é a interface entre o programa, o operador e os sistemas de controle da máquina.", // Explica a função do painel.
    detail: "Nesta aula, o painel é usado como exemplo de interface homem-máquina. Nenhum comando real de operação deve ser executado a partir deste material." // Mantém o caráter seguro e didático da atividade.
  }, // Encerra os dados do comando.
  seguranca: { // Define os dados associados ao hotspot de segurança.
    title: "Segurança", // Define o título apresentado ao usuário.
    text: "Máquinas CNC possuem proteções, intertravamentos e dispositivos de parada destinados a reduzir riscos durante a operação.", // Explica o papel geral dos recursos de segurança.
    detail: "Esta aplicação é somente educacional. Procedimentos reais devem seguir o manual do fabricante, normas aplicáveis e orientações de segurança da instituição." // Evita transformar a demonstração em procedimento operacional.
  } // Encerra os dados de segurança.
}; // Encerra o objeto com todos os conteúdos.

// Localiza o elemento A-Frame que representa o target reconhecido pelo MindAR.
const target = document.querySelector("#target"); // Guarda a referência do target para ouvir eventos de tracking.
// Localiza a camada HTML que contém os hotspots clicáveis.
const interfaceLayer = document.querySelector("#interface"); // Guarda a camada para mostrar ou esconder os pontos.
// Localiza o texto que informa o estado atual da aplicação.
const statusText = document.querySelector("#status"); // Guarda o texto de status para atualizações.
// Localiza o selo visual de estado do tracking.
const badge = document.querySelector("#badge"); // Guarda o selo para trocar sua mensagem.
// Localiza o painel que exibirá as informações dos componentes.
const panel = document.querySelector("#panel"); // Guarda a referência do painel informativo.
// Localiza o título existente dentro do painel.
const panelTitle = document.querySelector("#panel-title"); // Guarda o campo de título para preenchimento dinâmico.
// Localiza o texto principal existente dentro do painel.
const panelText = document.querySelector("#panel-text"); // Guarda o campo de texto para preenchimento dinâmico.
// Localiza a área de detalhe técnico existente dentro do painel.
const panelDetail = document.querySelector("#panel-detail"); // Guarda o campo complementar para preenchimento dinâmico.
// Localiza o botão responsável por fechar o painel.
const closePanelButton = document.querySelector("#close-panel"); // Guarda o botão de fechamento para registrar o evento.

// Cria uma função responsável por abrir o painel de um determinado assunto.
function openTopic(topicName) { // Recebe o nome do assunto selecionado pelo usuário.
  const topic = topics[topicName]; // Procura no objeto de dados o conteúdo correspondente ao hotspot tocado.
  if (!topic) return; // Interrompe a função caso o assunto informado não exista.
  panelTitle.textContent = topic.title; // Coloca o título do componente no painel.
  panelText.textContent = topic.text; // Coloca a explicação principal no painel.
  panelDetail.textContent = topic.detail; // Coloca a informação complementar no painel.
  panel.classList.remove("hidden"); // Torna o painel visível na tela.
} // Encerra a função de abertura do painel.

// Cria uma função responsável por fechar o painel informativo.
function closePanel() { // Inicia a rotina de fechamento.
  panel.classList.add("hidden"); // Esconde o painel da interface.
} // Encerra a função de fechamento.

// Percorre todos os elementos HTML que possuem o atributo data-topic.
document.querySelectorAll("[data-topic]").forEach((button) => { // Obtém cada hotspot existente na página.
  button.addEventListener("pointerup", () => { // Escuta mouse, caneta ou toque de forma unificada e confiável no celular.
    openTopic(button.dataset.topic); // Abre o conteúdo associado ao hotspot selecionado.
  }); // Encerra o registro do evento do hotspot atual.
}); // Encerra a configuração de todos os hotspots.

// Registra o evento de toque no botão de fechar.
closePanelButton.addEventListener("pointerup", closePanel); // Fecha o painel quando o usuário toca no botão X.

// Escuta o evento emitido pelo MindAR quando a imagem é reconhecida e rastreada.
target.addEventListener("targetFound", () => { // Executa esta rotina quando o target entra em tracking.
  interfaceLayer.classList.remove("hidden"); // Exibe os hotspots sobre a imagem da máquina.
  statusText.textContent = "Máquina reconhecida. Toque em um dos pontos numerados."; // Orienta o próximo passo do usuário.
  badge.textContent = "● RA ATIVA"; // Informa visualmente que o tracking está ativo.
  badge.style.color = "#86efac"; // Destaca o estado ativo com uma cor verde clara.
}); // Encerra o tratamento do evento targetFound.

// Escuta o evento emitido pelo MindAR quando a imagem deixa de ser rastreada.
target.addEventListener("targetLost", () => { // Executa esta rotina quando o target sai do campo de rastreamento.
  interfaceLayer.classList.add("hidden"); // Esconde os hotspots enquanto a imagem não está sendo rastreada.
  panel.classList.add("hidden"); // Fecha o painel para evitar informação desconectada do alvo.
  statusText.textContent = "Target perdido. Aponte novamente para a imagem da máquina."; // Orienta o usuário a recuperar o tracking.
  badge.textContent = "AGUARDANDO ALVO"; // Retorna o selo ao estado inicial.
  badge.style.color = "#f8fafc"; // Retorna a cor do selo ao padrão claro.
}); // Encerra o tratamento do evento targetLost.
