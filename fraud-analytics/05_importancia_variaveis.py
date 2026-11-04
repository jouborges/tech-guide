from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

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

importancias = pd.DataFrame({
    "Variavel": X.columns,
    "Importancia": modelo.feature_importances_
})

importancias = importancias.sort_values(
    "Importancia",
    ascending=False
).reset_index(drop=True)

importancias.insert(
    0,
    "Posicao",
    range(1, len(importancias) + 1)
)

print("\n=== TOP 10 VARIAVEIS MAIS IMPORTANTES ===")

for _, linha in importancias.head(10).iterrows():
    print(
        f"{int(linha['Posicao']):2d}. "
        f"{linha['Variavel']:8s} "
        f"{linha['Importancia']:.2%}"
    )

print("\nTotal das importancias:", round(importancias["Importancia"].sum(), 6))

saida = raiz / "docs" / "importancia_variaveis_rf.csv"
saida.parent.mkdir(parents=True, exist_ok=True)
importancias.to_csv(saida, index=False)

print("\nArquivo salvo:", saida)
print("Conjunto de teste nao utilizado.")
print("Analise concluida.")
