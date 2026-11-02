# Fraud Analytics

### Análise de Dados e Machine Learning aplicados à detecção de fraudes financeiras

Projeto de portfólio desenvolvido para explorar padrões em transações financeiras, construir modelos experimentais de classificação de fraudes e apresentar resultados em um dashboard web interativo.

**[Acessar dashboard online](https://jouborges.github.io/tech-guide/)**

## Sobre o projeto

O Fraud Analytics utiliza um conjunto de dados com **284.807 transações financeiras**, das quais 492 são classificadas como fraudulentas.

O projeto combina análise exploratória de dados, modelagem preditiva e visualização de indicadores para investigar o desafio de identificar eventos raros em bases altamente desbalanceadas.

## Tecnologias utilizadas

- **Python e Pandas:** manipulação, tratamento e exploração dos dados.
- **Scikit-learn:** treinamento e avaliação dos modelos de classificação.
- **Jupyter Notebook:** desenvolvimento e documentação dos experimentos.
- **HTML, CSS e JavaScript:** construção da interface web.
- **Chart.js:** visualização interativa dos indicadores.
- **Git e GitHub:** versionamento do projeto.
- **GitHub Actions e GitHub Pages:** publicação automatizada do dashboard.

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
| Transações legítimas corretamente classificadas | 56.665 |

Os resultados foram obtidos no conjunto de teste utilizando o limiar de classificação de 0,95, selecionado a partir das avaliações no conjunto de validação.

**Importante:** o modelo é experimental e não representa uma solução de prevenção a fraudes pronta para produção. O conjunto de teste já havia sido examinado em experimentos anteriores, o que limita a independência da avaliação.

## Documentação técnica

A documentação do projeto está organizada em dois arquivos:

**[Relatório técnico do modelo](docs/RELATORIO_MODELO.md)**

Apresenta a metodologia utilizada, preparação dos dados, treinamento, seleção do limiar, avaliação dos resultados e limitações do experimento.

**[Roadmap de desenvolvimento](docs/ROADMAP.md)**

Registra as funcionalidades concluídas, as próximas evoluções técnicas e os objetivos de aprendizado.

## Estrutura do projeto

```text
fraud-analytics/
├── data/
│   └── raw/
├── docs/
│   ├── RELATORIO_MODELO.md
│   └── ROADMAP.md
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

## Privacidade e proteção de dados

O dataset original permanece armazenado localmente e é excluído do versionamento por regras configuradas no `.gitignore`.

O dashboard publicado utiliza arquivos JSON contendo indicadores agregados e resultados experimentais.

O `.gitignore` constitui uma medida preventiva e não substitui a revisão dos arquivos antes da publicação no GitHub.

## Próximas evoluções

O desenvolvimento seguirá as prioridades registradas no roadmap.

Entre os próximos objetivos estão:

- Treinar um modelo Random Forest.
- Comparar o desempenho de diferentes algoritmos.
- Avaliar métricas adicionais, incluindo PR-AUC.
- Investigar estratégias para reduzir falsos positivos.
- Aprimorar os procedimentos de validação.
- Integrar um banco de dados relacional e consultas SQL.
- Expandir as visualizações e análises do dashboard.
- Adicionar testes automatizados e instruções de reprodução dos experimentos.

## Autor

**Dionatan Borges dos Santos**

Projeto desenvolvido como parte do portfólio de estudos em Data Analytics, Ciência de Dados e Machine Learning.

**[GitHub](https://github.com/jouborges)**