/* ---------- audio ---------- */
let AC,eng,lp,engG,musG,sfxG,musT,engBase=1,paused=false,musF=null,NB=null;
const A={muted:false};
function applyVol(){if(!AC)return;const m=A.muted?0:1,n=AC.currentTime;musG.gain.setTargetAtTime(m*P.set.mus*.2,n,.03);sfxG.gain.setTargetAtTime(m*P.set.sfx*.55,n,.03);engBase=m*P.set.eng}
function initAudio(){if(AC){AC.resume();return}
 try{AC=new(window.AudioContext||window.webkitAudioContext)();
  eng=AC.createOscillator();eng.type='sawtooth';lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;
  engG=AC.createGain();engG.gain.value=0;eng.connect(lp);lp.connect(engG);engG.connect(AC.destination);eng.start();
  musG=AC.createGain();musF=AC.createBiquadFilter();musF.type='lowpass';musF.frequency.value=20000;musG.connect(musF);musF.connect(AC.destination);NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);{const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
  sfxG=AC.createGain();sfxG.connect(AC.destination);
  {const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const sN=AC.createBufferSource(),fl=AC.createBiquadFilter();sN.buffer=b;sN.loop=true;fl.type='bandpass';fl.frequency.value=3000;rainG=AC.createGain();rainG.gain.value=0;sN.connect(fl);fl.connect(rainG);rainG.connect(AC.destination);sN.start()}
  applyVol()}catch(e){AC=null}}
const mid=n=>440*Math.pow(2,(n-69)/12);
function noise(tm,d,v,fq,dst,ty){const s0=AC.createBufferSource(),f=AC.createBiquadFilter(),gn=AC.createGain();s0.buffer=NB;f.type=ty||'highpass';f.frequency.value=fq;gn.gain.setValueAtTime(v,tm);gn.gain.exponentialRampToValueAtTime(.001,tm+d);s0.connect(f);f.connect(gn);gn.connect(dst||musG);s0.start(tm,Math.random()*.5,d+.02)}
function stopMusic(){clearInterval(musT);curTh=null}
/* ---- instrumentos ---- */
function V(f,t,d,o){const dets=o.det||[0];for(const dt of dets){const n=AC.createOscillator(),gn=AC.createGain();n.type=o.ty||'sawtooth';n.frequency.setValueAtTime(f,t);if(dt)n.detune.value=dt;
 const a=o.a||.006,dec=Math.max(a+.02,o.dec||d);gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(o.v/dets.length,t+a);gn.gain.exponentialRampToValueAtTime(.0008,t+dec);
 let out=gn;n.connect(gn);if(o.lp){const fl=AC.createBiquadFilter();fl.type='lowpass';fl.frequency.setValueAtTime(o.lp*1.8,t);fl.frequency.exponentialRampToValueAtTime(o.lp,t+.18);gn.connect(fl);out=fl}
 out.connect(musG);
 if(o.vib){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=o.vib;lg.gain.value=f*.011;l.connect(lg);lg.connect(n.frequency);l.start(t);l.stop(t+d+.05)}
 n.start(t);n.stop(t+Math.max(d,dec)+.06)}}
const LT={koto:{ty:'triangle',v:.34,dec:.4,lp:2600},flute:{ty:'sine',v:.3,vib:5.5,a:.04},brass:{ty:'sawtooth',v:.2,lp:2800,a:.02,vib:5},super:{ty:'sawtooth',v:.2,det:[-14,0,14],lp:3400,a:.01},
 guitar:{ty:'sawtooth',v:.22,lp:2200,vib:4,a:.008},mando:{ty:'triangle',v:.32,dec:.13},anth:{ty:'square',v:.14,lp:3400,a:.012},trump:{ty:'square',v:.17,lp:2600,vib:5.5,a:.04},
 synth:{ty:'sawtooth',v:.18,lp:3800,vib:4.5,a:.01},pluck:{ty:'triangle',v:.16,dec:.2},pad:{ty:'sine',v:.16,a:.08}};
