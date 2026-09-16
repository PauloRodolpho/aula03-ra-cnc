# Aula 03 — Manual Interativo em Realidade Aumentada

Versão 2 do projeto didático. Nesta versão, os hotspots são **objetos A-Frame ancorados ao target**. Eles acompanham posição, escala e perspectiva da imagem impressa enquanto o MindAR mantém o tracking.

## Estrutura

```text
aula03_ra_cnc_v2/
├── index.html
├── css/style.css
├── js/app.js
└── assets/
    ├── images/torno-cnc-target.png
    └── targets/torno-cnc.mind
```

## Antes de publicar

1. Confirme que `assets/targets/torno-cnc.mind` foi gerado a partir de **exatamente** `assets/images/torno-cnc-target.png`.
2. Imprima a mesma imagem usada na compilação.
3. Envie a estrutura completa ao GitHub.
4. Em **Settings > Pages**, use `Deploy from a branch`, branch `main`, pasta `/(root)`.
5. Abra o endereço do GitHub Pages no celular e autorize a câmera.

## Teste esperado

1. A câmera ao vivo deve aparecer como fundo da página.
2. Antes de reconhecer a folha, nenhum hotspot 3D aparece.
3. Ao reconhecer o torno impresso, aparecem quatro círculos numerados presos à imagem.
4. Ao mover/inclinar a folha, os círculos acompanham o target.
5. Ao tocar em um círculo, abre um painel HTML com a informação correspondente.
6. Ao retirar o target da câmera, os hotspots somem com o próprio grupo rastreado.

## Observação sobre o arquivo .mind

O arquivo incluído nesta pasta foi copiado de um `.mind` disponível no ambiente de trabalho. Antes de usar em aula, valide que ele foi compilado a partir da imagem `torno-cnc-target.png`. Se houver dúvida, recompile a imagem no compilador oficial do MindAR e substitua `assets/targets/torno-cnc.mind`.
