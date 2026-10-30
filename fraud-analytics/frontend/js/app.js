
"use strict";

// Fraud Analytics | Tech Guide
// Dashboard integrado aos indicadores gerados pelo Python.

// Formatação dos valores
function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR");
}

function formatarPercentual(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + "%";
}

// Criar gráficos analíticos
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

    console.info("Fraud Analytics: gráficos criados.");
}

// Carregar indicadores do JSON
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

        // Validar os dados recebidos
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
            if (
                typeof dados[campo] !== "number" ||
                !Number.isFinite(dados[campo])
            ) {
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

        // Atualizar os indicadores do dashboard
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

        // Criar os gráficos após carregar os dados
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

// Inicialização da interface
document.addEventListener("DOMContentLoaded", () => {
    carregarIndicadores();
});