function lead(f,t,d,k,vol){const o=LT[k]||LT.koto;V(f,t,Math.max(d,.08),{...o,v:o.v*vol})}
function kick2(t,v){const o=AC.createOscillator(),g2=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.11);g2.gain.setValueAtTime(v,t);g2.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g2);g2.connect(musG);o.start(t);o.stop(t+.22)}
function snare(t,v){noise(t,.14,v*.8,1400,musG,'bandpass');const o=AC.createOscillator(),g2=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(130,t+.08);g2.gain.setValueAtTime(v*.5,t);g2.gain.exponentialRampToValueAtTime(.001,t+.1);o.connect(g2);g2.connect(musG);o.start(t);o.stop(t+.12)}
function clap(t,v){for(let i=0;i<3;i++)noise(t+i*.012,.05,v*.7,1200,musG,'bandpass');noise(t+.036,.12,v*.6,1200,musG,'bandpass')}
const hat=(t,v)=>noise(t,.035,v,7500),ohat=(t,v)=>noise(t,.16,v,6500),crash=t=>noise(t,.9,.22,4500);
function tomm(t,v,f){const o=AC.createOscillator(),g2=AC.createGain();o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.55,t+.15);g2.gain.setValueAtTime(v,t);g2.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g2);g2.connect(musG);o.start(t);o.stop(t+.22)}
function cow(t,v){for(const f of[560,845]){const o=AC.createOscillator(),g2=AC.createGain();o.type='square';o.frequency.value=f;g2.gain.setValueAtTime(v*.25,t);g2.gain.exponentialRampToValueAtTime(.001,t+.09);o.connect(g2);g2.connect(musG);o.start(t);o.stop(t+.1)}}
/* ---- canciones: una por circuito ---- */
const SCL={min:[0,2,3,5,7,8,10],hmin:[0,2,3,5,7,8,11],maj:[0,2,4,5,7,9,11],pmin:[0,3,5,7,10],pmaj:[0,2,4,7,9],blues:[0,3,5,6,7,10],phd:[0,1,4,5,7,8,10],mix:[0,2,4,5,7,9,10]};
const CQ={M:[0,4,7],m:[0,3,7],d:[0,3,6]};
const mel=str=>{const t=str.replace(/\|/g,' ').trim().split(/\s+/),b=[];for(let i=0;i<t.length;i+=16){const x=t.slice(i,i+16);while(x.length<16)x.push('.');b.push(x)}return b};
const KITS={taiko:{k:[0,6,10],cl:[4,12],h:[0,2,4,6,8,10,12,14],tm:[14,15]},samba:{k:[0,6,10],s:[4,12],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],cb:[0,3,6,10,12]},
 techno:{k:[0,4,8,12],cl:[4,12],oh:[2,6,10,14]},rock:{k:[0,7,10],s:[4,12],h:[0,2,4,6,8,10,12,14]},tarant:{k:[0,6,8,14],s:[4,12],h:[0,2,4,6,8,10,12,14]},
 brit:{k:[0,6,8,10],s:[4,12],h:[0,2,4,6,8,10,12,14],oh:[14]},mex:{k:[0,8],s:[4,12],gt:[2,6,10,14]},synth:{k:[0,4,8,12],s:[4,12],h:[2,6,10,14]},chill:{k:[0,10],s:[8],h:[4,12]}};
const BS={pump:[[0,0],[2,0],[4,12],[6,0],[8,0],[10,0],[12,12],[14,0]],funk:[[0,0],[3,0],[6,12],[8,0],[11,7],[14,12]],
 roll:[[0,0],[1,0],[2,12],[3,0],[4,0],[5,0],[6,12],[7,0],[8,0],[9,0],[10,12],[11,0],[12,0],[13,0],[14,12],[15,0]],oompah:[[0,0],[8,7]],
 gallop:[[0,0],[3,0],[4,12],[7,0],[8,0],[11,0],[12,12],[15,0]],rock8:[[0,0],[2,0],[4,0],[6,0],[8,0],[10,0],[12,0],[14,7]],off:[[0,0],[2,12],[6,0],[10,0],[14,12]],slow:[[0,0],[8,7]]};
