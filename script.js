const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={sustain:2450,crystals:84,medals:6,quizBest:0,games:0,sound:false};

// Tela de inicialização: NÃO espera imagens, fontes ou recursos externos.
// Isso evita ficar presa quando o navegador está offline ou uma fonte externa demora.
(function initBoot(){
  const boot=document.getElementById('boot');
  if(!boot)return;
  let closed=false;
  const closeBoot=()=>{
    if(closed)return;
    closed=true;
    boot.classList.add('boot-ready');
    setTimeout(()=>boot.remove(),500);
  };
  // Libera a interface assim que o HTML/JS estiver pronto.
  const start=()=>setTimeout(closeBoot,650);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
  // Failsafe absoluto: mesmo se algum recurso externo travar, a tela sai.
  setTimeout(closeBoot,2500);
})();
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
function sound(type){if(!state.sound)return;try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=type==='win'?740:type==='error'?170:420;g.gain.value=.035;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.09)}catch(e){}}
$('#soundToggle').onclick=()=>{state.sound=!state.sound;$('#soundToggle').innerHTML=state.sound?'🔊 <span>SOM ON</span>':'🔊 <span>SOM</span>';toast(state.sound?'🔊 SOM ATIVADO':'🔇 SOM DESATIVADO')};
$('#menuToggle').onclick=()=>$('#mainMenu').classList.toggle('open');
$$('#mainMenu a').forEach(a=>a.onclick=()=>$('#mainMenu').classList.remove('open'));
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;$('#pageProgress').style.width=(scrollY/h*100)+'%';$('#nav').classList.toggle('scrolled',scrollY>30);$('#topBtn').classList.toggle('show',scrollY>500)});
$('#topBtn').onclick=()=>scrollTo({top:0,behavior:'smooth'});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(x=>io.observe(x));
for(let i=0;i<70;i++){let p=document.createElement('i');p.className='particle';p.style.left=Math.random()*100+'%';p.style.top=(70+Math.random()*30)+'%';p.style.animationDuration=(5+Math.random()*9)+'s';p.style.animationDelay=(-Math.random()*10)+'s';$('#particles').append(p)}

const characters={
 luna:{name:'LUNA',role:'GUARDIÃ DA NATUREZA',skill:'REGENERAR',desc:'Recupera áreas degradadas e devolve vitalidade aos ambientes.',img:'assets/personagens/luna.jpeg',stats:[['NATUREZA',100],['COMBATE',72],['TECNOLOGIA',42],['VELOCIDADE',78]]},
 iris:{name:'ÍRIS',role:'GUARDIÃ DA TECNOLOGIA',skill:'ANALISAR',desc:'Utiliza a NEX para identificar problemas, pistas e vulnerabilidades.',img:'assets/personagens/iris.jpeg',stats:[['NATUREZA',48],['COMBATE',58],['TECNOLOGIA',100],['VELOCIDADE',82]]},
 andrew:{name:'ANDREW',role:'GUARDIÃO DAS ÁGUAS',skill:'PURIFICAR',desc:'Reduz a contaminação das áreas aquáticas.',img:'assets/personagens/andrew.jpeg',stats:[['NATUREZA',70],['COMBATE',78],['TECNOLOGIA',55],['VELOCIDADE',73]]},
 theo:{name:'THEO',role:'GUARDIÃO DA ENERGIA',skill:'OTIMIZAR',desc:'Reduz desperdícios e melhora a eficiência energética.',img:'assets/personagens/theo.jpeg',stats:[['NATUREZA',52],['COMBATE',76],['TECNOLOGIA',72],['VELOCIDADE',96]]}
};
const villains={
 valtor:{name:'VALTOR',role:'SENHOR DO LIXO',problem:'RESÍDUOS • DESCARTE INADEQUADO • ACÚMULO',weak:'RECICLAGEM',img:'assets/viloes/valtor.jpeg',threat:82,energy:100},
 stormy:{name:'STORMY',role:'DAMA DA TEMPESTADE',problem:'POLUIÇÃO ATMOSFÉRICA',weak:'REDUÇÃO DA POLUIÇÃO',img:'assets/viloes/stormy.jpeg',threat:88,energy:100},
 ogron:{name:'OGRON',role:'MONSTRO DAS ILUSÕES',problem:'CONTAMINAÇÃO DAS ÁGUAS',weak:'PRESERVAÇÃO DAS ÁGUAS',img:'assets/viloes/ogron.jpeg',threat:91,energy:100},
 tritanus:{name:'TRITANUS',role:'O GRANDE VILÃO',problem:'ACÚMULO DA DEGRADAÇÃO AMBIENTAL',weak:'UNIÃO DOS GUARDIÕES',img:'assets/viloes/tritanus.jpeg',threat:100,energy:100}
};
function openModal(html){$('#modalContent').innerHTML=html;$('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false')}
function closeModal(){$('#modal').classList.remove('show');$('#modal').setAttribute('aria-hidden','true')}
$('.modal-close').onclick=closeModal;$('.modal-backdrop').onclick=closeModal;
$$('.character-card').forEach(c=>c.onclick=()=>{let d=characters[c.dataset.character];openModal(`<div class="modal-character"><img src="${d.img}" alt="${d.name}"><div class="modal-content"><small>${d.role}</small><h2>${d.name}</h2><strong>${d.skill}</strong><p>${d.desc}</p>${d.stats.map(s=>`<div class="stat-row"><label><span>${s[0]}</span><span>${s[1]}%</span></label><i><em style="width:${s[1]}%"></em></i></div>`).join('')}</div></div>`)});
$$('.villain-card').forEach(c=>c.onclick=()=>{let d=villains[c.dataset.villain];openModal(`<div class="modal-character"><img src="${d.img}" alt="${d.name}"><div class="modal-content"><small>${d.role}</small><h2>${d.name}</h2><p><b>PROBLEMA REPRESENTADO:</b><br>${d.problem}</p><p><b>FRAQUEZA:</b><br><span style="color:#ff762e">${d.weak}</span></p><div class="stat-row"><label><span>NÍVEL DE AMEAÇA</span><span>${d.threat}%</span></label><i><em style="width:${d.threat}%;background:linear-gradient(90deg,#ff762e,#ff3d3d)"></em></i></div><div class="stat-row"><label><span>ENERGIA</span><span>${d.energy}%</span></label><i><em style="width:${d.energy}%;background:linear-gradient(90deg,#9d6cff,#ff3d3d)"></em></i></div></div></div>`)});

