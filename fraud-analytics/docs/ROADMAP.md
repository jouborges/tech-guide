# Fraud Analytics | Roadmap de Desenvolvimento

Planejamento técnico e acompanhamento da evolução do projeto Fraud Analytics.

O objetivo é desenvolver competências práticas em análise de dados, Machine Learning, programação e engenharia de dados, com entregas documentadas e versionadas no GitHub.

## 1. Concluído

- [x] Estruturação do projeto e organização do repositório.
- [x] Configuração do ambiente Python e Jupyter Notebook.
- [x] Análise exploratória de 284.807 transações financeiras.
- [x] Investigação de distribuição de valores e padrões de fraude.
- [x] Implementação inicial de regras exploratórias de identificação de fraudes.
- [x] Treinamento de modelo de Regressão Logística com Scikit-learn.
- [x] Separação dos dados em treinamento, validação e teste.
- [x] Avaliação de precisão, recall, F1-score e matriz de confusão.
- [x] Seleção experimental do limiar de classificação.
- [x] Desenvolvimento do dashboard com HTML, CSS, JavaScript e Chart.js.
- [x] Integração dos indicadores e resultados do modelo ao dashboard.
- [x] Publicação do dashboard no GitHub Pages.
- [x] Configuração de publicação automatizada pelo GitHub Actions.
- [x] Criação do README e relatório técnico do modelo.

## 2. Próxima etapa: Comparação de modelos

- [ ] Treinar um modelo Random Forest.
- [ ] Comparar Random Forest e Regressão Logística.
- [ ] Avaliar precisão, recall, F1-score e PR-AUC.
- [ ] Investigar diferenças na quantidade de falsos positivos.
- [ ] Documentar os resultados da comparação.

**Entrega esperada:** relatório comparativo com os resultados dos dois algoritmos e suas limitações.

## 3. Evolução da metodologia

- [ ] Investigar estratégias mais robustas de validação.
- [ ] Avaliar separação temporal dos dados.
- [ ] Investigar calibração de probabilidades.
- [ ] Analisar o impacto dos limiares de classificação.
- [ ] Estudar métodos para lidar com dados desbalanceados.
- [ ] Avaliar custos operacionais associados a diferentes erros de classificação.

**Entrega esperada:** avaliação experimental mais robusta e documentação metodológica atualizada.

## 4. Banco de Dados e Engenharia de Dados

- [ ] Criar um banco de dados relacional para o projeto.
- [ ] Modelar tabelas e relacionamentos.
- [ ] Desenvolver consultas SQL para análise das transações.
- [ ] Construir um processo de ingestão e validação dos dados.
- [ ] Comparar análises realizadas com SQL e Pandas.
- [ ] Documentar a estrutura e o fluxo de processamento.

**Entrega esperada:** pipeline local de dados com persistência em banco relacional.

## 5. Evolução do dashboard

- [ ] Adicionar comparação visual entre modelos.
- [ ] Apresentar gráficos de desempenho e matriz de confusão.
- [ ] Melhorar a navegação entre análise exploratória e Machine Learning.
- [ ] Aprimorar a responsividade e acessibilidade.
- [ ] Atualizar a documentação visual dos experimentos.

**Entrega esperada:** interface capaz de apresentar e comparar diferentes experimentos analíticos.

## 6. Boas práticas e portfólio

- [ ] Criar instruções de reprodução dos experimentos.
- [ ] Documentar dependências e versões das bibliotecas.
- [ ] Adicionar testes automatizados aos scripts de processamento.
- [ ] Revisar a proteção de dados e as regras de `.gitignore`.
- [ ] Registrar as principais decisões técnicas do projeto.

## Indicadores atuais de referência

| Indicador | Resultado |
|---|---:|
| Transações analisadas | 284.807 |
| Fraudes na base | 492 |
| Algoritmo | Regressão Logística |
| Precisão no teste | 30,42% |
| Recall no teste | 88,78% |
| F1-score no teste | 45,31% |
| Limiar selecionado | 0,95 |

Os resultados são experimentais e não devem ser interpretados como desempenho validado para produção.

---

**Status atual:** primeiro modelo experimental documentado e dashboard publicado. Próxima prioridade: comparação com Random Forest.