const TR={
jp:{bpm:132,root:57,sc:SCL.pmin,vp:[[0,'m'],[10,'M'],[8,'M'],[7,'M']],cp:[[8,'M'],[10,'M'],[0,'m'],[7,'M']],kit:'taiko',bs:'pump',ld:'koto',lc:'flute',
 A:'0 . . 1 . 2 . . 3 . 2 . 1 . 0 . | 2 . . 3 . 4 . . 5 . 4 . 3 . 2 .',
 B:'5 . 5 . 4 . 3 . 4 . 5 . 7 . . . | 6 . 6 . 5 . 4 . 5 . 6 . 8 . . . | 9 . 8 . 7 . 5 . 7 . 8 . 9 . 10 . | 9 . 7 . 5 . 4 . 3 . 4 . 5 _ _ _'},
br:{bpm:126,root:55,sc:SCL.pmaj,vp:[[0,'M'],[5,'M'],[7,'M'],[5,'M']],cp:[[0,'M'],[9,'m'],[2,'m'],[7,'M']],kit:'samba',bs:'funk',ld:'brass',lc:'brass',dbl:2,
 A:'0 . . 2 . . 4 . 2 . . 0 . . 2 . | 4 . . 3 . . 2 . 0 . . 2 . . 4 .',
 B:'5 . . 5 . . 7 . 5 . . 4 . . 5 . | 7 . . 7 . . 9 . 7 . . 5 . . 7 . | 9 . . 9 . . 8 . 7 . . 5 . . 4 . | 5 . 4 . 2 . 4 . 5 _ _ . . . . .'},
de:{bpm:140,root:52,sc:SCL.min,vp:[[0,'m'],[8,'M'],[3,'M'],[10,'M']],cp:[[8,'M'],[3,'M'],[10,'M'],[0,'m']],kit:'techno',bs:'roll',ld:'super',lc:'super',
 A:'0 . 2 . 4 . 2 . 0 . 2 . 4 . 7 . | 6 . 4 . 2 . 4 . 6 . 4 . 2 . 0 .',
 B:'7 . 7 . 9 . 7 . 4 . 4 . 7 . . . | 6 . 6 . 8 . 6 . 4 . 4 . 6 . . . | 7 . 9 . 11 . 9 . 7 . 9 . 11 . 14 . | 13 . 11 . 9 . 7 . 4 . 7 . 9 _ _ _'},
us:{bpm:118,root:55,sc:SCL.blues,sw:.2,vp:[[0,'M'],[0,'M'],[5,'M'],[0,'M']],cp:[[5,'M'],[7,'M'],[0,'M'],[0,'M']],kit:'rock',bs:'rock8',ld:'guitar',lc:'guitar',
 A:'0 . . 1 . 2 . . 3 . 2 . 1 . . . | 0 . . 1 . 2 . . 4 . 3 . 2 . 1 .',
 B:'6 . . 6 . 4 . 3 . 4 . 6 . . . | 7 . . 7 . 5 . 4 . 5 . 7 . . . | 6 . 8 . 9 . 8 . 6 . 4 . 3 . 4 . | 6 _ . . . . 4 . 3 . 1 . 0 _ _ _'},
it:{bpm:150,root:50,sc:SCL.hmin,vp:[[0,'m'],[7,'M'],[0,'m'],[7,'M']],cp:[[0,'m'],[10,'M'],[8,'M'],[7,'M']],kit:'tarant',bs:'gallop',ld:'mando',lc:'mando',
 A:'0 2 4 2 0 2 4 2 5 4 2 4 5 4 2 0 | 7 6 5 4 5 4 2 0 2 4 5 7 6 5 4 .',
 B:'7 . 7 . 9 . 7 . 6 . 6 . 7 . . . | 7 . 7 . 9 . 11 . 10 . 9 . 7 . . . | 11 . 11 . 10 . 9 . 7 . 9 . 10 . 11 . | 9 7 6 4 6 7 9 11 14 . . . 14 . . .'},
uk:{bpm:138,root:50,sc:SCL.maj,vp:[[0,'M'],[7,'M'],[9,'m'],[5,'M']],cp:[[5,'M'],[0,'M'],[7,'M'],[9,'m']],kit:'brit',bs:'rock8',ld:'anth',lc:'anth',dbl:2,
 A:'0 . . . 2 . . . 4 . . . 2 . . . | 5 . . . 4 . . . 2 . . . 0 . . .',
 B:'7 . 7 . 9 . . . 7 . 4 . 2 . . . | 4 . 4 . 7 . . . 5 . 4 . 2 . . . | 9 . 9 . 11 . . . 9 . 7 . 9 . . . | 7 . 9 . 11 . 9 . 7 _ _ _ . . . .'},
mx:{bpm:134,root:52,sc:SCL.phd,vp:[[0,'M'],[1,'M'],[0,'M'],[10,'M']],cp:[[5,'m'],[0,'M'],[1,'M'],[0,'M']],kit:'mex',bs:'oompah',ld:'trump',lc:'trump',dbl:2,
 A:'0 . 1 . 2 . 1 . 0 . . . 2 . 3 . | 4 . 3 . 2 . 1 . 0 . . . . . . .',
 B:'4 . . 4 . 5 . 4 . 3 . 2 . . . | 4 . . 4 . 5 . 6 . 7 . 5 . . . | 7 . 6 . 5 . 4 . 3 . 4 . 5 . 6 . | 7 _ _ _ 4 . 2 . 1 . 0 _ _ _ . .'},
au:{bpm:128,root:54,sc:SCL.mix,vp:[[0,'M'],[10,'M'],[5,'M'],[0,'M']],cp:[[5,'M'],[0,'M'],[10,'M'],[7,'M']],kit:'synth',bs:'off',ld:'synth',lc:'super',
 A:'0 . 2 . 4 . 7 . 4 . 2 . 4 . . . | 0 . 2 . 4 . 7 . 9 . 7 . 4 . 2 .',
 B:'7 . . 9 . . 11 . . 9 . . 7 . . . | 9 . . 11 . . 14 . . 11 . . 9 . . . | 7 . 9 . 11 . 9 . 7 . 4 . 7 . 9 . | 11 _ _ _ 9 _ _ _ 7 _ . . . . . .'},
menu:{bpm:100,root:45,sc:SCL.min,vp:[[0,'m'],[8,'M'],[3,'M'],[10,'M']],cp:[[8,'M'],[3,'M'],[10,'M'],[0,'m']],kit:'chill',bs:'slow',ld:'flute',lc:'brass',sec:[['intro',4],['verse',8],['chorus',8]],
 A:'0 _ _ _ 2 _ _ _ 4 _ _ _ 7 _ _ _ | 6 _ _ _ 4 _ _ _ 2 _ _ _ 0 _ _ _',
 B:'7 _ _ . 9 _ _ . 11 _ _ . 9 _ _ . | 7 _ _ . 6 _ _ . 4 _ _ . 2 _ _ . | 4 _ _ . 6 _ _ . 7 _ _ . 9 _ _ . | 11 _ _ _ _ _ _ _ 7 _ _ _ _ _ _ _'},
garage:{bpm:88,root:48,sc:SCL.maj,vp:[[0,'M'],[9,'m'],[5,'M'],[7,'M']],cp:[[5,'M'],[7,'M'],[0,'M'],[9,'m']],kit:'chill',bs:'slow',ld:'pluck',lc:'flute',sec:[['verse',8],['chorus',8]],
 A:'0 . . 2 . . 4 . . . 2 . . . . . | 5 . . 4 . . 2 . . . 0 . . . . .',
 B:'4 . . 5 . . 7 . . . 5 . . . . . | 4 . . 2 . . 4 . . . 0 . . . . . | 5 . . 7 . . 9 . . . 7 . . . . . | 4 . . 2 . . 0 . . . . . . . . .'}};
