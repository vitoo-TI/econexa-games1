const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),900));

const cursor=$('.cursor-glow');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},{passive:true});

const particles=[];
const canvas=$('#particleCanvas'),ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener('resize',resize);
for(let i=0;i<95;i++) particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.15,vy:Math.random()*.22+.03,a:Math.random()*.45+.08});
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const p of particles){p.y-=p.vy;if(p.y<-10)p.y=canvas.height+10;p.x+=p.vx;if(p.x<-10)p.x=canvas.width+10;if(p.x>canvas.width+10)p.x=-10;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(132,255,170,${p.a})`;ctx.fill();
  } requestAnimationFrame(draw)
} draw();

const sections=[...document.querySelectorAll('main .chapter')];
const missionCounter=$('#missionCounter');
const navLinks=$$('#mainNav a');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
const bario=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const idx=sections.indexOf(e.target)+1;
      missionCounter.textContent=String(Math.min(10,Math.max(1,Math.round(idx*.72)))).padStart(2,'0');
    }
  })
},{threshold:.3});
sections.forEach(s=>bario.observe(s));

window.addEventListener('scroll',()=>{
 const y=scrollY+180; let current='inicio';
 sections.forEach(s=>{if(y>=s.offsetTop) current=s.id});
 navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
},{passive:true});

$('#navToggle').addEventListener('click',()=>{
 const existing=$('#mobileNav');
 if(existing){existing.remove();return}
 const nav=document.createElement('div');nav.id='mobileNav';
 nav.style.cssText='position:fixed;z-index:29;top:76px;left:0;right:0;padding:18px;background:#040806;border-bottom:1px solid rgba(164,255,196,.1);display:grid;gap:12px';
 nav.innerHTML=navLinks.map(a=>`<a href="${a.getAttribute('href')}" style="font:600 11px Rajdhani;color:#b9cfc4;letter-spacing:.12em;padding:8px 0">${a.textContent}</a>`).join('');
 document.body.appendChild(nav);$$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>nav.remove()));
});

const modules={
 planejamento:['NX-PLN-01','Planejamento','Definir objetivos, prioridades, recursos e caminhos para transformar o conceito em experiência.'],
 financeiro:['NX-FIN-02','Gestão Financeira','Organizar recursos, custos, investimentos e prioridades para manter o projeto sustentável.'],
 pessoas:['NX-PES-03','Gestão de Pessoas','Distribuir responsabilidades, valorizar talentos e alinhar competências a cada desafio.'],
 projetos:['NX-PRJ-04','Gestão de Projetos','Dividir entregas, prazos, riscos e dependências para transformar uma visão em resultado.'],
 comunicacao:['NX-COM-05','Comunicação','Conectar equipe, público e parceiros por meio de mensagens claras e consistentes.'],
 marketing:['NX-MKT-06','Marketing','Construir identidade, posicionamento e uma narrativa capaz de gerar conexão com o público.'],
 parcerias:['NX-PAR-07','Parcerias','Criar conexões com pessoas, instituições e projetos que ampliem o impacto da ideia.'],
 resultados:['NX-RES-08','Controle de Resultados','Medir avanços, comparar metas e usar informações para melhorar continuamente.']
};
$$('.module').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.module').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const d=modules[btn.dataset.module];$('#moduleCode').textContent=d[0];$('#moduleTitle').textContent=d[1];$('#moduleText').textContent=d[2];
}));

const team=[
['JC','JULIANE COELHO BENO','DIRETORA GERAL / FUNDADORA','Liderança, visão sistêmica, biodiversidade e proteção do conjunto.','assets/team-juliane.jpg'],
['JA','JOSÉ ADELINO GARCIA DOS SANTOS NETO','VICE-DIRETOR / DIRETOR EXECUTIVO','Execução, velocidade de decisão e coordenação estratégica.','assets/team-neto.jpg'],
['PH','PEDRO HENRIQUE FREITAS CORRÊA','DIRETOR DE DESIGN','Direção visual, contenção e expressão criativa.','assets/team-pedro.jpg'],
['VH','VICTOR HUGO BELO MOTA','DIRETOR DE DESENVOLVIMENTO / PROGRAMADOR CHEFE','Tecnologia, arquitetura de sistemas e superação de obstáculos técnicos.','assets/team-victor.jpg'],
['GG','GUILHERME GOMES MARTINS','DIRETOR DE NARRATIVA E ROTEIRO','História, pistas, detalhes escondidos e construção de universo.','assets/team-guilherme.jpg'],
['AR','AMANDA RAQUEL PEREIRA DOS SANTOS','DIRETORA DE EDUCAÇÃO AMBIENTAL','Educação, transformação e recuperação ambiental.','assets/team-amanda.jpg',''],
['RS','RYAN SILVEIRA RAMOS','GAME DESIGNER','Jogabilidade, missões, desafios, recompensas e progressão.','assets/team-ryan.jpg'],
['LC','LARISSA PIMENTA COSTA','DESIGNER DE MUNDO E CENÁRIOS','Território, cultura maranhense e composição do mundo.','assets/team-larissa.jpg'],
['HC','HELOA DA SILVA COSTA','ESPECIALISTA EM TECNOLOGIA E INTELIGÊNCIA ARTIFICIAL','Energia, dados, tecnologia e inteligência aplicada.','assets/team-heloa.jpg'],
['MF','MARIA FERNANDA COSTA MACHADO','DIRETORA DE MARKETING E COMUNICAÇÃO','Comunicação, posicionamento e conexão com o público.','assets/team-fernanda.jpg', 'assets/team-fernanda.jpg']
];
const teamList=$('#teamList'); let selectedTeam=0;
team.forEach((t,i)=>{
 const b=document.createElement('button');b.className='team-item'+(i===0?' active':'');b.innerHTML=`<div class="team-avatar">${t[0]}</div><div><strong>${t[1]}</strong><small>${t[2]}</small></div>`;
 b.addEventListener('click',()=>setTeam(i));teamList.appendChild(b);
});
function setTeam(i){
 selectedTeam=i;const t=team[i];
 $$('.team-item').forEach((x,j)=>x.classList.toggle('active',j===i));
 $('#teamInitials').textContent=t[0];$('#teamName').textContent=t[1];$('#teamRole').textContent=t[2];$('#teamDesc').textContent=t[3]; const rp=$('#teamRealPhoto'); if(rp&&t[4]){rp.src=t[4];rp.alt='Foto real de '+t[1];} const img=$('#teamPhoto'); if(img){ if(t[4]){img.src=t[4];img.alt='Foto real de '+t[1];img.style.display='block'}else{img.style.display='none'} }
}
$('#profileBtn').addEventListener('click',()=>{
 const t=team[selectedTeam];
 $('#modalInitials').textContent=t[0];
 $('#modalName').textContent=t[1];
 $('#modalRole').textContent=t[2];
 $('#modalDesc').textContent=t[3];
 const modalPhoto=$('#modalTeamPhoto');
 if(modalPhoto){
   if(t[4]){modalPhoto.src=t[4];modalPhoto.alt='Foto real de '+t[1];modalPhoto.style.display='block';}
   else{modalPhoto.style.display='none';}
 }
 $('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false');
});

const guardians=[
['GRD-01','LUNA','GUARDIÃ DA NATUREZA','REGENERAÇÃO','NATUREZA','RECUPERAÇÃO','Uma presença conectada à biodiversidade, recuperação e ao equilíbrio natural.','assets/character-luna.jpg'],
['GRD-02','ÍRIS','GUARDIÃ DA TECNOLOGIA','TECNOLOGIA NEXA','TECNOLOGIA','ANÁLISE','Integra dados e inovação para transformar informação em ação.','assets/character-iris.jpg'],
['GRD-03','ANDREW','GUARDIÃO DAS ÁGUAS','PURIFICAÇÃO','ÁGUA','RESTAURAÇÃO','Converte contaminação em um desafio de recuperação dos recursos hídricos.','assets/character-andrew.jpg'],
['GRD-04','THEO','GUARDIÃO DA ENERGIA','ENERGIA NEXA','ENERGIA','OTIMIZAÇÃO','Representa eficiência, inovação energética e uso consciente de recursos.','assets/character-theo.jpg'],
['GRD-05','GUI','GUARDIÃO DA INVISIBILIDADE','MANTO ILUSÓRIO','INFORMAÇÃO','INFILTRAÇÃO','Investigação, pistas, detalhes e a força de enxergar o que está escondido.','assets/character-gui.jpg'],
['GRD-06','HENRIQUE','GUARDIÃO DO GELO ETERNO','PRISÃO GELADA','GELO','CONTENÇÃO','Simboliza impedir que um problema ambiental se espalhe antes de solucioná-lo.','assets/character-henrique.jpg'],
['GRD-07','NETO','GUARDIÃO DA VELOCIDADE','TURBILHÃO RELÂMPAGO','VELOCIDADE','COLETA','Iniciativa, execução rápida e capacidade de agir antes que o problema cresça.','assets/character-neto.jpg'],
['GRD-08','VICTOR','GUARDIÃO DA FORÇA','IMPACTO TECTÔNICO','FORÇA','SUPERAÇÃO','Transforma capacidade técnica e resistência em ação física e estratégica.','assets/character-victor.jpg'],
['GRD-09','HELOA','GUARDIÃ DO SOL','LUZ SOLAR','ENERGIA LIMPA','INOVAÇÃO','Tecnologia, inteligência e energia limpa em uma só presença.','assets/character-heloa.jpg'],
['GRD-10','AMANDA','GUARDIÃ DAS CHAMAS','FOGO ECOLÓGICO','TRANSFORMAÇÃO','EDUCAÇÃO','Usa a ideia de fogo como força de transformação e recuperação ambiental.','assets/character-amanda.jpg'],
['GRD-11','LARISSA','GUARDIÃ DA MÚSICA','SINFONIA HARMÔNICA','CULTURA','HARMONIA','Reggae, tambores maranhenses e identidade territorial transformados em poder.','assets/character-larissa.jpg'],
['GRD-12','JULIANE','GUARDIÃ DOS ANIMAIS','ESPÍRITO SELVAGEM','BIODIVERSIDADE','PROTEÇÃO','Liderança e cuidado com a vida conectados à proteção do conjunto.','assets/character-juliane.jpg']
];
const gt=$('#guardianThumbs');let guardIndex=0;
guardians.forEach((g,i)=>{const b=document.createElement('button');b.className='guardian-thumb'+(i===0?' active':'');b.innerHTML=`<span class="guardian-thumb-image"><img loading="lazy" src="${g[7]}" alt="${g[1]}"></span><b>${g[1].slice(0,2)}</b><span>${g[1]}</span>`;b.onclick=()=>setGuardian(i);gt.appendChild(b)});
function setGuardian(i){guardIndex=i;const g=guardians[i];$$('.guardian-thumb').forEach((b,j)=>b.classList.toggle('active',j===i));$('#guardianCode').textContent=g[0];$('#guardianName').textContent=g[1];$('#guardianRole').textContent=g[2];$('#guardianPower').textContent=g[3];$('#guardianAttr').textContent=g[4];$('#guardianFunc').textContent=g[5];$('#guardianDesc').textContent=g[6];$('#guardianSilhouette').textContent=g[1][0];const hero=$('#guardianHeroImage');if(hero&&g[7]){hero.src=g[7];hero.alt=g[1]+' — '+g[2];}}

const maps={
centro:['MAP-SLZ-01','Centro Histórico','Memória, cultura e identidade. Um território que transforma arquitetura e história em parte da aventura.'],
itaqui:['MAP-SLZ-02','Itaqui-Bacanga','Zona de contrastes, indústria, trabalho e desafios socioambientais.'],
praias:['MAP-SLZ-03','Praias','Água, lazer, biodiversidade e sinais de poluição que exigem observação.'],
natural:['MAP-SLZ-04','Área Natural','Ecossistemas, fauna e flora que precisam de proteção contínua.'],
degradada:['MAP-SLZ-05','Área Degradada','Espaço onde resíduos e contaminação viram o foco de uma missão de recuperação.'],
industrial:['MAP-SLZ-06','Área Industrial','Energia, tecnologia e impactos ambientais entram em conflito.'],
final:['MAP-SLZ-07','Área Final','O território onde a equipe confronta o acúmulo dos problemas e a ameaça de Tritanus.']
};
$$('.map-tab').forEach(b=>b.addEventListener('click',()=>{ $$('.map-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=maps[b.dataset.map];$('#mapCode').textContent=d[0];$('#mapTitle').textContent=d[1];$('#mapText').textContent=d[2]; }));

const villains=[
['VALTOR','SENHOR DO LIXO','Resíduos e descarte inadequado.','assets/character-valtor.jpg'],
['STORMY','DAMA DA TEMPESTADE','Poluição atmosférica e instabilidade.','assets/character-stormy.jpg'],
['OGRON','MONSTRO DAS ILUSÕES','Desinformação, fumaça e confusão.','assets/character-darron.jpg'],
['MAX','PERSONAGEM DO UNIVERSO','Novo integrante do universo dos antagonistas.','assets/character-max.jpg'],
['RYAN','BRUXO DO CÍRCULO NEGRO','Criador dentro da própria história.','assets/character-ryan-character.jpg'],
['NÉVOA','IRMÃ MORTE','Poluição atmosférica.','assets/character-nevoa-machado.jpg'],
['MACHADO','IRMÃ MORTE','Esgoto e águas residuais.','assets/character-nevoa-machado.jpg'],
['TRITANUS','O GRANDE VILÃO','Acúmulo final da degradação.','assets/character-tritanus.jpg']
];
const vg=$('#villainGrid');
villains.forEach(v=>{
  const c=document.createElement('article');
  c.className='villain-card has-image';
  c.innerHTML=`<div class="villain-visual"><img loading="lazy" src="${v[3]}" alt="${v[0]}"></div><div class="villain-card-copy"><span class="villain-type">THREAT // ACTIVE</span><h3>${v[0]}</h3><p>${v[1]}</p><p>${v[2]}</p></div>`;
  vg.appendChild(c);
});

