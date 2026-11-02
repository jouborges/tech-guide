# Fraud Analytics | Relatório do Modelo de Machine Learning

## 1. Objetivo

Desenvolver e avaliar um modelo experimental de classificação de transações financeiras, buscando identificar possíveis fraudes a partir das características disponíveis no conjunto de dados.

O projeto utiliza Python, Pandas e Scikit-learn, com apresentação dos resultados em um dashboard desenvolvido com HTML, CSS, JavaScript e Chart.js.

## 2. Conjunto de dados

O dataset contém 284.807 transações financeiras, sendo:

- 284.315 transações legítimas
- 492 transações fraudulentas
- Taxa geral de fraude de aproximadamente 0,17%

As variáveis incluem `Time`, `Amount` e os componentes transformados `V1` a `V28`. A variável `Class` identifica a classificação real das transações.

O conjunto apresenta um elevado desbalanceamento entre as classes.

## 3. Metodologia

Foi utilizada uma Regressão Logística com padronização das variáveis por meio do `StandardScaler`.

O modelo foi implementado utilizando um pipeline do Scikit-learn, com `class_weight="balanced"` para atribuir maior peso à classe minoritária durante o treinamento.

Os dados foram separados aleatoriamente, com estratificação:

| Conjunto | Transações | Fraudes |
|---|---:|---:|
| Treinamento | 170.883 | 295 |
| Validação | 56.962 | 99 |
| Teste | 56.962 | 98 |

A escolha do limiar foi realizada por meio da comparação de cinco valores no conjunto de validação: 0,50, 0,70, 0,80, 0,90 e 0,95.

Entre os limiares avaliados, 0,95 apresentou o maior F1-score na validação.

## 4. Resultados

O modelo foi avaliado no conjunto de teste utilizando o limiar selecionado de 0,95.

| Métrica | Resultado |
|---|---:|
| Precisão | 30,42% |
| Recall | 88,78% |
| F1-score | 45,31% |
| Verdadeiros positivos | 87 |
| Falsos positivos | 199 |
| Falsos negativos | 11 |
| Verdadeiros negativos | 56.665 |

O modelo identificou 87 das 98 fraudes do conjunto de teste, gerando 199 alertas incorretos.

Os resultados demonstram uma capacidade relevante de identificação de fraudes, mas também evidenciam a necessidade de reduzir falsos positivos.

## 5. Limitações

Este é um experimento exploratório e não representa um sistema de prevenção a fraudes pronto para produção.

O conjunto de teste já havia sido utilizado em análises anteriores, o que limita sua independência em relação às decisões tomadas durante a exploração.

A divisão aleatória também não simula necessariamente um cenário de previsão de transações futuras.

O limiar foi selecionado com base no F1-score, sem modelagem dos custos financeiros de falsos positivos e falsos negativos.

Além disso, as pontuações geradas pela Regressão Logística com pesos balanceados não devem ser interpretadas automaticamente como probabilidades calibradas de fraude.

## 6. Próximos passos

- Comparar o desempenho com outros algoritmos de classificação.
- Avaliar métricas como PR-AUC e ROC-AUC.
- Investigar métodos de calibração e seleção de limiares.
- Realizar validação temporal e testes com dados ainda não explorados, quando disponíveis.
- Documentar os custos operacionais dos diferentes tipos de erro.

## 7. Conclusão

O experimento demonstra a construção e avaliação de um classificador supervisionado para um problema com classes altamente desbalanceadas.

A análise reforça a importância de utilizar métricas apropriadas, selecionar limiares de decisão e considerar as limitações metodológicas antes de interpretar resultados como evidência de desempenho em situações reais.