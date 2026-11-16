/* ---------- race ---------- */
const bits=n=>{let c=0;while(n){c+=n&1;n>>=1}return c};
const St=()=>P.stats;
const ACH=[
{id:'first',n:'Primera carrera',d:'Termina una carrera',r:50,p:()=>[St().races,1]},
{id:'win1',n:'Primera victoria',d:'Gana una carrera',r:100,p:()=>[St().wins,1]},
{id:'win10',n:'Veterano',d:'Gana 10 carreras',r:300,p:()=>[St().wins,10]},
{id:'pod5',n:'Habitual del podio',d:'Termina en el top 3 cinco veces',r:150,p:()=>[St().pod,5]},
{id:'clean',n:'Conducción limpia',d:'Termina una carrera sin choques',r:100,p:()=>[St().clean,1]},
{id:'champ',n:'Campeón',d:'Gana un campeonato',r:400,p:()=>[St().champs,1]},
{id:'nitro25',n:'Pie a fondo',d:'Usa el nitro 25 veces',r:100,p:()=>[St().nitro,25]},
{id:'drift10',n:'Rey del derrape',d:'Carga nitro derrapando 10 veces',r:150,p:()=>[St().drift,10]},
{id:'jump10',n:'Acróbata',d:'Aterriza 10 saltos',r:100,p:()=>[St().jump,10]},
{id:'pit1',n:'Parada perfecta',d:'Reposta en boxes',r:100,p:()=>[St().pit,1]},
{id:'nopit',n:'Sin paradas',d:'Gana 6+ vueltas sin entrar a boxes',r:200,p:()=>[St().noPit,1]},
{id:'over50',n:'Adelantador',d:'Adelanta a 50 rivales',r:150,p:()=>[St().over,50]},
{id:'rain',n:'Bajo la lluvia',d:'Gana con lluvia',r:150,p:()=>[St().rainWin,1]},
{id:'night',n:'Piloto nocturno',d:'Gana de noche',r:150,p:()=>[St().nightWin,1]},
{id:'tour',n:'Vuelta al mundo',d:'Gana en los 8 países',r:500,p:()=>[bits(St().won),8]},
{id:'speed',n:'Récord de velocidad',d:'Supera los 330 km/h',r:100,p:()=>[St().top,330]},
{id:'upg',n:'Mecánico',d:'Compra una mejora',r:50,p:()=>[St().ups,1]},
{id:'rep',n:'Director de cine',d:'Mira una repetición',r:50,p:()=>[St().replays,1]},
{id:'swap',n:'Estratega',d:'Cambia de neumáticos en boxes',r:80,p:()=>[St().swap,1]},
{id:'fix',n:'Taller',d:'Repara más del 30% de daño en boxes',r:80,p:()=>[St().fix,1]},
{id:'lv5',n:'Piloto pro',d:'Llega al nivel 5',r:200,p:()=>[lvlOf(P.xp),5]},
{id:'lv10',n:'Leyenda en ascenso',d:'Llega al nivel 10',r:400,p:()=>[lvlOf(P.xp),10]}];
const DEF={u:4,k:3,c:0,up:{top:0,acc:0,grip:0},set:{mus:.7,eng:.85,sfx:.8,q:1,dif:1,tyre:1,wx:0,vib:1,tilt:0,fps:0,auto:1},xp:0,stats:{races:0,wins:0,swap:0,fix:0,pod:0,clean:0,nitro:0,drift:0,jump:0,pit:0,over:0,dist:0,time:0,top:0,champs:0,won:0,rainWin:0,nightWin:0,noPit:0,replays:0,ups:0},paint:[0,0,0,0,0],ach:[],champ:null};
const nn=(v,a,b,d)=>(v!==null&&v!==''&&v!==undefined&&Number.isFinite(+v))?Math.max(a,Math.min(b,+v)):d;
function loadSave(){let r=null;for(const k of['tc_p','tc_p_bak']){try{const j=JSON.parse(localStorage.getItem(k)||'null');if(j&&typeof j==='object'){r=j;break}}catch(e){}}r=r||{};
 const o=JSON.parse(JSON.stringify(DEF)),u=r.up||{},se=r.set||{},ss=r.stats||{};
 o.u=Math.round(nn(r.u,1,8,4));o.k=Math.round(nn(r.k,1,5,3));o.c=Math.round(nn(r.c,0,1e9,0));
 for(const k of['top','acc','grip'])o.up[k]=Math.round(nn(u[k],0,5,0));
 o.set.mus=nn(se.mus,0,1,.7);o.set.eng=nn(se.eng,0,1,.85);o.set.sfx=nn(se.sfx,0,1,.8);o.set.q=Math.round(nn(se.q,0,2,1));o.xp=Math.round(nn(r.xp,0,1e9,0));o.set.dif=Math.round(nn(se.dif,0,3,1));o.set.wx=Math.round(nn(se.wx,0,4,0));o.set.tyre=Math.round(nn(se.tyre,0,3,1));o.set.vib=se.vib===0?0:1;o.set.tilt=se.tilt?1:0;o.set.fps=se.fps?1:0;o.set.auto=se.auto===0?0:1;
 for(const k of Object.keys(DEF.stats))o.stats[k]=Math.round(nn(ss[k],0,1e12,0));o.ach=Array.isArray(r.ach)?r.ach.filter(x=>typeof x==='string'&&ACH.some(a=>a.id===x)):[];o.paint=[0,1,2,3,4].map(i=>Math.round(nn(r.paint&&r.paint[i],0,10,0)));
 const c=r.champ;if(c&&Array.isArray(c.pts)&&c.pts.length===8&&Number.isFinite(+c.r)&&Number.isFinite(+c.n)&&c.n>=1&&c.n<=8)o.champ={r:Math.min(7,Math.max(0,Math.round(+c.r))),n:Math.round(+c.n),l:Math.round(nn(c.l,3,8,6)),pts:c.pts.map(x=>nn(x,0,1e6,0)),dmg:nn(c.dmg,0,1,0),pos:Array.from({length:8},(_,i)=>Array.isArray(c.pos&&c.pos[i])?c.pos[i].slice(0,8).map(x=>nn(x,1,8,8)):[])};
 return o}
