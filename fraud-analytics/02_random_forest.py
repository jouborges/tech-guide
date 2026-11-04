import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    average_precision_score,
)

df = pd.read_csv("fraud-analytics/data/raw/creditcard.csv")

X = df.drop(columns=["Class"])
y = df["Class"]

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X,
    y,
    test_size=0.20,
    stratify=y,
    random_state=42,
)

X_treino_novo, X_validacao, y_treino_novo, y_validacao = train_test_split(
    X_treino,
    y_treino,
    test_size=0.25,
    stratify=y_treino,
    random_state=42,
)

print("Iniciando treinamento do Random Forest...", flush=True)

modelo_rf = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1,
)

modelo_rf.fit(X_treino_novo, y_treino_novo)

previsoes = modelo_rf.predict(X_validacao)
probabilidades = modelo_rf.predict_proba(X_validacao)[:, 1]

print("\nRESULTADOS DO RANDOM FOREST - VALIDACAO")
print(f"Precision: {precision_score(y_validacao, previsoes, zero_division=0):.2%}")
print(f"Recall: {recall_score(y_validacao, previsoes, zero_division=0):.2%}")
print(f"F1-score: {f1_score(y_validacao, previsoes, zero_division=0):.2%}")
print(f"Average Precision: {average_precision_score(y_validacao, probabilidades):.2%}")
