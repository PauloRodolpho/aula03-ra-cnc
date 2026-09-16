// Cria o conjunto de conteúdos associados aos quatro hotspots 3D.
const topics = { // Inicia o objeto que funciona como uma pequena base de dados local.
  cabecote: { // Define o conteúdo do hotspot 1.
    title: "Cabeçote e placa", // Define o título apresentado no painel.
    text: "A placa fixa e centraliza a peça que será usinada. O cabeçote fornece o movimento de rotação ao conjunto.", // Explica a função geral do componente.
    detail: "Observe, na imagem, a região de fixação da peça e sua relação com o eixo de rotação. A aplicação é didática e não substitui procedimentos reais de operação." // Acrescenta contexto seguro para a aula.
  }, // Encerra o tópico do cabeçote.
  torre: { // Define o conteúdo do hotspot 2.
    title: "Torre de ferramentas", // Define o título apresentado no painel.
    text: "A torre reúne diferentes ferramentas de corte e permite selecionar a ferramenta necessária conforme a sequência programada de usinagem.", // Explica a função geral da torre.
    detail: "Neste exemplo, o hotspot serve para relacionar uma região física da máquina a uma informação digital ancorada ao target." // Relaciona o componente ao conceito de RA.
  }, // Encerra o tópico da torre.
  comando: { // Define o conteúdo do hotspot 3.
    title: "Comando CNC", // Define o título apresentado no painel.
    text: "O comando CNC funciona como interface entre o programa, o operador e os sistemas de controle da máquina.", // Explica a função geral do comando.
    detail: "Nesta aula, o painel é apenas um ponto de informação em RA. Nenhum procedimento real de operação da máquina é ensinado por esta aplicação." // Mantém o caráter didático.
  }, // Encerra o tópico do comando.
  seguranca: { // Define o conteúdo do hotspot 4.
    title: "Segurança e proteção", // Define o título apresentado no painel.
    text: "Máquinas CNC utilizam proteções, intertravamentos e dispositivos de parada para reduzir riscos durante a operação.", // Explica o papel geral dos recursos de segurança.
    detail: "Em situações reais, devem ser seguidos o manual do fabricante, as normas aplicáveis e os procedimentos de segurança da instituição." // Evita transformar o material em instrução operacional.
  } // Encerra o tópico de segurança.
}; // Encerra o objeto de conteúdos.

// Aguarda o HTML terminar de ser montado antes de localizar e configurar os elementos.
window.addEventListener("DOMContentLoaded", () => { // Executa a configuração inicial assim que o DOM estiver disponível.
  const scene = document.querySelector("#ar-scene"); // Localiza a cena A-Frame/MindAR.
  const target = document.querySelector("#target"); // Localiza o grupo que fica ancorado ao target.
  const statusText = document.querySelector("#status"); // Localiza a mensagem de estado do HUD.
  const badge = document.querySelector("#badge"); // Localiza o selo de estado do HUD.
  const panel = document.querySelector("#panel"); // Localiza o painel informativo HTML.
  const panelTitle = document.querySelector("#panel-title"); // Localiza o título do painel.
  const panelText = document.querySelector("#panel-text"); // Localiza o texto principal do painel.
  const panelDetail = document.querySelector("#panel-detail"); // Localiza o detalhe complementar do painel.
  const closePanelButton = document.querySelector("#close-panel"); // Localiza o botão X.
  const hotspots = document.querySelectorAll(".hotspot3d"); // Localiza os quatro objetos 3D interativos.

  function openTopic(topicName) { // Cria uma função reutilizável para abrir qualquer tópico.
    const topic = topics[topicName]; // Procura os dados pelo nome armazenado em data-topic.
    if (!topic) return; // Encerra a função caso o nome não exista.
    panelTitle.textContent = topic.title; // Coloca o título correto no painel.
    panelText.textContent = topic.text; // Coloca a explicação correta no painel.
    panelDetail.textContent = topic.detail; // Coloca o detalhe correto no painel.
    panel.classList.remove("hidden"); // Torna o painel visível.
  } // Encerra a função openTopic.

  function closePanel() { // Cria uma função específica para fechar o painel.
    panel.classList.add("hidden"); // Adiciona hidden e esconde o painel.
  } // Encerra a função closePanel.

  hotspots.forEach((hotspot) => { // Percorre todos os hotspots 3D.
    hotspot.addEventListener("click", () => { // Escuta o evento click gerado pelo cursor/raycaster do A-Frame; no celular ele também responde ao toque.
      openTopic(hotspot.dataset.topic); // Lê data-topic do objeto 3D e abre o conteúdo correspondente.
    }); // Encerra o evento de clique do hotspot atual.
    hotspot.addEventListener("mouseenter", () => { // Escuta quando o raycaster entra no hotspot.
      hotspot.setAttribute("scale", "1.18 1.18 1.18"); // Aumenta o hotspot para fornecer feedback visual.
    }); // Encerra o evento mouseenter.
    hotspot.addEventListener("mouseleave", () => { // Escuta quando o raycaster deixa o hotspot.
      hotspot.setAttribute("scale", "1 1 1"); // Retorna o hotspot ao tamanho normal.
    }); // Encerra o evento mouseleave.
  }); // Encerra a configuração de todos os hotspots.

  closePanelButton.addEventListener("pointerup", closePanel); // Fecha o painel por mouse, caneta ou toque.

  target.addEventListener("targetFound", () => { // MindAR dispara este evento quando a imagem impressa entra em tracking.
    statusText.textContent = "Torno reconhecido. Toque em um círculo numerado sobre a máquina."; // Orienta a interação seguinte.
    badge.textContent = "● RA ATIVA"; // Informa que o target está sendo rastreado.
    badge.style.color = "#86efac"; // Destaca o estado ativo em verde claro.
  }); // Encerra o tratamento de targetFound.

  target.addEventListener("targetLost", () => { // MindAR dispara este evento quando deixa de rastrear a imagem.
    closePanel(); // Fecha o painel para não deixar informação desconectada do alvo.
    statusText.textContent = "Target perdido. Enquadre novamente a imagem impressa do torno."; // Orienta a recuperação do tracking.
    badge.textContent = "PROCURANDO ALVO"; // Atualiza o selo.
    badge.style.color = "#f8fafc"; // Retorna a cor padrão.
  }); // Encerra o tratamento de targetLost.

  scene.addEventListener("arReady", () => { // MindAR dispara arReady quando a câmera e o mecanismo de RA estão prontos.
    statusText.textContent = "Câmera pronta. Aponte para a imagem impressa do torno CNC."; // Informa que a câmera já pode ser usada.
    badge.textContent = "PROCURANDO ALVO"; // Mostra que o sistema está procurando o target.
  }); // Encerra o tratamento de arReady.

  scene.addEventListener("arError", () => { // MindAR pode disparar arError quando há falha de câmera/permissão/inicialização.
    statusText.textContent = "Não foi possível iniciar a câmera. Verifique a permissão do navegador e recarregue a página."; // Dá uma orientação direta de diagnóstico.
    badge.textContent = "ERRO DE CÂMERA"; // Exibe o estado de erro.
    badge.style.color = "#fca5a5"; // Destaca o erro em vermelho claro.
  }); // Encerra o tratamento de arError.
}); // Encerra a configuração inicial da aplicação.
