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

## Comparação de modelos na validação

Foram avaliados dois algoritmos de classificação utilizando os mesmos **56.962 registros de validação**, com 99 fraudes reais.

A divisão dos dados foi estratificada, com `random_state=42`. Os modelos foram treinados em 170.883 transações, mantendo o conjunto de teste separado nesta comparação.

| Métrica | Regressão Logística V2 | Random Forest |
|---|---:|---:|
| Limiar | 0,95 | 0,50 |
| Precision | 28,37% | **92,41%** |
| Recall | **80,81%** | 73,74% |
| F1-score | 41,99% | **82,02%** |
| Average Precision | 68,07% | **80,06%** |
| Verdadeiros positivos | **80** | 73 |
| Falsos positivos | 202 | **6** |
| Falsos negativos | **19** | 26 |
| Verdadeiros negativos | 56.661 | **56.857** |

### Interpretação

Na validação, o Random Forest apresentou maior Precision, F1-score e Average Precision. Produziu 6 falsos positivos, contra 202 da Regressão Logística, mas deixou de identificar 26 fraudes, contra 19 da Regressão Logística.

O resultado evidencia uma troca entre reduzir alertas indevidos e identificar mais fraudes. A escolha de um modelo depende também dos custos associados a cada tipo de erro.

### Limitações

Esta comparação é exploratória, não uma avaliação final independente. O limiar de 0,95 da Regressão Logística foi selecionado na validação, e o Random Forest utilizou o limiar padrão de 0,50.

O conjunto de teste foi preservado nesta comparação, mas já havia sido examinado em experimentos anteriores do projeto. Por isso, futuras avaliações devem considerar o histórico de seleção e a necessidade de uma amostra realmente independente.

O projeto não representa uma solução de prevenção a fraudes pronta para produção.

### Experimentos reproduzíveis

- [Random Forest](02_random_forest.py)
- [Comparação dos modelos](03_comparacao_modelos.py)
- [Resultados da validação em CSV](docs/comparacao_modelos_validacao.csv)

O dataset original não é distribuído no repositório e deve estar disponível localmente em `data/raw/creditcard.csv` para reproduzir os experimentos.

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
│   ├── ROADMAP.md
│   └── comparacao_modelos_validacao.csv
├── frontend/
│   ├── css/
│   ├── data/
│   ├── js/
│   └── index.html
├── notebooks/
│   └── 01_exploracao_dados.ipynb
├── 02_random_forest.py
├── 03_comparacao_modelos.py
├── gerar_indicadores.py
└── README.md
```

## Privacidade e proteção de dados

O dataset original permanece armazenado localmente e é excluído do versionamento por regras configuradas no `.gitignore`.

O dashboard publicado utiliza arquivos JSON contendo indicadores agregados e resultados experimentais.

O `.gitignore` constitui uma medida preventiva e não substitui a revisão dos arquivos antes da publicação no GitHub.

## Próximas evoluções

As próximas etapas do projeto incluem:

- Comparar diferentes limiares de decisão sem utilizar o conjunto de teste para seleção.
- Investigar estratégias para reduzir falsos positivos sem comprometer excessivamente o recall.
- Aprimorar a validação com uma amostra independente e, quando apropriado, separação temporal.
- Atualizar o relatório técnico com a comparação dos algoritmos.
- Expandir as visualizações do dashboard.
- Integrar consultas SQL e um banco de dados relacional.
- Adicionar testes automatizados e melhorar a reprodutibilidade.

## Autor

**Dionatan Borges dos Santos**

Projeto desenvolvido como parte do portfólio de estudos em Data Analytics, Ciência de Dados e Machine Learning.

**[GitHub](https://github.com/jouborges)**