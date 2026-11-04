from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    average_precision_score,
)

raiz = Path(__file__).resolve().parent
arquivo = raiz / "data" / "raw" / "creditcard.csv"

df = pd.read_csv(arquivo)

X = df.drop(columns=["Class"])
y = df["Class"]

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y,
    test_size=0.20,
    stratify=y,
    random_state=42
)

X_treino_novo, X_validacao, y_treino_novo, y_validacao = train_test_split(
    X_treino, y_treino,
    test_size=0.25,
    stratify=y_treino,
    random_state=42
)

print("Treinando Random Forest...", flush=True)

modelo = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

modelo.fit(X_treino_novo, y_treino_novo)

probabilidades = modelo.predict_proba(X_validacao)[:, 1]

ap = average_precision_score(y_validacao, probabilidades)

resultados = []

for limiar in [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90]:

    previsoes = (probabilidades >= limiar).astype(int)

    tn, fp, fn, tp = confusion_matrix(
        y_validacao, previsoes, labels=[0, 1]
    ).ravel()

    resultados.append({
        "Limiar": limiar,
        "Precision": precision_score(
            y_validacao, previsoes, zero_division=0
        ),
        "Recall": recall_score(
            y_validacao, previsoes, zero_division=0
        ),
        "F1": f1_score(
            y_validacao, previsoes, zero_division=0
        ),
        "TP": int(tp),
        "FP": int(fp),
        "FN": int(fn),
        "TN": int(tn),
    })

tabela = pd.DataFrame(resultados)

print("\n=== ANALISE DOS LIMIARES ===")
print(f"Average Precision: {ap:.2%}")
print(f"Fraudes na validacao: {int(y_validacao.sum())}")
print("\nLimiar | Precision | Recall | F1 | TP | FP | FN")

for r in resultados:
    print(
        f"{r['Limiar']:.2f} | "
        f"{r['Precision']:.2%} | "
        f"{r['Recall']:.2%} | "
        f"{r['F1']:.2%} | "
        f"{r['TP']} | {r['FP']} | {r['FN']}"
    )

saida = raiz / "docs" / "analise_limiares_rf.csv"
saida.parent.mkdir(parents=True, exist_ok=True)

tabela.to_csv(saida, index=False)

print("\nArquivo salvo:", saida)
print("Conjunto de teste nao utilizado.")
print("Analise exploratoria concluida.")