let P=loadSave(),mode2=0,lapSel=6,champ=P.champ,dif=P.set.dif;setQ(P.set.q);
function save(){P.champ=champ;P.set.dif=dif;try{const old=localStorage.getItem('tc_p');if(old)localStorage.setItem('tc_p_bak',old);localStorage.setItem('tc_p',JSON.stringify(P))}catch(e){}}
function achCheck(){let ch=false;for(const a of ACH){if(P.ach.includes(a.id))continue;const[c,m]=a.p();if(c>=m){P.ach.push(a.id);P.c=(P.c||0)+a.r;achQ.push(a);ch=true}}if(ch){save();achShow()}}
function achShow(){const b=$('achb');if(!b||!achQ.length||b._on)return;const a=achQ.shift();b._on=true;b.innerHTML=`🏅 <b>${a.n}</b><br><small>${a.d} · +${a.r} 💰</small>`;b.classList.add('show');sfx('ach');setTimeout(()=>{b.classList.remove('show');setTimeout(()=>{b._on=false;achShow()},400)},3200)}
function abodyHtml(){return ACH.map(a=>{const d=P.ach.includes(a.id),[c,m]=a.p(),q=Math.min(1,c/m);return `<div class="ach ${d?'ok':''}"><div class="ai">${d?'🏅':'🔒'}</div><div style="flex:1"><b>${a.n}</b><small>${a.d}</small><div class="ab"><i style="width:${Math.round(q*100)}%"></i></div></div><div class="ar">+${a.r} 💰</div></div>`}).join('')}
function podium(R){return `<div class="pod">${[1,0,2].map(j=>`<div class="pc"><div class="pn">${NM[R[j]]}</div><div class="pb p${j+1}" style="height:${[92,66,50][j]}px">${['🥇','🥈','🥉'][j]}<small>${champ.pts[R[j]]} pts</small></div></div>`).join('')}</div>`}
const TY=[{n:'Blandos',d:'Más agarre, se gastan rápido',g:1.1,w:1.6,r:1,col:'#ff3d5a'},{n:'Medios',d:'Equilibrados',g:1,w:1,r:1,col:'#ffd400'},{n:'Duros',d:'Duran mucho, menos agarre',g:.94,w:.6,r:1,col:'#f2f4f8'},{n:'Lluvia',d:'Para pista mojada',g:.88,w:1.2,r:.25,col:'#3dd6ff'}];
const XPB=[100,70,50,30,20,15,10,5],TITLES=['Novato','Aficionado','Piloto','Piloto pro','Veterano','Experto','Maestro','Leyenda'];
function lvlOf(x){return Math.min(30,Math.floor((Math.sqrt(1+8*x/100)-1)/2)+1)}
function lvXp(l){return 100*(l-1)*l/2}
const COIN=[150,100,70,40,30,20,15,10],PT=[10,8,6,5,4,3,2,1],NM=['Tú','Vega','Rossi','Kato','Hahn','Silva','Brown','Cruz'];
const PROF=[{top:1,cor:.6,agg:.9,err:.15,brk:.6},{top:.92,cor:.95,agg:.4,err:.08,brk:.7},{top:.96,cor:.75,agg:.5,err:.1,brk:.6},{top:.94,cor:.8,agg:.5,err:.07,brk:.95},{top:.95,cor:.7,agg:.85,err:.12,brk:.6},{top:.88,cor:.7,agg:.2,err:.05,brk:.7},{top:1,cor:.5,agg:.8,err:.3,brk:.5}];
const RCOL=['#8a35ff','#2468ff','#e0243a','#f2f4f8','#2b2b36','#8e44ad','#d8d8e0'];
function start(){if(ki>=P.k)return;
 if(mode2===0){if(!champ)champ={r:0,n:P.u,l:lapSel,pts:Array(8).fill(0),pos:Array.from({length:8},()=>[])};ci=champ.r}else champ=null;
 if(ci>=P.u)return;
 LAPS=mode2===0?champ.l:lapSel;usePit=LAPS>5;initAudio();applyVol();clearTimeout(resT);paused=false;
 const c=CT[ci];build(c);pos=0;px=0;pgy=camG=ph=gh(0);air=false;vy=0;wear=0;fuel=1;svc=0;svcDone=false;speed=0;st=0;t=0;clk=0;cd=3.2;nit=CARS[ki].nc;nitT=0;fin=0;doneT=0;bgx=0;
 lapIdx=0;lapStart=0;musFast=false;lapTimes=[];dmg=(champ&&champ.dmg)||0;tyre=P.set.tyre;svcNeed=2.4;tWarn=0;wxStart();rainP=Array.from({length:90},()=>({x:Math.random()*W*1.3,y:Math.random()*H,l:8+Math.random()*10,v:520+Math.random()*260}));rec=[];recN=0;recOn=true;airT=0;lastRank=8;pitUsed=false;repOv=null;camHt=1000;
 try{if(typeof navigator!=='undefined'&&navigator.wakeLock)navigator.wakeLock.request('screen').then(w=>{wl=w}).catch(()=>{})}catch(e){}
hits=0;parts=[];shake=0;drift=0;hitCd=0;lastBeep=9;tT=0;goT=0;inLane=false;
 rivals=[];if(mode2!==2){const D=[.9,1,1.07,1.13][dif];for(let k=0;k<7;k++){const pf=PROF[k],l=k%2?.5:-.5;rivals.push({k,z:700+k*420,lane:l,off:l,tl:l,v:0,pf,sp:MAXS*(.64+(pf.top-.86)/.14*.29+ci*.015)*D,nT:0,nCd:4+k*2,mist:0,ft:0,col:RCOL[k]})}}
 mode='count';['home','menu','garage','sov','aov'].forEach(x=>$(x).classList.add('hide'));$('res').classList.add('hide');$('pause').classList.add('hide');$('ctl').classList.remove('hide');$('mute').classList.add('hide');save();startMusic(TR[TRK[ci]])}
