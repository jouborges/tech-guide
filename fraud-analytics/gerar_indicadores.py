
import json
from pathlib import Path

import pandas as pd

BASE = Path(__file__).resolve().parent
ORIGEM = BASE / "data" / "raw" / "creditcard.csv"
DESTINO = BASE / "frontend" / "data" / "indicadores.json"


def gerar_indicadores():
    if not ORIGEM.is_file():
        raise FileNotFoundError(
            f"Dataset não encontrado: {ORIGEM}"
        )

    df = pd.read_csv(ORIGEM)

    colunas = {"Class", "Amount"}
    if not colunas.issubset(df.columns):
        raise ValueError("Colunas obrigatórias ausentes.")

    if df.empty or df[["Class", "Amount"]].isna().any().any():
        raise ValueError("Dataset vazio ou com valores ausentes.")

    if not df["Class"].isin([0, 1]).all():
        raise ValueError("Valores inesperados na coluna Class.")

    legitimas = df[df["Class"] == 0]
    fraudes = df[df["Class"] == 1]

    resumo = {
        "total_transacoes": int(len(df)),
        "total_fraudes": int(len(fraudes)),
        "total_legitimas": int(len(legitimas)),
        "taxa_fraude": round(
            len(fraudes) / len(df) * 100, 4
        ),
        "valor_medio_legitimas": round(
            legitimas["Amount"].mean(), 2
        ),
        "valor_medio_fraudes": round(
            fraudes["Amount"].mean(), 2
        ),
        "mediana_legitimas": round(
            legitimas["Amount"].median(), 2
        ),
        "mediana_fraudes": round(
            fraudes["Amount"].median(), 2
        ),
        "percentual_baixo_valor": {
            "legitimas": round(
                legitimas["Amount"].le(10).mean() * 100, 2
            ),
            "fraudes": round(
                fraudes["Amount"].le(10).mean() * 100, 2
            )
        }
    }

    DESTINO.parent.mkdir(parents=True, exist_ok=True)

    with DESTINO.open("w", encoding="utf-8") as arquivo:
        json.dump(
            resumo,
            arquivo,
            ensure_ascii=False,
            indent=4
        )

    print("Indicadores gerados com sucesso!")
    print(f"Transações: {resumo['total_transacoes']}")
    print(f"Fraudes: {resumo['total_fraudes']}")
    print(f"Arquivo: {DESTINO}")


if __name__ == "__main__":
    gerar_indicadores()