function updateHUD(){['sustainability','pSustain'].forEach(id=>$(id).textContent=state.sustain.toLocaleString('pt-BR'));['crystals','pCrystals'].forEach(id=>$(id).textContent=state.crystals);$('#medals').textContent=state.medals}
$$('.mission-btn').forEach(btn=>btn.onclick=()=>{let r=+btn.dataset.reward;state.sustain+=r;state.crystals+=Math.ceil(r/50);updateHUD();btn.textContent='CONCLUÍDA ✓';btn.disabled=true;btn.closest('.mission').style.borderColor='rgba(76,255,155,.5)';toast(`🌱 +${r.toLocaleString('pt-BR')} SUSTENTABILIDADE!`);sound('win');if(btn.closest('.mission').classList.contains('boss-mission'))toast('🏆 NOVA CONQUISTA! GUARDIÃO DA ILHA')});

$$('.map-node').forEach(n=>n.onclick=()=>{if(n.classList.contains('locked')){toast('🔒 ÁREA BLOQUEADA — complete mais missões');sound('error')}else toast(`🗺️ ${n.dataset.area} selecionada`)});

let combatHp=100,lunaHp=100;
$$('.skill-row button').forEach(b=>b.onclick=()=>{if(combatHp<=0)return;const skill=b.dataset.skill;let dmg={regenerar:13,analisar:20,purificar:18,otimizar:15}[skill];combatHp=Math.max(0,combatHp-dmg);lunaHp=Math.max(0,lunaHp-(Math.random()<.18?0:6));$('#valtorBar').style.width=combatHp+'%';$('#valtorHp').textContent=combatHp+'%';$('#lunaBar').style.width=lunaHp+'%';$('#combatLog').textContent=`${skill.toUpperCase()} • -${dmg} HP`;sound('click');if(combatHp===0){$('#combatLog').textContent='VILÃO DERROTADO!';toast('🏆 VILÃO DERROTADO! +500 SUSTENTABILIDADE');state.sustain+=500;state.crystals+=10;updateHUD();sound('win')}else if(lunaHp===0){$('#combatLog').textContent='LUNA PRECISA DE REFORÇOS';toast('⚠️ LUNA ESTÁ SEM ENERGIA');sound('error')}});

