
"use strict";

// ========================================
// FRAUD ANALYTICS | TECH GUIDE
// Dashboard de análise e Machine Learning
// ========================================

// Formatação brasileira

function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR");
}

function formatarPercentual(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + "%";
}

// ========================================
// GRÁFICOS DAS TRANSAÇÕES
// ========================================

function criarGraficos(dados) {
    if (typeof Chart === "undefined") {
        console.error("Chart.js não foi carregado.");
        return;
    }

    const graficoClasses =
        document.getElementById("grafico-classes");

    const graficoBaixoValor =
        document.getElementById("grafico-baixo-valor");

    if (!graficoClasses || !graficoBaixoValor) {
        console.error("Elementos dos gráficos não encontrados.");
        return;
    }

    // Gráfico 1: distribuição das transações

    new Chart(graficoClasses, {
        type: "doughnut",
        data: {
            labels: ["Legítimas", "Fraudulentas"],
            datasets: [{
                data: [
                    dados.total_legitimas,
                    dados.total_fraudes
                ],
                backgroundColor: [
                    "#64748b",
                    "#2563eb"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function(contexto) {
                            return (
                                contexto.label + ": " +
                                formatarNumero(contexto.parsed)
                            );
                        }
                    }
                }
            }
        }
    });

    // Gráfico 2: transações de baixo valor

    new Chart(graficoBaixoValor, {
        type: "bar",
        data: {
            labels: [
                "Legítimas",
                "Fraudulentas"
            ],
            datasets: [{
                label: "Transações até 10 (%)",
                data: [
                    dados.percentual_baixo_valor.legitimas,
                    dados.percentual_baixo_valor.fraudes
                ],
                backgroundColor: [
                    "#64748b",
                    "#2563eb"
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(valor) {
                            return valor + "%";
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(contexto) {
                            return formatarPercentual(
                                contexto.parsed.y
                            );
                        }
                    }
                }
            }
        }
    });

    console.info(
        "Fraud Analytics: gráficos carregados com sucesso."
    );
}

// ========================================
// INDICADORES GERAIS
// ========================================

async function carregarIndicadores() {
    const indicadores = [
        "total-transacoes",
        "total-fraudes",
        "taxa-fraude"
    ];

    try {
        const resposta = await fetch(
            "./data/indicadores.json",
            { cache: "no-store" }
        );

        if (!resposta.ok) {
            throw new Error(
                `Erro HTTP ${resposta.status} ao carregar indicadores.`
            );
        }

        const dados = await resposta.json();

        const camposObrigatorios = [
            "total_transacoes",
            "total_fraudes",
            "total_legitimas",
            "taxa_fraude",
            "valor_medio_legitimas",
            "valor_medio_fraudes",
            "mediana_legitimas",
            "mediana_fraudes"
        ];

        for (const campo of camposObrigatorios) {
            if (!Number.isFinite(dados[campo])) {
                throw new Error(
                    `Indicador inválido ou ausente: ${campo}`
                );
            }
        }

        if (
            !dados.percentual_baixo_valor ||
            !Number.isFinite(
                dados.percentual_baixo_valor.legitimas
            ) ||
            !Number.isFinite(
                dados.percentual_baixo_valor.fraudes
            )
        ) {
            throw new Error(
                "Dados de transações de baixo valor inválidos."
            );
        }

        // Atualizar indicadores principais

        document.getElementById(
            "total-transacoes"
        ).textContent = formatarNumero(
            dados.total_transacoes
        );

        document.getElementById(
            "total-fraudes"
        ).textContent = formatarNumero(
            dados.total_fraudes
        );

        document.getElementById(
            "taxa-fraude"
        ).textContent = formatarPercentual(
            dados.taxa_fraude
        );

        // Criar gráficos com os dados carregados

        criarGraficos(dados);

        console.info(
            "Fraud Analytics: indicadores carregados com sucesso."
        );

    } catch (erro) {
        console.error(
            "Fraud Analytics: falha ao carregar indicadores.",
            erro
        );

        for (const id of indicadores) {
            const elemento = document.getElementById(id);

            if (elemento) {
                elemento.textContent = "Indisponível";
            }
        }
    }
}

// ========================================
// DESEMPENHO DO MODELO DE MACHINE LEARNING
// ========================================

async function carregarModelo() {
    const campos = {
        "modelo-precisao": "precisao",
        "modelo-recall": "recall",
        "modelo-f1": "f1_score",
        "modelo-vp": "verdadeiros_positivos",
        "modelo-fp": "falsos_positivos",
        "modelo-fn": "falsos_negativos",
        "modelo-vn": "verdadeiros_negativos"
    };

    try {
        const resposta = await fetch(
            "./data/modelo_v2.json",
            { cache: "no-store" }
        );

        if (!resposta.ok) {
            throw new Error(
                `Erro HTTP ${resposta.status} ao carregar o modelo.`
            );
        }

        const dados = await resposta.json();

        // Validar todos os campos antes de atualizar a tela

        for (const campo of Object.values(campos)) {
            if (!Number.isFinite(dados[campo])) {
                throw new Error(
                    `Resultado do modelo inválido: ${campo}`
                );
            }
        }

        // Atualizar métricas e resultados

        for (const [id, campo] of Object.entries(campos)) {
            const elemento = document.getElementById(id);

            if (!elemento) {
                console.warn(
                    `Elemento não encontrado: ${id}`
                );
                continue;
            }

            const valor = dados[campo];

            const percentual = [
                "precisao",
                "recall",
                "f1_score"
            ].includes(campo);

            elemento.textContent = percentual
                ? formatarPercentual(valor * 100)
                : formatarNumero(valor);
        }

        console.info(
            "Fraud Analytics: resultados do modelo carregados."
        );

    } catch (erro) {
        console.error(
            "Fraud Analytics: falha ao carregar o modelo.",
            erro
        );

        for (const id of Object.keys(campos)) {
            const elemento = document.getElementById(id);

            if (elemento) {
                elemento.textContent = "Indisponível";
            }
        }
    }
}

// ========================================
// INICIALIZAÇÃO DO DASHBOARD
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    carregarIndicadores();
    carregarModelo();
});
