from pathlib import Path
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    average_precision_score,
    confusion_matrix,
)

raiz = Path(__file__).resolve().parent
df = pd.read_csv(raiz / "data" / "raw" / "creditcard.csv")

X = df.drop(columns=["Class"])
y = df["Class"]

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42
)

X_treino_novo, X_validacao, y_treino_novo, y_validacao = train_test_split(
    X_treino, y_treino,
    test_size=0.25,
    stratify=y_treino,
    random_state=42
)

modelos = {
    "Regressão Logística V2": (
        make_pipeline(
            StandardScaler(),
            LogisticRegression(
                class_weight="balanced",
                max_iter=1000,
                random_state=42
            )
        ),
        0.95,
    ),
    "Random Forest": (
        RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            n_jobs=-1
        ),
        0.50,
    ),
}

resultados = []

for nome, (modelo, limiar) in modelos.items():
    print(f"Treinando: {nome}...", flush=True)

    modelo.fit(X_treino_novo, y_treino_novo)

    probabilidades = modelo.predict_proba(X_validacao)[:, 1]
    previsoes = (probabilidades >= limiar).astype(int)

    tn, fp, fn, tp = confusion_matrix(
        y_validacao, previsoes, labels=[0, 1]
    ).ravel()

    resultados.append({
        "Modelo": nome,
        "Limiar": limiar,
        "Precision": precision_score(y_validacao, previsoes, zero_division=0),
        "Recall": recall_score(y_validacao, previsoes, zero_division=0),
        "F1": f1_score(y_validacao, previsoes, zero_division=0),
        "AP": average_precision_score(y_validacao, probabilidades),
        "FP": int(fp),
        "FN": int(fn),
        "TP": int(tp),
        "TN": int(tn),
    })

print("\n=== COMPARAÇÃO NA MESMA VALIDAÇÃO ===")
for r in resultados:
    print(f"\n{r['Modelo']} | Limiar: {r['Limiar']:.2f}")
    print(f"Precision: {r['Precision']:.2%}")
    print(f"Recall: {r['Recall']:.2%}")
    print(f"F1-score: {r['F1']:.2%}")
    print(f"Average Precision: {r['AP']:.2%}")
    print(f"TP: {r['TP']} | FP: {r['FP']} | FN: {r['FN']} | TN: {r['TN']}")

saida = raiz / "docs" / "comparacao_modelos_validacao.csv"
saida.parent.mkdir(parents=True, exist_ok=True)
pd.DataFrame(resultados).to_csv(saida, index=False)

print(f"\nResultados salvos em: {saida}")
print("Conjunto de teste preservado.")