function toMenu(){wx={rain:0,fog:0,night:0};wt={rain:0,fog:0,night:0};recOn=false;repOv=null;camHt=1000;try{if(wl)wl.release()}catch(e){}clearTimeout(resT);paused=false;stopMusic();mode='menu';['res','pause','ctl'].forEach(i=>$(i).classList.add('hide'));$('mute').classList.remove('hide');if(engG)engG.gain.value=0;go('home');if(AC&&curTh!==MENU)startMusic(MENU)}
function champRank(c){const n=(i,q)=>c.pos[i].filter(x=>x===q).length;return[0,1,2,3,4,5,6,7].sort((a,b)=>c.pts[b]-c.pts[a]||n(b,1)-n(a,1)||n(b,2)-n(a,2)||n(b,3)-n(a,3)||a-b)}
function finish(){
 if(mode==='done')return;mode='done';const tt=t,tl=mode2===2;
 const ord=[{i:0,z:pos,ft:tt},...rivals.map(r=>({i:r.k+1,z:r.z,ft:r.ft||tt+Math.max(0,LAPS*L-r.z)/Math.max(r.v,1500)}))];
 const byZ=[...ord].sort((a,b)=>b.z-a.z),rk=tl?1:byZ.findIndex(o=>o.i===0)+1;
 const gap=Math.max(0,tt-Math.min(...ord.map(o=>o.ft))),bl=lapTimes.length?Math.min(...lapTimes):0;
 const msg=[];let recT='',coins=tl?20:COIN[rk-1],bonus=0;
 try{const k='tc_r_'+ci+'_'+LAPS+'_'+dif+'_'+mode2,b0=+localStorage.getItem(k)||1e9;if(tt<b0){localStorage.setItem(k,tt);recT=b0<1e9?'🏁 ¡Nuevo récord del circuito!':'🏁 Primer récord registrado'}
  const kl='tc_l_'+ci+'_'+dif,b1=+localStorage.getItem(kl)||1e9;if(bl&&bl<b1){localStorage.setItem(kl,bl);bonus+=25;msg.push('⚡ Mejor vuelta del circuito +25')}}catch(e){}
 if(recT)msg.unshift(recT);
 if(!tl&&hits===0){bonus+=30;msg.push('✅ Carrera sin choques +30')}
 coins+=bonus;P.c=(P.c||0)+coins;P.stats.races++;if(rk===1&&!tl)P.stats.wins++;
 {const S=P.stats;if(rk<=3&&!tl)S.pod++;if(hits===0)S.clean++;S.dist+=Math.round(pos*.007);S.time+=Math.round(tt);if(rk===1&&!tl){S.won|=1<<ci;if(wx.rain>.5)S.rainWin++;if(wx.night>.5)S.nightWin++;if(usePit&&!pitUsed)S.noPit++}}
 {const l0=lvlOf(P.xp),xpg=(tl?30:XPB[rk-1])+bonus;P.xp+=xpg;msg.push('⭐ +'+xpg+' XP');for(let l=l0+1;l<=lvlOf(P.xp);l++){P.c+=50*l;msg.push('🆙 ¡Nivel '+l+'! +'+(50*l)+' 💰')}if(dmg>.05)msg.push('🔧 Daño del auto: '+Math.round(dmg*100)+'%'+(champ?' (la mitad se repara entre carreras)':''))}
 if(champ)byZ.forEach((o,j)=>{champ.pts[o.i]+=PT[j];champ.pos[o.i].push(j+1)});
 if(!tl&&rk<=3&&ci===P.u-1&&P.u<CT.length){P.u++;msg.push(`🔓 Nuevo país: ${CT[P.u-1].f} ${CT[P.u-1].n}`)}
 let tab='',btn,isLast=false,rcost=0;
 if(champ){const R=champRank(champ);tab='<div style="text-align:left;font-size:14px;width:min(340px,90vw)">'+R.map((id,j)=>`<div style="color:${id?'#fff':'#ffb020'}">${j+1}. ${NM[id]} — ${champ.pts[id]} pts</div>`).join('')+'</div>';
  isLast=champ.r+1>=champ.n;if(isLast){const fr=R.indexOf(0)+1;if(fr<=3&&P.k<CARS.length){P.k++;msg.push(`🔓 Auto nuevo: ${CARS[P.k-1].n}`)}msg.push(fr===1?'🏆 ¡Campeón!':'Campeonato terminado: '+fr+'º');if(fr===1)P.stats.champs++;tab=podium(R)+tab}}
 if(champ&&!isLast){champ.dmg=dmg*.5;rcost=Math.round(champ.dmg*200)}
 if(champ&&!isLast)btn='<button class="big" id="nx">Siguiente carrera</button><button class="opt" id="mn">Menú</button>'+(champ.dmg>.05?`<button class="opt" id="rfx">🔧 Reparar todo (💰${rcost})</button>`:'');
 else if(champ){btn='<button class="big" id="mn">Menú</button>';champ=null}
 else btn='<button class="big" id="again">Repetir</button>'+(mode2===1&&ci+1<P.u?'<button class="opt" id="nc">Siguiente país</button>':'')+'<button class="opt" id="mn">Menú</button>';
 achCheck();save();sfx(rk<=3?'win':'lose');recOn=false;
 resT=setTimeout(()=>{$('ctl').classList.add('hide');
  $('res').innerHTML=`<h1>${tl?'⏱ Contrarreloj':rk===1?'🏆 ¡Victoria!':rk+'º lugar'}</h1><p class="sub">${CT[ci].f} ${CT[ci].n} · ${CARS[ki].n} · ${['Fácil','Normal','Difícil','Experto'][dif]}</p>
  <div class="rg"><div><b>Tiempo</b>${fmt(tt)}</div><div><b>Mejor vuelta</b>${bl?fmt(bl):'—'}</div><div><b>Diferencia</b>${tl||rk===1?'Ganador':'+'+gap.toFixed(1)+'s'}</div><div><b>Puntos</b>${champ||isLast?'+'+PT[rk-1]:'—'}</div><div><b>Monedas</b>+${coins}</div><div><b>Choques</b>${hits}</div></div>
  <p class="sub">${msg.join('<br>')}</p>${tab}<div class="row">${btn}${rec.length>20?'<button class="opt" id="rpb">🎬 Repetición</button>':''}</div>`;
  $('res').classList.remove('hide');if(rk===1&&!tl)confetti();
  if($('again'))$('again').onclick=start;if($('nx'))$('nx').onclick=()=>{champ.r++;save();start()};if($('nc'))$('nc').onclick=()=>{ci++;start()};if($('mn'))$('mn').onclick=toMenu;if($('rfx'))$('rfx').onclick=()=>{if(P.c>=rcost){P.c-=rcost;champ.dmg=0;save();$('rfx').textContent='Reparado ✔';$('rfx').onclick=null}else toast('Monedas insuficientes')};if($('rpb'))$('rpb').onclick=repStart},1800)}
