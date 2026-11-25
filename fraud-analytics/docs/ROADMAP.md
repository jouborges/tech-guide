# Fraud Analytics | Roadmap de Desenvolvimento

> **Status:** projeto experimental de portfólio, em evolução.  
> **Marco atual:** dashboard publicado, comparação entre Regressão Logística e Random Forest e Laboratório de Decisões interativo.  
> **Próxima fase:** Fraud Analytics 2.0 — Neural Intelligence.  
> **Atualizado em:** 25/11/2026.

## Objetivo

Evoluir o Fraud Analytics de uma análise exploratória e comparação inicial de modelos para um laboratório analítico **reproduzível**, capaz de relacionar desempenho preditivo, investigação de transações e decisões de negócio.

O foco é desenvolver competências demonstráveis em Python, SQL, Machine Learning, avaliação de modelos, qualidade de software e comunicação de resultados. O projeto não é um sistema antifraude pronto para produção.

## Princípios de desenvolvimento

- Priorizar qualidade e compreensão técnica antes de acrescentar funcionalidades.
- Manter resultados reproduzíveis, com dados, sementes, dependências e metodologia documentados.
- Não selecionar modelos ou limiares com base em resultados do conjunto de teste.
- Separar observações empíricas de simulações financeiras e hipóteses.
- Não publicar o dataset bruto, credenciais ou informações sensíveis.
- Concluir uma etapa somente após validar os resultados e registrar limitações.

## 1. Entregas concluídas

- [x] Estrutura inicial do repositório e ambiente Python/Jupyter.
- [x] Análise exploratória de **284.807 transações**, incluindo **492 fraudes**.
- [x] Investigação de distribuição de valores e desbalanceamento de classes.
- [x] Experimento com Regressão Logística e limiar de classificação.
- [x] Separação estratificada em treinamento, validação e teste para os experimentos atuais.
- [x] Experimento com Random Forest.
- [x] Comparação entre Regressão Logística e Random Forest na mesma validação.
- [x] Avaliação de Precision, Recall, F1-score, Average Precision e matriz de confusão.
- [x] Análise de nove limiares do Random Forest, de 0,10 a 0,90.
- [x] Análise de importância de variáveis por impureza e por permutação.
- [x] Dashboard com HTML, CSS, JavaScript e Chart.js.
- [x] Visualização de experimentos de Machine Learning no dashboard.
- [x] Laboratório de Decisões com cenários de custo e exploração interativa dos limiares.
- [x] Publicação estática no GitHub Pages via GitHub Actions.
- [x] Documentação inicial do projeto, dos modelos e das limitações.

**Marco de referência:** commit `4e2898f` (09/11/2026), com Laboratório de Decisões adicionado à branch `main`.

## 2. Prioridade P0 — Consolidar apresentação e documentação

**Objetivo:** entregar uma experiência integrada e confiável para quem acessa o portfólio pela primeira vez.

- [ ] Integrar o Laboratório de Decisões à navegação principal do dashboard.
- [ ] Corrigir links do menu que não apontam para seções ou páginas funcionais.
- [ ] Atualizar o `README.md` com o Laboratório de Decisões e o estado atual dos experimentos.
- [ ] Atualizar o relatório técnico com comparação de modelos, limiares e importância de variáveis.
- [ ] Diferenciar claramente resultados da validação e resultados do teste nas telas e na documentação.
- [ ] Realizar testes manuais de navegação em desktop e celular, incluindo links do GitHub Pages.

**Critério de conclusão:** usuário consegue acessar as páginas principais a partir do dashboard, sem links quebrados, e consultar metodologia e limitações no README.

## 3. Prioridade P1 — Fraud Analytics 2.0: Neural Intelligence

**Objetivo:** investigar se uma rede neural oferece ganho real sobre os modelos atuais na detecção de fraudes em dados tabulares desbalanceados.

### 3.1 Preparação metodológica

- [ ] Organizar uma rotina comum de carregamento, pré-processamento e avaliação para os três modelos.
- [ ] Registrar as divisões utilizadas e o histórico de consultas ao conjunto de teste.
- [ ] Definir um protocolo de comparação sem reutilizar o teste para selecionar arquitetura ou limiar.
- [ ] Usar escalonamento ajustado exclusivamente sobre os dados de treinamento quando necessário.
- [ ] Definir métricas principais: Average Precision, Precision, Recall, F1, TP, FP, FN e TN.
- [ ] Registrar tempos de treinamento e inferência com metodologia comparável.

### 3.2 Modelo neural experimental

- [ ] Treinar um baseline com `MLPClassifier` do Scikit-learn.
- [ ] Testar uma arquitetura pequena e documentar hiperparâmetros, semente e convergência.
- [ ] Investigar abordagens apropriadas para o desbalanceamento sem contaminar a validação.
- [ ] Comparar Regressão Logística, Random Forest e MLP sob o mesmo protocolo.
- [ ] Analisar limiares e trade-offs de falsos positivos versus fraudes não detectadas.
- [ ] Registrar também resultados negativos ou ausência de ganhos; não presumir superioridade da rede neural.
- [ ] Avaliar TensorFlow/Keras **somente se** houver justificativa técnica e aprendizado adicional claro.