const missions=[
['MISSÃO 01','O PROBLEMA DOS RESÍDUOS','CENTRO HISTÓRICO','Resíduos e descarte inadequado.','LUNA • JULIANE','Investigar, localizar e reduzir o foco de resíduos.','♻️ 250 PONTOS DE SUSTENTABILIDADE'],
['MISSÃO 02','SINAIS DE POLUIÇÃO','ÁREA INDUSTRIAL','Sinais de contaminação e fumaça.','ÍRIS • THEO','Analisar dados e identificar a origem do problema.','💎 90 CRISTAIS VERDES'],
['MISSÃO 03','PROTEÇÃO DAS ÁGUAS','PRAIAS','Contaminação das águas.','ANDREW • LUNA','Localizar o foco e iniciar a purificação.','🏅 MEDALHA GUARDIÃO DAS ÁGUAS'],
['MISSÃO 04','RECUPERAÇÃO AMBIENTAL','ÁREA DEGRADADA','Território comprometido pela degradação.','AMANDA • HELOA','Aplicar transformação e recuperar a área.','⚡ NOVA HABILIDADE'],
['MISSÃO 05','ENERGIA E POLUIÇÃO','ITAQUI-BACANGA','Conflito entre energia e impacto.','THEO • ÍRIS','Otimizar o sistema e reduzir o desperdício.','💎 140 CRISTAIS VERDES'],
['MISSÃO 06','O CHAMADO DA NATUREZA','ÁREA NATURAL','Ameaça à biodiversidade.','JULIANE • LUNA','Proteger a fauna e a flora.','🦸 NOVO GUARDIÃO'],
['MISSÃO ESPECIAL','O CÍRCULO NEGRO','ÁREA INDUSTRIAL','Interferência de , Max e Ryan.','GUI • VICTOR • NETO','Descobrir os planos do círculo.','🗺️ NOVA ÁREA'],
['MISSÃO ESPECIAL','AS IRMÃS MORTE','PRAIAS','Névoa e Machado ampliam a ameaça tóxica.','ANDREW • HELOA','Conter ar contaminado e águas residuais.','🏅 MEDALHA ESPECIAL'],
['MISSÃO FINAL','CONFRONTO CONTRA TRITANUS','ÁREA FINAL','Resíduos, poluição, contaminação e degradação acumulados.','TODOS','Cooperar para proteger a ilha.','🌱 RECUPERAÇÃO DA ILHA']
];
const ml=$('#missionList');missions.forEach((m,i)=>{const b=document.createElement('button');b.className='mission-item'+(i===0?' active':'');b.innerHTML=`<b>${m[0]}</b><span>${m[1]}</span><small>${m[2]}</small>`;b.onclick=()=>setMission(i);ml.appendChild(b)});
function setMission(i){const m=missions[i];$$('.mission-item').forEach((b,j)=>b.classList.toggle('active',j===i));$('#missionLocal').textContent=m[2];$('#missionStatus').textContent=i<6?'DISPONÍVEL':'SPECIAL';$('#missionTitle').textContent=m[1];$('#mProblem').textContent=m[3];$('#mGuard').textContent=m[4];$('#mObjective').textContent=m[5];$('#mReward').textContent=m[6];}