const WXN=['Despejado','Lluvia','Niebla','Noche','Dinámico'];
function wxSet(k){wt={rain:k===1?1:0,fog:k===2?1:k===1?.25:0,night:k===3?1:0}}
function wxStart(){const m=P.set.wx;if(m===4){wxSet(0);wx={rain:0,fog:0,night:0};wxT=25+Math.random()*25}else{wxSet(m);wx={rain:wt.rain,fog:wt.fog,night:wt.night}}}
function wxUpdate(dt){if(P.set.wx===4&&mode==='race'){wxT-=dt;if(wxT<=0){const k=Math.floor(Math.random()*4);wxSet(k);wxT=35+Math.random()*35;toast(['☀ Despeja','🌧 Empieza a llover','🌫 Llega la niebla','🌙 Anochece'][k])}}
 for(const k of['rain','fog','night']){const d=wt[k]-wx[k];wx[k]+=Math.sign(d)*Math.min(Math.abs(d),dt*.12)}
 for(const d of rainP){d.y+=d.v*dt;d.x-=d.v*.12*dt;if(d.y>H){d.y=-10;d.x=Math.random()*W*1.3}}
 if(wx.rain>.3&&mode==='race'&&speed>MAXS*.3&&Math.random()<.4)puff(W/2+(Math.random()<.5?-50:50),H*.93,'#9fb4d8',6)}