const scans=[['CONTAMINAÇÃO','72%','ÁREA AQUÁTICA','Investigue a fonte antes de agir.'],['RESÍDUOS','86%','CENTRO HISTÓRICO','Classifique os materiais antes de recolher.'],['DESPERDÍCIO ENERGÉTICO','64%','ITAQUI-BACANGA','Analise o sistema e reduza os pontos de perda.'],['DEGRADAÇÃO','93%','ÁREA DEGRADADA','Ative a regeneração somente após identificar a causa.']];
let scanI=0;$('#scanBtn').onclick=()=>{let s=scans[scanI++%scans.length];$('#nexProblem').textContent=s[0];$('#nexLevel').textContent=s[1];$('#nexOrigin').textContent=s[2];$('#nexRecommendation').textContent='"'+s[3]+'"';$('#nexMeter').style.width=s[1];toast('🤖 ANÁLISE NEX CONCLUÍDA');sound('click')};

const questions=[
['Uma área da cidade perdeu grande parte de sua vegetação e está sofrendo com degradação do solo. Quem deve agir?','luna','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Luna usa REGENERAR para recuperar áreas degradadas.'],
['Perto das praias, a equipe encontra resíduos na água e sinais de contaminação.','andrew','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Andrew é o Guardião das Águas e atua com PURIFICAR.'],
['A NEX detectou um problema ambiental, mas ninguém sabe sua origem.','iris','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Íris ANALISA dados, pistas e vulnerabilidades.'],
['Uma instalação está desperdiçando muita energia e precisa ficar mais eficiente.','theo','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Theo pode OTIMIZAR sistemas e reduzir desperdícios.'],
['Uma praça foi tomada por resíduos descartados de forma inadequada. Quem combina melhor com a missão?','luna','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','A recuperação do ambiente pede a capacidade de REGENERAR de Luna.'],
['Sensores apontam uma anomalia, mas existem várias causas possíveis e a equipe precisa cruzar informações.','iris','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Íris deve ANALISAR os dados antes da ação.'],
['Uma área de mangue apresenta sinais de contaminação e a água precisa ser recuperada.','andrew','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Andrew PURIFICA e reduz a contaminação de áreas aquáticas.'],
['Um prédio mantém equipamentos ligados sem necessidade e consome energia demais.','theo','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Theo OTIMIZA o uso da energia e reduz desperdícios.'],
['Após uma ação de poluição, uma área verde perdeu vitalidade e precisa voltar a crescer.','luna','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Luna REGENERA ambientes e devolve vitalidade à natureza.'],
['Antes de enfrentar um grande problema, a equipe precisa entender os sinais e encontrar vulnerabilidades.','iris','🌿 LUNA','🔎 ÍRIS','💧 ANDREW','⚡ THEO','Íris usa a NEX para ANALISAR o cenário e orientar a equipe.']
];
let quiz=[],qi=0,score=0,combo=0,maxCombo=0,correct=0;
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function startQuiz(){quiz=shuffle(questions);qi=0;score=0;combo=0;maxCombo=0;correct=0;$('#quizIntro').classList.add('hidden');$('#quizResult').classList.add('hidden');$('#quizGame').classList.remove('hidden');renderQ()}
$('#startQuiz').onclick=startQuiz;
function renderQ(){let q=quiz[qi];$('#quizCount').textContent=`PERGUNTA ${qi+1}/10`;$('#quizScore').textContent=score;$('#quizCombo').textContent=combo;$('#quizProgress').style.width=((qi)/10*100+10)+'%';$('#quizQuestion').textContent=q[0];let opts=shuffle([{id:'luna',t:q[2]},{id:'iris',t:q[3]},{id:'andrew',t:q[4]},{id:'theo',t:q[5]}]);$('#quizAnswers').innerHTML=opts.map(o=>`<button class="quiz-answer" data-id="${o.id}">${o.t}</button>`).join('');$('#quizFeedback').classList.add('hidden');$('#nextQuestion').classList.add('hidden');$$('.quiz-answer').forEach(b=>b.onclick=()=>answer(b,q))}
function answer(btn,q){$$('.quiz-answer').forEach(b=>b.disabled=true);let ok=btn.dataset.id===q[1];btn.classList.add(ok?'correct':'wrong');if(ok){correct++;combo++;maxCombo=Math.max(maxCombo,combo);score+=100+Math.max(0,combo-1)*25;$('#quizFeedback').innerHTML=`<b>CORRETO! 🌿</b><br>${q[6]}<br><br><strong>+${100+Math.max(0,combo-1)*25} PONTOS • +1 COMBO</strong>`;$('#quizFeedback').classList.remove('hidden','bad');sound('win')}else{combo=0;$('#quizFeedback').innerHTML=`<b>QUASE!</b><br>${q[6]}<br><br>A missão é educativa: observe a habilidade que melhor corresponde ao problema.`;$('#quizFeedback').classList.remove('hidden');$('#quizFeedback').classList.add('bad');sound('error')}$('#quizScore').textContent=score;$('#quizCombo').textContent=combo;$('#nextQuestion').classList.remove('hidden')}
$('#nextQuestion').onclick=()=>{qi++;if(qi>=10)finishQuiz();else renderQ()};
function finishQuiz(){state.sustain+=score;state.crystals+=Math.floor(correct/2);if(correct>=7)state.medals++;updateHUD();state.quizBest=Math.max(state.quizBest,correct);$('#pQuiz').textContent=correct+'/10';$('#pAchievements').textContent=(correct===10?'3':'2')+'/6';let rank=correct<=3?'APRENDIZ DOS GUARDIÕES':correct<=6?'GUARDIÃO EM TREINAMENTO':correct<=9?'GUARDIÃO DA ILHA':'🌟 MESTRE DOS GUARDIÕES';$('#quizGame').classList.add('hidden');$('#quizResult').classList.remove('hidden');$('#quizResult').innerHTML=`<div class="eyebrow green">DESAFIO CONCLUÍDO</div><h3>${correct===10?'🌟 PERFEITO!':'MISSÃO FINALIZADA!'}</h3><div class="rank">${rank}</div><p>PONTUAÇÃO: <b>${score}</b> • ACERTOS: <b>${correct}/10</b> • ERROS: <b>${10-correct}</b> • MAIOR COMBO: <b>${maxCombo}</b></p>${correct>=7?'<p>✨ NOVA CONQUISTA DESBLOQUEADA!<br><b>🧠 CONHECEDOR DOS GUARDIÕES</b></p>':''}<button class="btn btn-primary" id="againQuiz">JOGAR NOVAMENTE</button>`;$('#againQuiz').onclick=startQuiz;toast(`🌱 +${score} SUSTENTABILIDADE!`);if(correct>=7){$('#quizAchievement').classList.remove('locked');$('#quizAchievement').classList.add('unlocked');$('#quizAchievement').querySelector('small').textContent='✓ DESBLOQUEADA'}sound('win')}

