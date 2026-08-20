#!/usr/bin/env python3
"""Recorta a imagem no objeto principal e aplica margem uniforme de fundo.

Diferente de `magick -trim`, ignora elementos secundários que estejam acima ou
abaixo do objeto (seletores, legendas, marca d'água): agrupa as linhas com
conteúdo em faixas contínuas e fica só com a maior faixa.

Uso:
    recorte-objeto.py entrada.png saida.png [--margem 38] [--fundo 255,255,255]
                      [--escala 2] [--tolerancia 3] [--vao 3]

--escala N   trata a entrada como captura em N× : a margem é multiplicada por N
             no recorte e a saída é reduzida para 1× no final.
"""
import argparse
import os
import sys

from PIL import Image, ImageChops


def parse_cor(txt):
    partes = [int(v) for v in txt.split(",")]
    if len(partes) != 3:
        raise argparse.ArgumentTypeError("cor deve ser R,G,B")
    return tuple(partes)


def mascara_conteudo(img, fundo, tolerancia):
    """Branco onde há conteúdo, preto onde é fundo."""
    diff = ImageChops.difference(img, Image.new("RGB", img.size, fundo)).convert("L")
    return diff.point(lambda v: 255 if v > tolerancia else 0)


def bbox_objeto(img, fundo, tolerancia, vao):
    """Bbox da maior faixa horizontal contínua de conteúdo."""
    mask = mascara_conteudo(img, fundo, tolerancia)
    if mask.getbbox() is None:
        return None

    largura, altura = mask.size
    linhas = [mask.crop((0, y, largura, y + 1)).getbbox() is not None for y in range(altura)]

    faixas = []
    y = 0
    while y < altura:
        if linhas[y]:
            inicio = y
            while y + 1 < altura and linhas[y + 1]:
                y += 1
            faixas.append([inicio, y])
        y += 1

    unidas = []
    for faixa in faixas:
        if unidas and faixa[0] - unidas[-1][1] <= vao:
            unidas[-1][1] = faixa[1]
        else:
            unidas.append(faixa)

    topo, base = max(unidas, key=lambda f: f[1] - f[0])
    dentro = mask.crop((0, topo, largura, base + 1)).getbbox()
    return dentro[0], topo + dentro[1], dentro[2], topo + dentro[3]


def recortar(entrada, saida, margem, fundo, escala, tolerancia, vao):
    img = Image.open(entrada).convert("RGBA")
    achatada = Image.new("RGB", img.size, fundo)
    achatada.paste(img, mask=img.split()[3])

    caixa = bbox_objeto(achatada, fundo, tolerancia, vao * escala)
    if caixa is None:
        return False, "imagem sem conteúdo"

    pad = margem * escala
    objeto = achatada.crop(caixa)
    out = Image.new("RGB", (objeto.width + 2 * pad, objeto.height + 2 * pad), fundo)
    out.paste(objeto, (pad, pad))
    if escala != 1:
        out = out.resize((out.width // escala, out.height // escala), Image.LANCZOS)

    destino = os.path.dirname(os.path.abspath(saida))
    if destino:
        os.makedirs(destino, exist_ok=True)
    out.convert("RGBA").save(saida)
    return True, f"{out.width}x{out.height}"


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada")
    ap.add_argument("saida")
    ap.add_argument("--margem", type=int, default=38, help="margem em px na saída (38 = 1 cm)")
    ap.add_argument("--fundo", type=parse_cor, default=(255, 255, 255), help="cor de fundo R,G,B")
    ap.add_argument("--escala", type=int, default=1, help="fator de captura da entrada")
    ap.add_argument("--tolerancia", type=int, default=3, help="desvio do fundo que ainda é fundo")
    ap.add_argument("--vao", type=int, default=3, help="vão em px que ainda une duas faixas")
    args = ap.parse_args()

    ok, nota = recortar(args.entrada, args.saida, args.margem, args.fundo,
                        args.escala, args.tolerancia, args.vao)
    print(("OK  " if ok else "FALHA "), args.saida, nota)
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
