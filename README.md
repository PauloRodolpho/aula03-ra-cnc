# Aula — RA: Manual Interativo do Torno CNC

## Objetivo
Apontar o celular para a imagem impressa do torno CNC. Quando o MindAR reconhecer o target, quatro hotspots 3D aparecem ancorados à imagem. O toque em cada círculo abre um painel com informações.

## Correção importante desta versão
O elemento que recebe `class="clickable"` é o próprio `<a-circle>`, que possui geometria. Assim, o raycaster do A-Frame consegue intersectar a superfície e gerar o evento `click`. Na versão anterior, a classe estava no elemento-pai `<a-entity>`, que não possuía geometria própria, o que tornava a interação inconsistente.

## Estrutura
- `index.html`
- `css/style.css`
- `js/app.js`
- `assets/images/torno-cnc-target.png`
- `assets/targets/torno-cnc.mind` **(deve ser gerado no compilador MindAR usando exatamente a imagem acima)**

## PASSO OBRIGATÓRIO — gerar torno-cnc.mind
1. Abra o compilador oficial: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. Selecione `assets/images/torno-cnc-target.png`.
3. Compile a imagem.
4. Baixe o arquivo `.mind`.
5. Renomeie para `torno-cnc.mind`.
6. Coloque em `assets/targets/torno-cnc.mind`.
7. Não use um `.mind` de outra imagem.

## Publicação
Publique no GitHub Pages com `main` + `/(root)`. O site precisa ser servido por HTTPS para a câmera funcionar corretamente.

## Teste
1. Abra o site no celular.
2. Autorize a câmera.
3. Aguarde `PROCURANDO ALVO`.
4. Aponte para a imagem impressa.
5. Aguarde `● RA ATIVA`.
6. Toque diretamente no círculo 1, 2, 3 ou 4.
7. O painel correspondente deve abrir.

## Observação
Os textos e informações do torno são didáticos. Para operação real, utilize documentação e procedimentos do fabricante.