function drawWx(){const R=wx.rain,F=wx.fog,N_=wx.night;
 if(R>.01){g.fillStyle='rgba(30,42,70,'+.3*R+')';g.fillRect(0,0,W,H)}
 if(F>.01){const q=g.createLinearGradient(0,HOR-70,0,H*.78);q.addColorStop(0,'rgba(205,212,225,'+.96*F+')');q.addColorStop(.55,'rgba(205,212,225,'+.55*F+')');q.addColorStop(1,'rgba(205,212,225,0)');g.fillStyle=q;g.fillRect(0,0,W,H*.78)}
 if(N_>.01){const q=g.createRadialGradient(W/2,H*.82,30,W/2,H*.62,300);q.addColorStop(0,'rgba(4,6,28,0)');q.addColorStop(.35,'rgba(4,6,28,'+.35*N_+')');q.addColorStop(1,'rgba(4,6,28,'+.82*N_+')');g.fillStyle=q;g.fillRect(0,0,W,H);
  g.fillStyle='rgba(255,255,255,'+.8*N_+')';for(let i=0;i<40;i++)g.fillRect((i*97+((bgx*.1%W)+W))%W,(i*53)%(HOR*.75),1.5,1.5);
  g.save();g.globalCompositeOperation='lighter';const l=g.createLinearGradient(0,H*.92,0,HOR+10);l.addColorStop(0,'rgba(255,238,170,'+.28*N_+')');l.addColorStop(1,'rgba(255,238,170,0)');g.fillStyle=l;g.beginPath();g.moveTo(W/2-40,H*.9);g.lineTo(W/2-150,HOR+20);g.lineTo(W/2+150,HOR+20);g.lineTo(W/2+40,H*.9);g.closePath();g.fill();
  for(const r of rivals){if(r.sw>3){for(const sd of[-1,1]){const gx=r.sx+sd*r.sw*.35,gy=r.sy-r.sw*.16,q2=g.createRadialGradient(gx,gy,0,gx,gy,r.sw*.35);q2.addColorStop(0,'rgba(255,50,70,'+.8*N_+')');q2.addColorStop(1,'rgba(255,50,70,0)');g.fillStyle=q2;g.fillRect(gx-r.sw*.4,gy-r.sw*.4,r.sw*.8,r.sw*.8)}}}g.restore()}
 if(R>.05){g.strokeStyle='rgba(200,215,255,'+.45*R+')';g.lineWidth=1;g.beginPath();for(const d of rainP){g.moveTo(d.x,d.y);g.lineTo(d.x-d.l*.3,d.y+d.l)}g.stroke()}}
