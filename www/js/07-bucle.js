/* ---------- loop ---------- */
build(CT[0]);ui();let last=performance.now();
function loop(now){const fr=Math.min(.1,(now-last)/1000);last=now;fpsAvg=fpsAvg*.95+(1/Math.max(fr,.004))*.05;
 if(mode==='race'&&P.set.auto&&fpsAvg<36&&P.set.q>0&&now>qCool&&clk>4){P.set.q--;setQ(P.set.q);qCool=now+6000;toast('Calidad reducida para mantener la fluidez')}
 if(typeof innerHeight!=='undefined'){const por=innerHeight>innerWidth*1.15,need=por&&(mode==='race'||mode==='count'||mode==='replay');if(need!==wasPor){wasPor=need;$('rot').classList[need?'remove':'add']('hide');if(need&&(mode==='race'||mode==='count'))setPause(true)}}
 if(mode==='menu'){bgx-=fr*20;render0()}else if(mode==='replay'){repStep(fr);render()}else{if(!paused){acc+=fr;let n=0;while(acc>=1/60&&n<5){update(1/60);acc-=1/60;n++}if(n===5)acc=0}render()}requestAnimationFrame(loop)}
function render0(){const c=CT[ci];pos+=3000*dt0();camG=gh(pos);speed=MAXS*.4;rivals=[];const sv=mode;mode='menu';render();mode=sv}
function dt0(){return .016}
requestAnimationFrame(loop);