const curiosities=[
['01','O NOME ECO NEXA','“Eco” representa ecologia. “Nexa” representa conexão.'],
['02','A NEX É UMA IA','Ela possui função narrativa e funcional dentro do universo.'],
['03','SÃO LUÍS VIROU UNIVERSO','A cidade influencia mapa, narrativa e identidade.'],
['04','CULTURA VIROU PODER','Larissa utiliza referências ao reggae e aos tambores maranhenses.'],
['05','OS VILÕES SÃO PROBLEMAS','A poluição ganhou forma para virar conflito visual.'],
['06','CADA GUARDIÃO TEM UMA FUNÇÃO','Nenhum poder existe apenas por estética.']
];
const cg=$('#curiosityGrid');curiosities.forEach(c=>{const e=document.createElement('article');e.className='curiosity';e.innerHTML=`<small>${c[0]}</small><h3>${c[1]}</h3><p>${c[2]}</p>`;cg.appendChild(e)});

const stats=$$('.stat strong[data-count]');
const statObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.done){e.target.dataset.done='1';const end=+e.target.dataset.count;let n=0;const step=Math.max(1,Math.ceil(end/22));const timer=setInterval(()=>{n=Math.min(end,n+step);e.target.textContent=n;if(n>=end)clearInterval(timer)},45)}}),{threshold:.7});
stats.forEach(s=>statObs.observe(s));