function vib(p){try{if(P.set.vib&&typeof navigator!=='undefined'&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
function spark(x,y){parts.push({x,y,vx:(Math.random()-.5)*260,vy:-Math.random()*180,l:.45,m:.45,c:'#ffd36b',s:2,g:600})}
function puff(x,y,c,s,vx){parts.push({x,y,vx:(vx||0)+(Math.random()-.5)*30,vy:-20-Math.random()*30,l:.7,m:.7,c,s:s||6,g:-10,grow:1})}
function drawParts(){for(const p of parts){g.globalAlpha=Math.max(0,p.l/p.m)*(p.grow?.55:1);g.fillStyle=p.c;const z=p.s*(p.grow?1+(1-p.l/p.m)*2.2:1);g.fillRect(p.x-z/2,p.y-z/2,z,z)}g.globalAlpha=1}
function confetti(){const cf=$('cf');if(!cf||!cf.getContext)return;cf.classList.remove('hide');const w=cf.width=cf.clientWidth||640,h=cf.height=cf.clientHeight||360,x=cf.getContext('2d'),C=['#ffd36b','#ff3d5a','#4dd2ff','#3ddc84','#ffffff'],Q=Array.from({length:120},()=>({x:Math.random()*w,y:-Math.random()*h,vx:(Math.random()-.5)*60,vy:90+Math.random()*140,r:Math.random()*6,c:C[Math.floor(Math.random()*5)],s:3+Math.random()*5}));let t0=performance.now();
 (function f(n){const dt=Math.min(.05,(n-t0)/1000);t0=n;x.clearRect(0,0,w,h);let al=0;for(const q of Q){q.x+=q.vx*dt;q.y+=q.vy*dt;q.r+=dt*6;if(q.y<h+20)al++;x.save();x.translate(q.x,q.y);x.rotate(q.r);x.fillStyle=q.c;x.fillRect(-q.s/2,-q.s/4,q.s,q.s/2);x.restore()}if(al)requestAnimationFrame(f);else cf.classList.add('hide')})(performance.now())}
function recPush(){const r=[t,pos,px,speed,st,ph,nitT>0?1:0,inp.B?1:0,shake];for(const q of rivals)r.push(q.z,q.off,q.v);rec.push(r)}
function repApply(ix){const i=Math.min(rec.length-2,Math.max(0,Math.floor(ix))),f=Math.min(1,Math.max(0,ix-i)),a=rec[i],b=rec[i+1],L=k=>a[k]+(b[k]-a[k])*f;
 const E=[{z:L(1),off:L(2),v:L(3),col:carCol(ki),d:ki}];for(let k=0;k<7;k++){const o=9+k*3;if(a[o]===undefined)break;E.push({z:a[o]+(b[o]-a[o])*f,off:a[o+1]+(b[o+1]-a[o+1])*f,v:a[o+2],col:RCOL[k],d:k%5})}
 if(repFollow>=E.length)repFollow=0;
 const F=E[repFollow];pos=F.z;px=F.off;speed=F.v;st=repFollow?0:L(4);const gy=gh(pos);camG=gy;ph=gy+(repFollow?0:Math.max(0,L(5)-gh(L(1))));nitT=repFollow?0:(a[6]?1:0);
 rivals=E.filter((_,j)=>j!==repFollow).map(e=>({z:e.z,off:e.off,v:e.v,col:e.col,k:e.d,sw:0}));repOv={col:F.col,d:F.d};t=L(0)}
function repStart(){if(rec.length<20)return;recOn=false;P.stats.replays++;achCheck();
 repSave={mode,pos,px,speed,st,ph,camG,nitT,rivals,shake,t};mode='replay';repT=0;repFollow=0;repPlay=true;repSp=1;camHt=1000;
 $('res').classList.add('hide');$('rp').classList.remove('hide');$('ctl').classList.add('hide');$('rPlay').textContent='⏸';$('rSp').textContent='1×';if(engG)engG.gain.value=0;repApply(0)}
function repEnd(){const S=repSave;if(!S)return;mode=S.mode;pos=S.pos;px=S.px;speed=S.speed;st=S.st;ph=S.ph;camG=S.camG;nitT=S.nitT;rivals=S.rivals;shake=0;t=S.t;repOv=null;camHt=1000;$('rp').classList.add('hide');$('res').classList.remove('hide')}
function repStep(fr){wxUpdate(fr);const dur=(rec.length-1)/30;if(repPlay)repT+=fr*repSp;if(repT>=dur){repT=dur;repPlay=false;$('rPlay').textContent='▶'}repApply(repT*30);if(!repSeek)$('rSeek').value=Math.round(repT/dur*1000)}
function hudRep(){const F="'Russo One',Impact,sans-serif",G="'Chakra Petch',sans-serif";
 const vg=g.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H*.95);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,10,.5)');g.fillStyle=vg;g.fillRect(0,0,W,H);
 g.fillStyle='rgba(0,0,0,.45)';g.fillRect(0,0,W,28);g.fillStyle='#ff3d5a';g.beginPath();g.arc(16,14,5,0,7);g.fill();
 g.textBaseline='alphabetic';g.fillStyle='#fff';g.font='15px '+F;g.textAlign='left';g.fillText('REPETICIÓN',28,19);
 g.textAlign='center';g.font='13px '+G;g.fillStyle='#ffd36b';g.fillText('Siguiendo: '+NM[repFollow],W/2,19);
 g.textAlign='right';g.font='15px '+F;g.fillStyle='#fff';g.fillText(fmt(t),W-12,19);g.font='20px '+F;g.fillText(Math.round(speed/MAXS*320)+' km/h',W-12,54)}
function toast(m){tS=m;tT=1.6}
function hit(r,dz,ox){
 if(hitCd>0)return;const rel=Math.abs(speed-r.v)/MAXS,side=Math.abs(dz)<130,lv=rel<.06?0:rel<.16?1:2;
 hitCd=.5;hits++;dmg=Math.min(1,dmg+[.04,.1,.2][lv]);if(dmg>.6)toast('⚠ Carrocería muy dañada');
 if(dz>0&&!side)speed=Math.min(speed,r.v*(1-[.02,.08,.15][lv]));
 else if(dz<=0&&!side){r.v=Math.min(r.v,speed*.9);speed=Math.min(MAXS*1.2,speed+rel*MAXS*.12)}
 else speed*=1-[.03,.07,.12][lv];
 const dir=px>=r.off?1:-1;px+=dir*[.1,.2,.32][lv];r.off-=dir*[.05,.1,.16][lv];r.tl=r.off;
 shake=Math.max(shake,[.25,.55,1][lv]);sfx('crash',[.35,.7,1][lv]);vib([25,45,90][lv]);
 for(let i=0;i<[4,10,22][lv];i++)spark(W/2+(Math.random()-.5)*90,H*.86)}
function aiStep(dt,racing){
 const all=[{z:pos,off:px,v:speed},...rivals];
 for(const r of rivals){
  const pf=r.pf,i0=Math.floor(r.z/SEG);let cl=0;for(let j=3;j<=14;j+=3)cl=Math.max(cl,Math.abs(seg(i0+j).curve));
  r.mist=Math.max(0,r.mist-dt);if(racing&&r.mist<=0&&Math.random()<pf.err*dt*.12*(dif===0?2:dif===3?.3:1))r.mist=1.1;
  r.nT=Math.max(0,r.nT-dt);r.nCd-=dt;
  let tgt=r.sp*(1-cl*.05*(1-pf.cor))*(1-.06*wx.rain);
  if(r.mist>0)tgt*=.72;
  if(r.nT>0)tgt*=1.12;else if(r.nCd<=0&&cl<.6&&racing&&pf.agg>.3){r.nT=1.8;r.nCd=10+Math.random()*8}
  let ahead=null,ad=1e9;for(const o of all){if(o===r)continue;const dz=o.z-r.z;if(dz>0&&dz<900&&dz<ad&&Math.abs(o.off-r.off)<.55){ahead=o;ad=dz}}
  if(ahead&&ad<420)tgt=Math.min(tgt,ahead.v*(.96+.03*pf.agg));
  if(ahead&&ad<900*(.4+pf.agg*.6)){const dir=ahead.off>=r.off?-1:1,room=Math.abs(r.off+dir*.6)<.95?dir:-dir;r.tl=ahead.off+room*.65}
  else r.tl=r.lane+(r.mist>0?.5*Math.sign(r.lane||1):0)+.12*Math.sin(t*.4+r.k);
  if(pf.agg>.6){const dz=pos-r.z;if(dz<0&&dz>-500&&Math.abs(px-r.off)<.8)r.tl+=Math.sign(px-r.off)*.15}
  r.tl=Math.max(-.95,Math.min(.95,r.tl));
  r.off+=(r.tl-r.off)*Math.min(1,dt*(1.2+pf.agg*1.4));
  const goal=mode==='count'?0:tgt;
  r.v+=(goal-r.v)*Math.min(1,dt*(goal<r.v?1.5+pf.brk*2.5:1.2+.6*pf.top));
  const dz=r.z-pos,ox=Math.abs(r.off-px);if(Math.abs(dz)<260&&ox<.42)hit(r,dz,ox);
  r.z+=r.v*dt;if(!r.ft&&r.z>=LAPS*L)r.ft=clk}}
function update(dt){
 const c=CT[ci],car=CARS[ki];
 for(const q of parts){q.l-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=(q.g||0)*dt}parts=parts.filter(q=>q.l>0);if(parts.length>220)parts.length=220;
 shake=Math.max(0,shake-dt*2.5);hitCd=Math.max(0,hitCd-dt);tT=Math.max(0,tT-dt);wxUpdate(dt);if(dmg>.5&&mode==='race'&&Math.random()<dmg*.25)puff(W/2+(Math.random()-.5)*50,H*.78,'#555',9);
 if(mode==='count'){cd-=dt;const bb=Math.ceil(cd);if(bb!==lastBeep&&bb<=3&&bb>=1)sfx('beep');lastBeep=bb;if(cd<=0){mode='race';sfx('go')}}
 if(mode==='race'||mode==='done'){
  const racing=mode==='race';
  if(racing)t+=dt;clk+=dt;
  const top=MAXS*car.top*(nitT>0?car.np:1)*(1-.18*wear)*(1+P.up.top*.04)*(1-.22*dmg);
  if(racing){
   wear=Math.min(1,wear+dt*.011*car.tw*TY[tyre].w*(tyre===3&&wx.rain<.3?1.6:1));tWarn-=dt;if(wear>.75&&tWarn<=0&&usePit){toast('Neumáticos gastados: entra a boxes');tWarn=40}if(inp.B)speed-=MAXS*dt*(.85+.3*car.grip)*(1-.2*wx.rain*TY[tyre].r);else speed+=(MAXS/5.5)*car.acc*(1+P.up.acc*.07)*(1-.15*dmg)*(nitT>0?2.4:1)*dt
   if(nitT>0)nitT-=dt;
   if(inp.N&&nit>0&&nitT<=0){nit--;nitT=car.nd;sfx('nitro');shake=Math.max(shake,.3);P.stats.nitro++;achCheck()}inp.N=0;
  }else speed-=MAXS*.5*dt;
  if(speed>top)speed-=MAXS*.6*dt;
  const sp=speed/MAXS,cur=seg(Math.floor(pos/SEG)).curve;
  const tgt=racing?Math.max(-1,Math.min(1,inp.R-inp.L+inp.A)):0;st+=(tgt-st)*Math.min(1,dt*10);
  const dxs=dt*2*sp;px+=st*dxs*car.grip*(1-.3*wear)*(1+P.up.grip*.06)*(1-.18*wx.rain*TY[tyre].r)*TY[tyre].g*(1-.2*dmg)-dxs*sp*cur*.3+(dmg>.6?(dmg-.6)*dxs*.35:0);
  const dr=racing&&!air&&sp>.62-.12*wx.rain&&Math.abs(st)>.6&&Math.abs(cur)>1;
  if(dr){drift=Math.min(1,drift+dt*.45*Math.abs(st));px+=st*dxs*.18;sqT-=dt;if(sqT<=0){sfx('squeal');sqT=.22}if(Math.random()<.7)puff(W/2+(Math.random()<.5?-44:44),H*.92,'#e6e6ee',9);
   if(drift>=1){drift=0;if(nit<car.nc){nit++;toast('+1 ⚡ nitro por derrape');P.stats.drift++;achCheck()}}}else drift=Math.max(0,drift-dt*.15);
  if(Math.abs(px)>2.25&&racing){px=Math.sign(px)*2.2;speed*=.65;dmg=Math.min(1,dmg+.08);shake=Math.max(shake,.8);sfx('crash',.8);vib(70);for(let i=0;i<14;i++)spark(W/2+Math.sign(px)*130,H*.8)}
  px=Math.max(-2.4,Math.min(2.4,px));
  {const of=Math.abs(px)-1.08;if(of>0&&!inLane&&speed>MAXS*.2){speed-=MAXS*(.35+.7*Math.min(1,of))*dt;if(Math.random()<.6)puff(W/2+(Math.random()<.5?-48:48),H*.9,'#b99b6b',7)}}
  const si=((Math.floor(pos/SEG)%N)+N)%N,inZ=usePit&&si>=PZ0&&si<=PZ1,inL=inZ&&px>1.15,inB=inL&&si>=PB-5&&si<=PB+5;
  if(racing&&usePit){fuel=Math.max(0,fuel-speed*dt/(car.tank*L)*((inB&&!svcDone)?0:1));if(fuel<=0&&speed>MAXS*.32)speed-=MAXS*.5*dt}
  goT=Math.max(0,goT-dt);if(inL)speed=Math.min(speed,MAXS*.28);
  if(inB&&!svcDone&&racing){speed=Math.max(0,speed-MAXS*2.2*dt);if(speed<400){speed=0;if(svc===0){svcD0=dmg;svcNeed=2.4+3*dmg;tyre0=tyre}svc+=dt;if(svcD0>0)dmg=Math.max(0,dmg-svcD0/svcNeed*dt*1.15);{const lr=inp.R-inp.L;if(lr!==0&&pitLR===0){tyre=(tyre+(lr>0?1:3))%4;sfx('beep')}pitLR=lr}gunT-=dt;if(gunT<=0){sfx('gun');sfx('pump');gunT=.45}fuel=Math.min(1,fuel+dt*.45);wear=Math.max(0,wear-dt*.5);if(svc>=svcNeed){dmg=0;svcDone=true;goT=1.5;if(svcD0>.3)P.stats.fix++;if(tyre!==tyre0)P.stats.swap++;P.stats.pit++;pitUsed=true;achCheck();nit=Math.min(car.nc,nit+1)}}}
  if(!inZ){svc=0;svcDone=false}
  inLane=inL;
  speed=Math.max(0,speed);pos+=speed*dt;
  const gy=gh(pos),gv=(gy-pgy)/dt;pgy=gy;
  if(!air){if(vy-gv>1800&&speed>MAXS*.3){air=true}else{vy=gv;ph=gy}}
  if(air){airT+=dt;vy-=6000*dt;ph+=vy*dt;if(ph<=gy){if(airT>.25){P.stats.jump++;achCheck()}airT=0;air=false;ph=gy;vy=0;speed*=.93;shake=Math.max(shake,.45);sfx('crash',.4);for(let i=0;i<8;i++)puff(W/2+(Math.random()-.5)*160,H*.92,'#b99b6b',8)}}
  camG+=(gy-camG)*Math.min(1,dt*8);
  bgx-=cur*sp*dt*80;
  aiStep(dt,racing);
  if(racing){const li=Math.floor(pos/L);if(li>lapIdx&&li<=LAPS){const lt=t-lapStart;lapTimes.push(lt);lapStart=t;lapIdx=li;musFast=li>=LAPS-1;if(li<LAPS)toast(li===LAPS-1?'¡Última vuelta! '+fmt(lt):'Vuelta '+li+': '+fmt(lt))}}
  if(racing&&mode2!==2){const rk0=1+rivals.filter(q=>q.z>pos).length;if(rk0<lastRank)P.stats.over+=lastRank-rk0;lastRank=rk0}
  P.stats.top=Math.max(P.stats.top,Math.round(speed/MAXS*320));
  if(recOn&&rec.length<12000&&((recN++)&1)===0)recPush();
  if(racing&&pos>=LAPS*L){finish()}
  // audio engine
  if(AC){const gr=Math.min(5,Math.floor(sp*6)),rpm=sp*6-gr,n=AC.currentTime,base=55+rpm*70+gr*10;
   if(gr!==lastGr){lastGr=gr;eng.frequency.setValueAtTime(base*.82,n)}
   eng.frequency.setTargetAtTime(base,n,.05);lp.frequency.setTargetAtTime(500+sp*900+(nitT>0?600:0),n,.05);
   engG.gain.setTargetAtTime(paused?0:engBase*(mode==='count'?.03:.05+.05*Math.min(sp,1)),n,.05);if(rainG)rainG.gain.setTargetAtTime(paused||A.muted?0:P.set.sfx*.12*wx.rain,n,.2);if(musF)musF.frequency.setTargetAtTime((inLane&&svc>0&&!svcDone)?700:20000,n,.15)}
 }
}
