# Fraud Analytics

### Análise de Dados e Machine Learning aplicados à detecção de fraudes financeiras

Projeto de portfólio desenvolvido para explorar padrões em transações financeiras, construir modelos experimentais de classificação de fraudes e apresentar resultados em um dashboard web interativo.

**[Acessar dashboard online](https://jouborges.github.io/tech-guide/)**

## Sobre o projeto

O Fraud Analytics utiliza um conjunto de dados com **284.807 transações financeiras**, das quais 492 são classificadas como fraudulentas.

O projeto combina análise exploratória de dados, modelagem preditiva e visualização de indicadores para investigar o desafio de identificar eventos raros em bases altamente desbalanceadas.

## Tecnologias utilizadas

- **Python e Pandas:** manipulação, tratamento e exploração dos dados.
- **Scikit-learn:** treinamento e avaliação do modelo de classificação.
- **Jupyter Notebook:** desenvolvimento e documentação dos experimentos.
- **HTML, CSS e JavaScript:** construção da interface web.
- **Chart.js:** visualização interativa dos indicadores.
- **Git e GitHub:** versionamento e publicação automatizada pelo GitHub Pages.

## Resultados do modelo

Foi desenvolvido um modelo experimental de Regressão Logística com padronização das variáveis e balanceamento de pesos entre as classes.

| Métrica | Resultado |
|---|---:|
| Precisão | 30,42% |
| Recall | 88,78% |
| F1-score | 45,31% |
| Fraudes identificadas | 87 |
| Falsos alertas | 199 |
| Fraudes não identificadas | 11 |

Os resultados foram obtidos com limiar de classificação de 0,95, selecionado após avaliação no conjunto de validação.

**Importante:** os resultados são exploratórios e não representam desempenho comprovado em produção. O conjunto de teste já havia sido examinado em experimentos anteriores.

## Documentação técnica

O relatório apresenta a metodologia de treinamento, divisão dos dados, escolha do limiar, métricas e limitações do experimento.

**[Consultar relatório do modelo](docs/RELATORIO_MODELO.md)**

## Estrutura do projeto

```text
fraud-analytics/
├── data/
├── docs/
│   └── RELATORIO_MODELO.md
├── frontend/
│   ├── css/
│   ├── data/
│   ├── js/
│   └── index.html
├── notebooks/
│   └── 01_exploracao_dados.ipynb
├── gerar_indicadores.py
└── README.md
```

## Privacidade e dados

O dataset original permanece fora do repositório por meio das regras de `.gitignore`.

O dashboard publicado utiliza arquivos JSON com indicadores agregados e resultados do experimento, sem disponibilizar o CSV original.

## Próximas evoluções

- Comparação com novos algoritmos de classificação.
- Avaliação com métricas adicionais, incluindo PR-AUC.
- Investigação de estratégias para reduzir falsos positivos.
- Aprimoramento da metodologia de validação.
- Expansão das análises e visualizações do dashboard.

## Autor

**Dionatan Borges dos Santos**

Projeto desenvolvido para estudo e construção de portfólio em Data Analytics, Ciência de Dados e Machine Learning.