$$('.game-tabs button').forEach(t=>t.onclick=()=>{ $$('.game-tabs button').forEach(x=>x.classList.remove('active'));t.classList.add('active');$$('.game-panel').forEach(x=>x.classList.remove('active'));$('#'+t.dataset.game+'Game').classList.add('active')});

let br={running:false,score:0,lives:3,combo:0,x:380,y:385,dx:4,dy:-4,paddle:110,px:345,blocks:[],raf:0};
const canvas=$('#breakCanvas'),ctx=canvas.getContext('2d');
function resetBreaker(){br.score=0;br.lives=3;br.combo=0;br.x=400;br.y=380;br.dx=4;br.dy=-4;br.px=345;br.blocks=[];for(let r=0;r<4;r++)for(let c=0;c<10;c++)br.blocks.push({x:40+c*72,y:35+r*28,w:62,h:18,on:true});$('#breakScore').textContent=0;$('#breakLives').textContent=3;$('#breakCombo').textContent=0}
function drawBreaker(){ctx.clearRect(0,0,800,430);ctx.strokeStyle='rgba(38,217,255,.08)';for(let x=0;x<800;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,430);ctx.stroke()}for(let b of br.blocks)if(b.on){ctx.fillStyle='rgba(76,255,155,.72)';ctx.shadowBlur=12;ctx.shadowColor='#4cff9b';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.shadowBlur=0}ctx.fillStyle='#26d9ff';ctx.fillRect(br.px,410,br.paddle,9);ctx.beginPath();ctx.arc(br.x,br.y,7,0,Math.PI*2);ctx.fillStyle='#fff';ctx.shadowBlur=18;ctx.shadowColor='#26d9ff';ctx.fill();ctx.shadowBlur=0}
function breakerLoop(){if(!br.running)return;br.x+=br.dx;br.y+=br.dy;if(br.x<7||br.x>793)br.dx*=-1;if(br.y<7)br.dy*=-1;if(br.y>400&&br.x>br.px&&br.x<br.px+br.paddle&&br.dy>0){br.dy=-Math.abs(br.dy);br.combo++;$('#breakCombo').textContent=br.combo}if(br.y>440){br.lives--;$('#breakLives').textContent=br.lives;br.x=400;br.y=380;br.dy=-4;br.combo=0;$('#breakCombo').textContent=0;if(br.lives<=0){br.running=false;toast('💥 ECO BREAKER: tente novamente');sound('error')}}for(let b of br.blocks)if(b.on&&br.x>b.x&&br.x<b.x+b.w&&br.y>b.y&&br.y<b.y+b.h){b.on=false;br.dy*=-1;br.score+=10;$('#breakScore').textContent=br.score;break}if(br.blocks.every(b=>!b.on)){br.running=false;state.games++;$('#pGames').textContent=state.games;state.sustain+=300;updateHUD();toast('🌱 ILHA RECUPERADA! +300 SUSTENTABILIDADE');sound('win')}drawBreaker();br.raf=requestAnimationFrame(breakerLoop)}
$('#breakStart').onclick=()=>{resetBreaker();br.running=true;cancelAnimationFrame(br.raf);breakerLoop()};
function moveP(x){br.px=Math.max(0,Math.min(800-br.paddle,x-canvas.getBoundingClientRect().left-br.paddle/2))}
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')br.px-=28;if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')br.px+=28;br.px=Math.max(0,Math.min(800-br.paddle,br.px))});
canvas.addEventListener('pointermove',e=>moveP(e.clientX));
resetBreaker();drawBreaker();