const TRK=['jp','br','de','us','it','uk','mx','au'],MENU=TR.menu;
function startMusic(T){
 if(!AC)return;stopMusic();curTh=T;
 const sc=T.sc,L=sc.length,MA=mel(T.A),MB=mel(T.B),SEC=T.sec||[['intro',4],['verse',8],['chorus',8],['verse',4],['bridge',4],['chorus',8],['chorus',8]],tot=SEC.reduce((a,x)=>a+x[1],0);
 const secAt=b=>{b%=tot;for(let i=0;i<SEC.length;i++){if(b<SEC[i][1])return{n:SEC[i][0],i:b};b-=SEC[i][1]}};
 const K=KITS[T.kit],BP=BS[T.bs||'pump'];let gs=0,next=AC.currentTime+.1,jumped=false;
 musT=setInterval(()=>{
  const key=musFast?2:0,sp=60/T.bpm/4/(musFast?1.1:1);
  if(A.muted||paused){next=AC.currentTime+.1;return}
  while(next<AC.currentTime+.3){
   if(musFast&&!jumped&&gs%16===0){jumped=true;const b=Math.floor(gs/16)+1;for(let q=0;q<tot;q++){const x=secAt(b+q);if(x.n==='chorus'&&x.i===0){gs=(b+q)*16;break}}}
   const bar=Math.floor(gs/16),s=gs%16,sec=secAt(bar),ch=(sec.n==='chorus'||sec.n==='bridge')?T.cp:T.vp,cc=ch[sec.i%4],tones=CQ[cc[1]]||CQ.M;
   const t0=next+((s%2)&&T.sw?T.sw*sp:0),it=sec.n==='chorus'?2:sec.n==='verse'?1:0,nit=nitT>0,nt=m=>mid(m+key);
   const dn=d=>{const o=Math.floor(d/L),i=((d%L)+L)%L;return T.root+sc[i]+12*o};
   const has=a=>a&&a.includes(s);
   for(const [st,iv] of BP)if(st===s&&(sec.n!=='bridge'||s%4===0))V(nt(T.root+cc[0]-12+iv),t0,sp*(iv===12?1.2:1.8),{ty:'square',v:it?.2:.14,lp:650,dec:sp*1.6});
   if(has(K.k)&&(sec.n!=='bridge'||s%4===0))kick2(t0,it?.85:.6);
   if(sec.n!=='intro'&&sec.n!=='bridge'){if(has(K.s))snare(t0,.5);if(has(K.cl))clap(t0,.45);if(has(K.cb))cow(t0,.5);if(has(K.tm)&&it>1)tomm(t0,.5,110+(s%2)*30);if(has(K.gt))noise(t0,.07,.28,1800,musG,'bandpass')}
   if(has(K.h)&&sec.n!=='bridge')hat(t0,(it>1?.17:.1)*(s%4===2?1.4:1));
   if(has(K.oh)&&sec.n!=='bridge')ohat(t0,.18);
   if(sec.n==='bridge'&&sec.i===3)snare(t0,.05+.025*s);
   else if(bar%4===3&&s>=12&&sec.n!=='intro'&&sec.n!=='bridge')snare(t0,.18+.07*(s-12));
   if(s===0&&sec.i===0&&sec.n==='chorus')crash(t0);
   let bars=sec.n==='chorus'?MB:MA,tok=null,tr=0,lt=T.ld,vol=1;
   if(sec.n==='verse'){tok=bars[sec.i%bars.length][s];if(sec.i%8>=6)tr=2}
   else if(sec.n==='chorus'){tok=bars[sec.i%bars.length][s];lt=T.lc||T.ld;vol=1.15}
   else if(sec.n==='bridge'){tok=bars[sec.i%bars.length][s];tr=3;lt='pad';vol=.9}
   if(tok&&tok!=='.'&&tok!=='_'){const d=+tok+tr,arr=bars[sec.i%bars.length];let len=1;for(let q=s+1;q<16&&arr[q]==='_';q++)len++;const dur=len*sp*.95;
    lead(nt(dn(d)),t0,dur,lt,vol);
    if(T.dbl&&sec.n==='chorus')lead(nt(dn(d+T.dbl)),t0,dur,lt,.55);
    if((sec.n==='chorus'&&sec.i>=4)||nit)lead(nt(dn(d))+12,t0,dur,'pluck',.5)}
   if(((sec.n==='intro'||sec.n==='verse')||(sec.n==='chorus'&&sec.i>=4)||nit)&&sec.n!=='bridge'&&s%2===0)V(nt(T.root+cc[0]+tones[(s/2)%tones.length]+12+(nit?12:0)+(s%8>=4?12:0)),t0,sp*1.6,{ty:'triangle',v:.1,dec:sp*1.4});
   if(s===0&&(sec.n==='chorus'||sec.n==='bridge'))for(const iv of tones)V(nt(T.root+cc[0]+iv),t0,sp*15.5,{ty:'sine',v:.05,a:.2,dec:sp*15});
   next+=sp;gs++}},80)}

