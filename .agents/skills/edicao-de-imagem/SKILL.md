---
name: edicao-de-imagem
description: Use when editing, retouching, cropping, converting, optimizing, upscaling or removing backgrounds from images — product photos, store assets, screenshots, any raster work. Teaches the full local CLI toolchain (ImageMagick, G'MIC, rembg, Real-ESRGAN, libvips, GIMP/Blender headless), how to install it from scratch, the recipes for each task, and the verification loop that keeps results correct. Portable across agents and machines.
---

# Edição de imagem — nível profissional, linha de comando

Toolchain 100% local e livre. Nenhuma etapa depende de serviço pago ou nuvem.
Feita pra rodar em qualquer agente (Claude Code, Cursor, Codex, etc.) em Linux.

## Regras que não se negociam

1. **Nunca sobrescreva o original.** Trabalhe em cópia; o original é a única fonte de reversão.
2. **Nunca reencode JPEG duas vezes.** Toda cadeia intermediária é PNG, TIFF 16 bits ou MPC. Só o export final vira JPEG/WebP/AVIF.
3. **Trabalhe em 16 bits.** ImageMagick com build `Q16-HDRI`: use `-depth 16` nos passos intermediários, reduza para 8 bits só no export. Evita banding em degradê e sombra. Confira o build com `magick -version` (tem que aparecer `Q16-HDRI`).
4. **Confira olhando.** Toda edição termina com a imagem aberta (ferramenta Read, ou `xdg-open`) e, quando o requisito é métrico (margem, alinhamento, cor), com medição em Pillow/numpy. Alegar "ficou bom" sem abrir o arquivo não vale.
5. **Meça, não estime.** Margem, bounding box, contraste e cor se conferem por número, não por impressão.

## Instalação (do zero)

Detecte o gerenciador e instale só o necessário. Não instale app de GUI (GIMP janela, Krita): não ajudam automação — só CLI/API ajuda.

### Arch / CachyOS (pacman)

```bash
# núcleo — cobre 90% do trabalho
sudo pacman -S --needed imagemagick libvips gmic ffmpeg python-pillow \
                        oxipng pngquant inkscape
# opcionais pesados: revelação RAW, compositor 3D headless, visão computacional
sudo pacman -S --needed darktable blender python-opencv
```

### Debian / Ubuntu (apt)

```bash
sudo apt install imagemagick libvips-tools gmic ffmpeg python3-pil \
                 oxipng pngquant inkscape
```

### Remoção de fundo por IA (rembg) — sem sudo, espaço de usuário

```bash
# via uv (recomendado; não polui o Python do sistema)
uv tool install "rembg[cli,cpu]"        # CPU: funciona em qualquer máquina
# GPU NVIDIA: uv tool install "rembg[cli,gpu]"
# 1º uso baixa o modelo (~5 MB) para ~/.u2net/ automaticamente
```

Sem `uv`? `pipx install "rembg[cli,cpu]"` ou `python -m venv ~/.venvs/rembg && ~/.venvs/rembg/bin/pip install "rembg[cli,cpu]"`.

### Upscale por IA (Real-ESRGAN) — Vulkan, roda até em GPU de 4 GB

```bash
# Arch (AUR): paru -S realesrgan-ncnn-vulkan-bin
# genérico: baixe o binário ncnn-vulkan do release oficial e ponha no PATH
```

### Verificar o que está pronto

```bash
for c in magick vips gmic ffmpeg rembg realesrgan-ncnn-vulkan inkscape oxipng pngquant; do
  command -v "$c" >/dev/null && echo "OK   $c" || echo "FALTA $c"
done
python3 -c "import PIL,sys;print('OK   pillow',PIL.__version__)"
magick -version | grep -q Q16-HDRI && echo "OK   ImageMagick Q16-HDRI (16 bits)" || echo "AVISO ImageMagick não é HDRI"
```

## Escolha da ferramenta

| Tarefa | Ferramenta | Por quê |
|---|---|---|
| Recorte, escala, composição, cor, texto, máscara por regra | `magick` (ImageMagick 7) | Cobre 90% do trabalho em um comando |
| Lote grande (centenas+) ou imagem enorme | `vips` / `vipsthumbnail` | 5–10× mais rápido, RAM constante |
| Denoise, inpaint, separação de frequência, estilização | `gmic` | Filtros que o ImageMagick não tem |
| Remover fundo de foto real | `rembg` | Segmentação neural; regra de cor não pega cabelo, vidro, sombra |
| Ampliar sem borrar | `realesrgan-ncnn-vulkan` | Upscale 2–4× preservando textura; roda em Vulkan |
| Sombra realista, mockup 3D, composição por nós | `blender -b -P script.py` | Compositor de produção, headless |
| Vetor, logo, SVG → PNG em qualquer escala | `inkscape --export-*` | Vetor não perde nitidez em nenhum tamanho |
| Lógica condicional demais para shell | Python + Pillow/numpy/OpenCV | Decisão por pixel, medição, alinhamento |
| Enxugar peso final | `oxipng`, `pngquant`, `cwebp`, `avifenc` | 40–70% menos peso sem mudança visível |

**Não instale** `openimageio`/`opencolorio` se o ImageMagick já for `Q16-HDRI`: seria redundante. **Não use MCP pago** (fal.ai, Gemini, Replicate) a menos que peçam edição por instrução acima do que a GPU local aguenta — cobra por imagem e não adiciona técnica nova, só um modelo remoto.

## Receitas

### Recorte no objeto com margem exata

Recorta no conteúdo e adiciona margem uniforme. Padrão da loja: 38 px = 1 cm @ 96 dpi.

```bash
magick entrada.png -bordercolor white -border 1 \
  -fuzz 1% -trim +repage \
  -bordercolor white -border 38 saida.png
```

Quando o print traz elementos extras (seletores de cor, legenda) **abaixo** do objeto, `-trim` pega tudo junto. Nesse caso use o script incluído, que fica só com a maior faixa contínua de conteúdo:

```bash
# entrada capturada em 2× (retina) → margem 38 px, saída reduzida a 1×
scripts/recorte-objeto.py entrada.png saida.png --escala 2 --margem 38
scripts/recorte-objeto.py --help          # todas as opções
```

### Remover fundo e recompor

```bash
rembg i -m isnet-general-use entrada.jpg recorte.png          # alpha transparente
rembg i -m u2netp entrada.jpg recorte.png                     # modelo leve/rápido
magick recorte.png -background white -alpha remove -alpha off fundo-branco.png
```

Sombra de produto crível (contato + difusa), sem plugin:

```bash
magick recorte.png \( +clone -background black -shadow 60x12+0+14 \) \
  +swap -background none -layers merge +repage \
  -background white -alpha remove -alpha off com-sombra.png
```

### Ampliar para telas retina

```bash
realesrgan-ncnn-vulkan -i in.png -o 4x.png -s 4 -n realesrgan-x4plus
magick 4x.png -filter Lanczos -resize 50% -unsharp 0x0.75+0.75+0.008 out@2x.png
```

Ampliar em 4× e reduzir para 2× dá borda mais limpa que ampliar direto em 2×.

### Correção de tom e cor

```bash
magick foto.jpg -colorspace LAB -channel R -auto-level +channel -colorspace sRGB tom.png
gmic foto.jpg fx_normalize_local 4,10,8,10,1,0 -o corrigida.png    # equilíbrio local
gmic foto.jpg denoise_haar 2 -o limpa.png                          # denoise
```

`-auto-level` no canal L do LAB corrige contraste **sem torcer a matiz** — em RGB ele desloca a cor.

### Export para web

```bash
magick out.png -strip -quality 82 -define webp:method=6 out.webp
magick out.png -strip -quality 55 out.avif
oxipng -o max --strip safe out.png                    # PNG sem perda
pngquant --quality 70-92 --skip-if-larger out.png     # PNG com perda controlada
```

Ordem: edite em PNG 16 bits → só no fim gere WebP/AVIF/PNG otimizado.

### Lote

```bash
magick mogrify -path saida/ -format webp -quality 82 -resize 1200x entrada/*.png
find entrada -name '*.png' | parallel -j"$(nproc)" vipsthumbnail {} --size 1200 -o saida/%s.webp
```

## Verificação antes de declarar pronto

1. Abrir a saída e olhar. Sempre.
2. Medir o que foi pedido:

```python
from PIL import Image, ImageChops
im = Image.open(caminho).convert("RGB")
diff = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255)))
print(im.size, diff.convert("L").point(lambda v: 255 if v > 3 else 0).getbbox())
# bbox contra (0,0,W,H): confirma a margem em cada lado
```

3. Em lote, montar folha de contato e olhar de uma vez:

```bash
magick montage saida/*.png -tile 6x -geometry +6+6 -background '#ddd' contato.png
```

4. Relatar o número, não o adjetivo: "margem 38 px nos 4 lados em 118/118", não "ficou certo".

## Convenções desta loja de iPhone

`imagens/<geração>/<modelo>/<cor>.png` na raiz do projeto.

- Geração: `11`…`17`. Modelo: `i17` (base), `I17pro`, `I17promax`, `I17e`, `I14plus`, `I12mini`, `Iair`.
- Cor: rótulo em pt-BR, minúsculo, sem acento, hífen no lugar de espaço (`laranja-cosmico`, `titanio-branco`, `productred`).
- Enquadramento: aparelho inteiro, nunca cortado, com 1 cm (38 px) de branco puro em volta e nada mais.
- Origem: `https://www.apple.com/br/iphone/compare/`, capturado com Playwright (dropdown de modelo → clica cada bolinha de cor → print da galeria com folga → `recorte-objeto.py --escala 2`).
