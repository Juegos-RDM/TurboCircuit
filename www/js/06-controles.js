/* ---------- input ---------- */
function bind(id,k){const e=$(id);const on=v=>ev=>{ev.preventDefault();inp[k]=v;e.classList.toggle('on',!!v)};
 e.addEventListener('pointerdown',on(1));['pointerup','pointercancel','pointerleave'].forEach(n=>e.addEventListener(n,on(0)))}
bind('bL','L');bind('bR','R');bind('bB','B');
$('nit').addEventListener('pointerdown',e=>{e.preventDefault();inp.N=1});
$('bZ').addEventListener('pointerdown',e=>{e.preventDefault();setPause(true)});
const KM={ArrowLeft:'L',a:'L',ArrowRight:'R',d:'R',ArrowDown:'B',s:'B'};
addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='p'||e.key==='P'){if(!e.repeat)setPause(!paused);return}if(KM[e.key])inp[KM[e.key]]=1;if((e.key===' '||e.key==='ArrowUp')&&!e.repeat)inp.N=1});
addEventListener('keyup',e=>{if(KM[e.key])inp[KM[e.key]]=0});
addEventListener('deviceorientation',e=>{if(!P.set.tilt)return;const ang=(typeof screen!=='undefined'&&screen.orientation&&screen.orientation.angle)||window.orientation||0;let v=(ang===90||ang===-270)?e.beta:(ang===270||ang===-90)?-e.beta:e.gamma;inp.A=Math.abs(v||0)<3?0:Math.max(-1,Math.min(1,(v||0)/22))});
document.addEventListener('contextmenu',e=>e.preventDefault());
