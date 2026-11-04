from pathlib import Path
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import average_precision_score

raiz = Path(__file__).resolve().parent

df = pd.read_csv(raiz / "data" / "raw" / "creditcard.csv")
ranking = pd.read_csv(
    raiz / "docs" / "importancia_variaveis_rf.csv"
)

X = df.drop(columns=["Class"])
y = df["Class"]

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42
)

X_treino_novo, X_validacao, y_treino_novo, y_validacao = train_test_split(
    X_treino, y_treino,
    test_size=0.25, stratify=y_treino, random_state=42
)

print("Treinando Random Forest...", flush=True)

modelo = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

modelo.fit(X_treino_novo, y_treino_novo)

ap_original = average_precision_score(
    y_validacao,
    modelo.predict_proba(X_validacao)[:, 1]
)

variaveis = ranking.head(10)["Variavel"].tolist()
gerador = np.random.default_rng(42)
resultados = []

print(f"\nAverage Precision original: {ap_original:.4f}")

for variavel in variaveis:
    quedas = []

    for repeticao in range(2):
        X_alterado = X_validacao.copy()

        X_alterado[variavel] = gerador.permutation(
            X_alterado[variavel].to_numpy()
        )

        ap_alterado = average_precision_score(
            y_validacao,
            modelo.predict_proba(X_alterado)[:, 1]
        )

        quedas.append(ap_original - ap_alterado)

    resultados.append({
        "Variavel": variavel,
        "AP_Original": ap_original,
        "Queda_AP_Media": np.mean(quedas),
        "Queda_AP_Desvio": np.std(quedas),
    })

    print(
        f"{variavel}: queda media na AP = "
        f"{np.mean(quedas):.4f}",
        flush=True
    )

tabela = pd.DataFrame(resultados).sort_values(
    "Queda_AP_Media",
    ascending=False
).reset_index(drop=True)

tabela.insert(0, "Posicao", range(1, len(tabela) + 1))

saida = raiz / "docs" / "permutation_importance_rf.csv"
tabela.to_csv(saida, index=False)

print("\n=== RANKING POR PERMUTACAO ===")
print(tabela.to_string(index=False))

print("\nArquivo salvo:", saida)
print("Conjunto de teste preservado.")
print("Experimento concluido.")