const finalePs=$$('#finaleScript p');
const finaleObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){finalePs.forEach((p,i)=>setTimeout(()=>p.classList.add('active'),i*600));finaleObs.disconnect()}}),{threshold:.3});
finaleObs.observe($('#finaleScript'));

$('#modalClose').addEventListener('click',closeModal);$('[data-close="1"]').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function closeModal(){$('#modal').classList.remove('show');$('#modal').setAttribute('aria-hidden','true')}

// Visual archive: real submitted character art cropped from the uploaded boards.
const galleries={
  guardioes:[
    ['Luna','Guardiã da Natureza','assets/character-luna.jpg'],['Íris','Guardiã da Tecnologia','assets/character-iris.jpg'],['Andrew','Guardião das Águas','assets/character-andrew.jpg'],['Theo','Guardião da Energia','assets/character-theo.jpg'],['Gui','Guardião da Invisibilidade','assets/character-gui.jpg'],['Henrique','Guardião do Gelo Eterno','assets/character-henrique.jpg'],['Neto','Guardião da Velocidade','assets/character-neto.jpg'],['Victor','Guardião da Força','assets/character-victor.jpg'],['Heloa','Guardiã do Sol','assets/character-heloa.jpg'],['Amanda','Guardiã das Chamas','assets/character-amanda.jpg'],['Larissa','Guardiã da Música','assets/character-larissa.jpg'],['Juliane','Guardiã dos Animais','assets/character-juliane.jpg']
  ],
  viloes:[
    ['Valtor','Senhor do Lixo','assets/character-valtor.jpg'],['Tritanus','Guardião do Ar / grande ameaça','assets/character-tritanus.jpg'],['Stormy','Guardião da Poluição','assets/character-stormy.jpg'],['Darron','Guardião das Águas','assets/character-darron.jpg']
  ],
  extras:[
    ['Névoa & Machado','Irmãs — Morte','assets/character-nevoa-machado.jpg'],['Ryan','Poder — Vórtice da Extinção','assets/character-ryan-character.jpg'],['Max','Poder — Vórtice da Extinção','assets/character-max.jpg'],['John','Poder — Vórtice da Extinção','assets/character-john.jpg']
  ]
};
const visualGallery=$('#visualGallery');
function renderGallery(key){ if(!visualGallery)return; visualGallery.innerHTML=galleries[key].map(v=>`<article class="visual-card"><img loading="lazy" src="${v[2]}" alt="${v[0]} — ${v[1]}"><div class="visual-caption"><span>ARTE DO PROJETO</span><b>${v[0]}</b><span>${v[1]}</span></div></article>`).join(''); }
renderGallery('guardioes');
$$('.visual-tab').forEach(btn=>btn.addEventListener('click',()=>{$$('.visual-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderGallery(btn.dataset.gallery)}));
