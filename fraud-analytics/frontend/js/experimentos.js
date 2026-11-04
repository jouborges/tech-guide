"use strict";
// Laboratório: dados reais exportados dos CSVs dos experimentos.
(async function iniciarExperimentos() {
    const status = document.getElementById('ex-estado');
    const content = document.getElementById('ex-conteudo');
    if (!status || !content) return;
    const fmt = x => new Intl.NumberFormat('pt-BR', {maximumFractionDigits:2,minimumFractionDigits:2}).format(x);
    const inteiro = x => new Intl.NumberFormat('pt-BR').format(x);
    const porCento = x => fmt(x*100)+'%';
    const chartOptions = {responsive:true,maintainAspectRatio:false,animation:{duration:650},plugins:{legend:{position:'bottom'}}};
    const coluna = (id, labels, series, tituloY) => new Chart(document.getElementById(id), {
        type:'bar',data:{labels,datasets:series},options:{...chartOptions,scales:{y:{beginAtZero:true,title:{display:!!tituloY,text:tituloY}}}}
    });
    try {
        if (typeof Chart === 'undefined') throw new Error('Chart.js não carregado');
        const response = await fetch('./data/experimentos.json',{cache:'no-store'});
        if(!response.ok) throw new Error('HTTP '+response.status);
        const d = await response.json();
        if(d.modelos.length!==2 || d.limiares_rf.length!==9) throw new Error('Dados experimentais incompletos');
        const cores=['#64748b','#2563eb'];
        const metricas=['Precision','Recall','F1','AP'];
        const nomes={'Precision':'Precision','Recall':'Recall','F1':'F1-score','AP':'Average Precision'};
        coluna('ex-grafico-modelos',metricas.map(x=>nomes[x]),d.modelos.map((m,i)=>({label:m.modelo,data:metricas.map(k=>m[k]*100),backgroundColor:cores[i],borderRadius:6})), 'Percentual (%)');
        coluna('ex-grafico-erros',['Falsos positivos','Falsos negativos'],d.modelos.map((m,i)=>({label:m.modelo,data:[m.FP,m.FN],backgroundColor:cores[i],borderRadius:6})), 'Transações');
        const limiares=d.limiares_rf;
        const labels=limiares.map(r=>r.Limiar.toFixed(2).replace('.',','));
        const canvas = document.getElementById('ex-grafico-limiares');
        const graficoLimiar = new Chart(canvas,{type:'line',data:{labels,datasets:[
            {label:'Precision',data:limiares.map(r=>r.Precision*100),borderColor:'#2563eb',backgroundColor:'#2563eb',tension:.25},
            {label:'Recall',data:limiares.map(r=>r.Recall*100),borderColor:'#0d9488',backgroundColor:'#0d9488',tension:.25},
            {label:'F1-score',data:limiares.map(r=>r.F1*100),borderColor:'#d97706',backgroundColor:'#d97706',tension:.25}
        ]},options:{...chartOptions,scales:{y:{min:0,max:100,ticks:{callback:v=>v+'%'}}}}});
        const select=document.getElementById('ex-limiar');
        limiares.forEach((r,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=labels[i];select.appendChild(opt)});
        select.value=String(limiares.findIndex(x=>Math.abs(x.Limiar-.5)<1e-9));
        const cards=document.getElementById('ex-kpis');
        const update=()=>{
            const r=limiares[Number(select.value)];
            const values=[['Precision',porCento(r.Precision)],['Recall',porCento(r.Recall)],['Fraudes identificadas',inteiro(r.TP)],['Falsos alertas',inteiro(r.FP)],['Fraudes não detectadas',inteiro(r.FN)],['F1-score',porCento(r.F1)]];
            cards.replaceChildren(...values.map(([k,v])=>{const el=document.createElement('div');el.className='ex-kpi';const label=document.createElement('span');label.textContent=k;const val=document.createElement('strong');val.textContent=v;el.append(label,val);return el}));
            graficoLimiar.data.datasets.forEach(s=>{s.pointRadius=labels.map((_,i)=>i===Number(select.value)?6:3)});
            graficoLimiar.update();
        };
        select.addEventListener('change',update);update();
        const top=d.importancia_arvores.slice(0,10);
        coluna('ex-grafico-importancia',top.map(r=>r.variavel),[{label:'Importância (%)',data:top.map(r=>r.importancia*100),backgroundColor:'#2563eb',borderRadius:5}], '% de importância');
        const perm=d.importancia_permutacao;
        coluna('ex-grafico-permutacao',perm.map(r=>r.variavel),[{label:'Queda média de AP (p.p.)',data:perm.map(r=>r.queda_ap*100),backgroundColor:perm.map(r=>r.queda_ap<0?'#d97706':'#0d9488'),borderRadius:5}], 'Pontos percentuais');
        content.hidden=false;status.hidden=true;
    } catch(err) {
        status.textContent='Não foi possível carregar os experimentos: '+err.message;
        console.error('Fraud Analytics experimentos:',err);
    }
})();
