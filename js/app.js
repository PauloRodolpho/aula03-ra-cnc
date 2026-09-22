document.addEventListener("DOMContentLoaded",()=>{
const scene=document.querySelector("#ar-scene"),target=document.querySelector("#target"),cameraEl=document.querySelector("#ar-camera");
const status=document.querySelector("#status"),badge=document.querySelector("#badge"),panel=document.querySelector("#info-panel");
const title=document.querySelector("#info-title"),text=document.querySelector("#info-text"),detail=document.querySelector("#info-detail"),close=document.querySelector("#close-panel");
const hotspots=[...document.querySelectorAll(".hotspot")];let tracking=false;
const info={
placa:{title:"Cabeçote e placa",text:"A placa fixa a peça e o cabeçote fornece o movimento de rotação necessário ao torneamento.",detail:"A fixação correta é essencial para precisão e segurança."},
torre:{title:"Torre de ferramentas",text:"A torre organiza as ferramentas de corte e permite selecionar a ferramenta de cada etapa do programa CNC.",detail:"A indexação pode integrar a sequência automática de usinagem."},
comando:{title:"Painel de comando CNC",text:"É a interface entre operador, programa CNC e sistema de controle da máquina.",detail:"Os dados desta experiência são didáticos."},
seguranca:{title:"Proteção e segurança",text:"Portas, proteções e intertravamentos ajudam a separar o operador da região de usinagem.",detail:"A RA não substitui treinamento nem documentação do fabricante."}};
function showInfo(k){const d=info[k];if(!d)return;title.textContent=d.title;text.textContent=d.text;detail.textContent=d.detail;panel.classList.remove("hidden")}
function hideInfo(){panel.classList.add("hidden")}
hotspots.forEach(b=>b.addEventListener("pointerup",e=>{e.preventDefault();e.stopPropagation();showInfo(b.dataset.topic)}));
close.addEventListener("pointerup",e=>{e.preventDefault();hideInfo()});
scene.addEventListener("arReady",()=>{status.textContent="Câmera pronta. Aponte para a imagem do torno.";badge.textContent="PROCURANDO ALVO"});
scene.addEventListener("arError",()=>{status.textContent="Não foi possível iniciar a câmera.";badge.textContent="ERRO"});
target.addEventListener("targetFound",()=>{tracking=true;status.textContent="Torno reconhecido. Toque em um ponto numerado.";badge.textContent="● RA ATIVA";hotspots.forEach(b=>b.classList.add("visible"))});
target.addEventListener("targetLost",()=>{tracking=false;status.textContent="Alvo perdido. Aponte novamente para a imagem.";badge.textContent="PROCURANDO ALVO";hotspots.forEach(b=>b.classList.remove("visible"));hideInfo()});
function update(){requestAnimationFrame(update);if(!tracking)return;const camera=cameraEl.getObject3D("camera");if(!camera||!target.object3D)return;target.object3D.updateMatrixWorld(true);camera.updateMatrixWorld(true);
hotspots.forEach(b=>{const local=new THREE.Vector3(+b.dataset.x,+b.dataset.y,+b.dataset.z);const world=target.object3D.localToWorld(local);const p=world.clone().project(camera);const x=(p.x*.5+.5)*innerWidth,y=(-p.y*.5+.5)*innerHeight;b.style.left=`${x}px`;b.style.top=`${y}px`;b.style.visibility=(p.z>-1&&p.z<1&&x>-80&&x<innerWidth+80&&y>-80&&y<innerHeight+80)?"visible":"hidden"})}
update();
});
