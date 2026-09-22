document.addEventListener("DOMContentLoaded", () => { // Aguarda o HTML inteiro ser carregado antes de executar a lógica.

  const target = document.querySelector("#target"); // Obtém a entidade que representa o target rastreado pelo MindAR.
  const status = document.querySelector("#status"); // Obtém o texto de estado exibido no HUD.
  const badge = document.querySelector("#badge"); // Obtém o selo visual do HUD.
  const panel = document.querySelector("#info-panel"); // Obtém o painel de informações.
  const panelTitle = document.querySelector("#info-title"); // Obtém o título do painel.
  const panelText = document.querySelector("#info-text"); // Obtém o texto principal do painel.
  const panelDetail = document.querySelector("#info-detail"); // Obtém o texto complementar do painel.
  const closePanel = document.querySelector("#close-panel"); // Obtém o botão usado para fechar o painel.
  const hotspots = document.querySelectorAll(".clickable"); // Obtém SOMENTE os círculos que possuem geometria e podem receber o raycaster.

  const info = { // Cria um objeto que funciona como uma pequena base de dados local.
    placa: { // Cria os dados associados ao hotspot que possui data-topic="placa".
      title: "Cabeçote e placa", // Define o título apresentado ao tocar no hotspot 1.
      text: "A placa é responsável pela fixação da peça. O cabeçote fornece o movimento de rotação necessário ao processo de torneamento.", // Define a explicação principal.
      detail: "Na prática industrial, a fixação correta da peça é essencial para precisão e segurança." // Define uma observação complementar.
    }, // Encerra os dados do hotspot 1.

    torre: { // Cria os dados associados ao hotspot 2.
      title: "Torre de ferramentas", // Define o título apresentado no painel.
      text: "A torre organiza as ferramentas de corte e permite selecionar a ferramenta adequada para cada etapa do programa CNC.", // Define a explicação principal.
      detail: "Em tornos CNC, a troca de posição da torre pode fazer parte da sequência automática de usinagem." // Define uma observação complementar.
    }, // Encerra os dados do hotspot 2.

    comando: { // Cria os dados associados ao hotspot 3.
      title: "Painel de comando CNC", // Define o título apresentado no painel.
      text: "O painel é a interface entre operador, programa e sistema de controle da máquina.", // Define a explicação principal.
      detail: "Nesta atividade, os dados exibidos são didáticos; procedimentos reais dependem do modelo e do fabricante." // Define uma observação complementar.
    }, // Encerra os dados do hotspot 3.

    seguranca: { // Cria os dados associados ao hotspot 4.
      title: "Proteção e segurança", // Define o título apresentado no painel.
      text: "Portas, proteções e intertravamentos ajudam a separar o operador da região de usinagem e de partes em movimento.", // Define a explicação principal.
      detail: "A aplicação de RA não substitui treinamento, documentação do fabricante ou procedimentos de segurança." // Define uma observação complementar.
    } // Encerra os dados do hotspot 4.
  }; // Encerra a base de dados local.

  function showInfo(topicName) { // Cria uma função reutilizável para abrir o painel com o tópico escolhido.
    const selected = info[topicName]; // Procura no objeto info os dados correspondentes ao nome recebido.

    if (!selected) return; // Interrompe a função caso o tópico não exista.

    panelTitle.textContent = selected.title; // Coloca o título do tópico dentro do painel.
    panelText.textContent = selected.text; // Coloca a explicação principal dentro do painel.
    panelDetail.textContent = selected.detail; // Coloca a observação complementar dentro do painel.
    panel.classList.remove("hidden"); // Remove a classe hidden para tornar o painel visível.
    document.body.classList.add("panel-open"); // Marca que o painel está aberto para o CSS esconder a dica inferior.
  } // Encerra a função showInfo.

  function hideInfo() { // Cria uma função reutilizável para fechar o painel.
    panel.classList.add("hidden"); // Adiciona a classe hidden e esconde o painel.
    document.body.classList.remove("panel-open"); // Remove o estado visual de painel aberto.
  } // Encerra a função hideInfo.

  hotspots.forEach((hotspot) => { // Percorre cada círculo clicável encontrado na cena.
    hotspot.addEventListener("click", (event) => { // Escuta o evento click produzido pelo cursor/raycaster do A-Frame.
      event.stopPropagation(); // Evita que o evento seja propagado desnecessariamente para outros elementos.
      const topicName = hotspot.dataset.topic; // Lê o valor de data-topic do círculo tocado.
      showInfo(topicName); // Chama a função que abre o painel com as informações correspondentes.
    }); // Encerra o tratamento do clique deste hotspot.
  }); // Encerra a configuração de todos os hotspots.

  closePanel.addEventListener("click", () => { // Escuta o toque/clique no botão X.
    hideInfo(); // Fecha o painel de informações.
  }); // Encerra o evento do botão X.

  target.addEventListener("targetFound", () => { // É executado quando o MindAR reconhece e passa a rastrear a imagem.
    status.textContent = "Torno reconhecido. Toque em um dos círculos numerados."; // Atualiza a orientação ao usuário.
    badge.textContent = "● RA ATIVA"; // Informa visualmente que o tracking está ativo.
    badge.style.color = "#86efac"; // Deixa o texto do selo em verde claro.
  }); // Encerra o evento targetFound.

  target.addEventListener("targetLost", () => { // É executado quando o MindAR deixa de rastrear a imagem.
    status.textContent = "Alvo perdido. Aponte novamente para a imagem do torno."; // Orienta o usuário a reenquadrar o target.
    badge.textContent = "PROCURANDO ALVO"; // Volta o selo ao estado de procura.
    badge.style.color = "#ffffff"; // Retorna a cor do selo para branco.
    hideInfo(); // Fecha o painel para não deixar informação flutuando sem o target.
  }); // Encerra o evento targetLost.

  const scene = document.querySelector("#ar-scene"); // Obtém a cena para acompanhar sua inicialização.

  scene.addEventListener("arReady", () => { // É executado quando o MindAR informa que a experiência está pronta.
    status.textContent = "Câmera pronta. Aponte para a imagem impressa do torno."; // Atualiza a instrução.
    badge.textContent = "PROCURANDO ALVO"; // Informa que agora a aplicação está procurando a imagem.
  }); // Encerra o evento arReady.

}); // Encerra o evento DOMContentLoaded.