function tone(f,d,ty,v,f2){if(!AC||A.muted)return;const n=AC.currentTime,o=AC.createOscillator(),g2=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g2.gain.setValueAtTime(v,n);g2.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g2);g2.connect(sfxG);o.start(n);o.stop(n+d+.02)}
function sfx(k,v){if(!AC||A.muted)return;const n=AC.currentTime;v=v||1;
 if(k==='beep')tone(520,.18,'square',.35);else if(k==='go')tone(1040,.45,'square',.4);
 else if(k==='nitro'){noise(n,.7,.5,300,sfxG,'bandpass');tone(180,.6,'sawtooth',.25,520)}
 else if(k==='crash'){noise(n,.25+.2*v,.9*v,200,sfxG,'lowpass');tone(110,.2,'square',.5*v,40)}
 else if(k==='squeal')noise(n,.16,.25,2600,sfxG,'highpass');
 else if(k==='gun'){noise(n,.09,.6,1800,sfxG,'bandpass');tone(300,.08,'square',.2)}
 else if(k==='pump')tone(90,.3,'triangle',.25,70);
 else if(k==='win'){[0,4,7,12,16].forEach((q,i)=>setTimeout(()=>tone(mid(60+q),.35,'square',.3),i*110))}
 else if(k==='ach'){[0,5,9,14].forEach((q,i)=>setTimeout(()=>tone(mid(72+q),.2,'triangle',.3),i*90))}
 else if(k==='lose'){[7,5,2].forEach((q,i)=>setTimeout(()=>tone(mid(55+q),.3,'triangle',.3),i*160))}}
$('mute').onclick=()=>{A.muted=!A.muted;$('mute').textContent=A.muted?'🔇':'🔊';applyVol()};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&(mode==='race'||mode==='count'))setPause(true);if(AC)document.hidden?AC.suspend():AC.resume()});
document.addEventListener('pointerdown',()=>{if(!AC){initAudio();if(mode==='menu')startMusic(MENU)}},{once:true});