### 3.3 Comunicação dos resultados

- [ ] Criar um relatório comparativo dos três modelos com tabelas e interpretação.
- [ ] Integrar um painel de comparação de modelos ao dashboard, sem alterar indicadores anteriores incorretamente.
- [ ] Mostrar resultados e limitações do experimento neural de forma reproduzível.

**Critério de conclusão:** experimento neural executável, comparação justa documentada e conclusão fundamentada sobre ganho, custo e limitações.

## 4. Prioridade P1 — SQL e camada analítica local

**Objetivo:** demonstrar competências de Banco de Dados e Analytics além de notebooks e modelos preditivos.

- [ ] Criar um banco SQLite local com esquema e tipos de dados documentados.
- [ ] Desenvolver rotina de ingestão e validação do CSV de transações.
- [ ] Criar consultas SQL para distribuição de classes, valores e faixas de transação.
- [ ] Calcular taxa de fraude por faixa de valor, com denominadores corretos.
- [ ] Comparar agregações em SQL com os indicadores gerados em Pandas.
- [ ] Publicar consultas e resultados agregados, mantendo a base bruta fora do GitHub.
- [ ] Documentar a origem de cada métrica apresentada no dashboard.

**Critério de conclusão:** processo local reproduzível de ingestão, consultas SQL versionadas e comparação automatizável de indicadores SQL × Pandas.

## 5. Prioridade P1 — Qualidade, testes e reprodutibilidade

- [ ] Centralizar funções comuns de leitura, divisão de dados, métricas e exportação.
- [ ] Criar arquivo de dependências com versões controladas.
- [ ] Documentar a preparação do ambiente e os comandos para reproduzir experimentos.
- [ ] Criar testes automatizados para indicadores, taxas, métricas e saídas geradas.
- [ ] Validar contratos/esquemas dos JSONs consumidos pelo dashboard.
- [ ] Implementar verificações de qualidade em GitHub Actions sem exigir a publicação do dataset.
- [ ] Revisar `.gitignore`, privacidade e proteção contra inclusão acidental de dados brutos.

**Critério de conclusão:** uma pessoa consegue configurar o ambiente, executar o fluxo documentado e verificar automaticamente os resultados esperados.

## 6. Prioridade P2 — Validação avançada e maturidade do modelo

- [ ] Investigar um conjunto de avaliação realmente independente, considerando que o teste histórico já foi consultado.
- [ ] Avaliar a viabilidade de validação temporal, respeitando limitações do dataset disponível.
- [ ] Investigar calibração das probabilidades e qualidade das pontuações de risco.
- [ ] Estudar estabilidade dos modelos e possíveis fontes de vazamento de dados.
- [ ] Construir cenários de custo usando **hipóteses explícitas**, sem apresentá-los como perdas reais observadas.
- [ ] Investigar sensibilidade a diferentes prevalências de fraude e custos operacionais.
- [ ] Atualizar relatório e painel com conclusões e incertezas.

**Critério de conclusão:** protocolo metodológico mais robusto, limitações bem delimitadas e decisão sobre modelo/limiar justificável.

## 7. Prioridade P2 — Experiência e comunicação

- [ ] Refinar responsividade, acessibilidade e estados de erro/carregamento.
- [ ] Padronizar visualmente dashboard, experimentos e laboratório.
- [ ] Disponibilizar gráficos essenciais sem depender exclusivamente de CDNs externas, quando viável.
- [ ] Adicionar glossário simples para Precision, Recall, F1, Average Precision e limiar.
- [ ] Explicar as limitações das variáveis anonimizadas e da importância de variáveis.
- [ ] Criar uma narrativa de caso de uso para apresentação em entrevista técnica.

## 8. Backlog futuro (não comprometido)

- [ ] Investigar alternativas de armazenamento e processamento conforme a necessidade real.
- [ ] Explorar APIs para servir consultas e resultados, caso a aplicação exija backend.
- [ ] Estudar monitoramento de modelos, drift e versionamento de experimentos.
- [ ] Avaliar explicabilidade adicional e critérios de revisão humana de alertas.

## Métricas de referência — validação atual

Os resultados abaixo são da **mesma amostra de validação**, composta por 56.962 transações, com 99 fraudes reais, e **não equivalem a uma avaliação independente final**.

| Métrica | Regressão Logística V2 | Random Forest |
|---|---:|---:|
| Limiar | 0,95 | 0,50 |
| Precision | 28,37% | 92,41% |
| Recall | 80,81% | 73,74% |
| F1-score | 41,99% | 82,02% |
| Average Precision | 68,07% | 80,06% |
| Verdadeiros positivos (TP) | 80 | 73 |
| Falsos positivos (FP) | 202 | 6 |
| Falsos negativos (FN) | 19 | 26 |

A rede neural **ainda não foi treinada**. Sua inclusão é uma etapa planejada; não há métricas neurais a reportar.

## Critério geral de publicação

Antes de cada entrega, verificar: código executável, resultados coerentes, documentação atualizada, links funcionais, ausência de dados sensíveis e commit revisado. O desenvolvimento deve continuar pela branch local de trabalho, com publicação deliberada na `main` após validação.