let collectTimer,collectRunning=false,collectScore=0,collectCount=0;
const trash=['🟢','🔵','🟡','🟤','♻️'];
function spawnTrash(){const a=$('#collectArena');a.innerHTML='';for(let i=0;i<18;i++){let d=document.createElement('button');d.className='trash';d.textContent=trash[Math.floor(Math.random()*trash.length)];d.style.left=Math.random()*90+'%';d.style.top=Math.random()*82+'%';d.style.animationDelay=(-Math.random()*2)+'s';d.onclick=()=>{if(!collectRunning)return;collectCount++;collectScore+=10;$('#collectCount').textContent=collectCount;$('#collectScore').textContent=collectScore;d.remove();sound('click')}}a.dataset.started='1'}
$('#collectStart').onclick=()=>{clearInterval(collectTimer);collectRunning=true;collectScore=0;collectCount=0;$('#collectScore').textContent=0;$('#collectCount').textContent=0;$('#collectTime').textContent=30;spawnTrash();let t=30;collectTimer=setInterval(()=>{t--;$('#collectTime').textContent=t;if(t<=0){clearInterval(collectTimer);collectRunning=false;state.games++;state.sustain+=collectCount*5;$('#pGames').textContent=state.games;updateHUD();toast(`♻️ Você coletou ${collectCount} resíduos!`);sound('win')}},1000)};

let memValues=['🌿','💧','⚡','♻️','🤖','🌎'],mem=[],first=null,lock=false,moves=0,pairs=0;
function setupMemory(){mem=shuffle([...memValues,...memValues]);first=null;lock=false;moves=0;pairs=0;$('#memoryMoves').textContent=0;$('#memoryPairs').textContent=0;$('#memoryBoard').innerHTML=mem.map((v,i)=>`<button class="memory-card" data-i="${i}" data-v="${v}">?</button>`).join('');$$('.memory-card').forEach(c=>c.onclick=()=>flip(c))}
function flip(c){if(lock||c.classList.contains('flipped')||c.classList.contains('matched'))return;c.classList.add('flipped');c.textContent=c.dataset.v;if(!first){first=c;return}moves++;$('#memoryMoves').textContent=moves;if(first.dataset.v===c.dataset.v){first.classList.add('matched');c.classList.add('matched');pairs++;$('#memoryPairs').textContent=pairs;first=null;if(pairs===6){state.games++;state.sustain+=400;$('#pGames').textContent=state.games;updateHUD();toast('🤖 ANÁLISE CONCLUÍDA! +400 SUSTENTABILIDADE');sound('win')}}else{lock=true;let a=first;setTimeout(()=>{a.classList.remove('flipped');c.classList.remove('flipped');a.textContent=c.textContent='?';first=null;lock=false},650);sound('error')}}
$('#memoryStart').onclick=setupMemory;setupMemory();

const edu={
residuos:['♻️ RESÍDUOS','Separar materiais, reduzir descartáveis e dar destino adequado aos resíduos ajuda a diminuir impactos no ambiente.'],
agua:['💧 ÁGUA','Evitar desperdícios e impedir que lixo e contaminantes cheguem aos corpos d’água são atitudes importantes para proteger esse recurso.'],
energia:['⚡ ENERGIA','Usar equipamentos de forma eficiente e evitar desperdício reduz o consumo e pode diminuir impactos ambientais.'],
natureza:['🌿 NATUREZA','Preservar áreas verdes e recuperar ambientes degradados ajuda a proteger biodiversidade, solo e qualidade de vida.']
};
$$('.edu-card').forEach(c=>c.onclick=()=>{let d=edu[c.dataset.edu];openModal(`<div class="modal-content"><small>APRENDIZADO NEX</small><h2>${d[0]}</h2><p>${d[1]}</p></div>`)});
