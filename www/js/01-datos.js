
"use strict";
const cv=document.getElementById('c'),g=cv.getContext('2d'),W=640,H=360;var DRAW=110;let camHt=1000,DPR=1;function setQ(q){DRAW=[90,110,130][q]||110;DPR=Math.min((window.devicePixelRatio)||1,[1,1.5,2][q]||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR)}setQ(1);
const SEG=200,RW=1200,DEPTH=.84,MAXS=12000,HOR=H*.42,PZ=840,CWID=380;let LAPS=3;
const SC={min:[0,2,3,5,7,8,10],maj:[0,2,4,5,7,9,11],mix:[0,2,4,5,7,9,10]};
const CT=[
{n:'Japón',f:'🇯🇵',sky:['#ff8fb8','#ffd9a0'],sun:'#fff3b0',far:'#7a5c9c',bg:'mount',grass:['#2e8b57','#277a4c'],road:['#5a5a66','#51515c'],rum:['#e63946','#ffffff'],obj:['sakura','#ff9ec4'],bpm:132,root:57,sc:SC.min,prog:[0,-4,-2,-7],seed:7,
 tr:[[60,0],[80,3],[40,0],[80,-4],[60,2],[50,0],[100,-5],[40,0],[80,4],[60,-3],[70,0],[90,5],[40,0],[80,-2],[100,0]]},
{n:'Brasil',f:'🇧🇷',sky:['#26a6ff','#ffe27a'],sun:'#fff7c2',far:'#2f8f5b',bg:'sugar',grass:['#3cb043','#34a03a'],road:['#6a5a4a','#625244'],rum:['#ffd400','#1e9e4a'],obj:['palm','#1d7a3a'],bpm:122,root:55,sc:SC.maj,prog:[0,5,7,5],seed:21,
 tr:[[50,0],[60,4],[60,-4],[50,3],[40,0],[70,-5],[60,5],[40,0],[90,-3],[50,4],[50,-4],[40,0],[80,6],[50,0],[60,-2],[80,0]]},
{n:'Alemania',f:'🇩🇪',sky:['#5d7fa8','#c9d6e6'],sun:'#f3f0e0',far:'#35544a',bg:'pines',grass:['#4b7a3a','#456f35'],road:['#4a4d55','#43464e'],rum:['#d62828','#f4f4f4'],obj:['pine','#1f5a3a'],bpm:140,root:52,sc:SC.min,prog:[0,-4,-2,-7],seed:33,
 tr:[[120,0],[60,3],[100,0],[50,-6],[80,0],[70,4],[70,-4],[110,0],[40,6],[60,0],[90,-3],[120,0],[50,5],[90,0]]},
{n:'Estados Unidos',f:'🇺🇸',sky:['#ff7a3d','#ffd27a'],sun:'#ffe9a8',far:'#a8503a',bg:'city',grass:['#c9a15a','#bf9650'],road:['#3b3d46','#35373f'],rum:['#2a4bd7','#ffffff'],obj:['board','#e63946'],bpm:112,root:53,sc:SC.mix,prog:[0,5,7,5],seed:48,
 tr:[[100,0],[120,2],[60,0],[120,-2],[100,0],[90,3],[50,0],[90,-3],[120,0],[110,2],[80,0],[100,-2],[90,0]]},
{n:'Italia',f:'🇮🇹',sky:['#5ab0ff','#fbe7c6'],sun:'#fff3c4',far:'#b87a4b',bg:'sugar',grass:['#6b9a3a','#628f33'],road:['#55555e','#4c4c55'],rum:['#1b9e4b','#ffffff'],obj:['pine','#2f7a3a'],bpm:150,root:50,sc:SC.maj,prog:[0,5,7,5],seed:61,
 tr:[[70,0],[60,5],[50,-5],[40,0],[90,-4],[60,4],[50,0],[70,6],[40,-6],[60,0],[90,3],[70,-3],[80,0]]},
{n:'Reino Unido',f:'🇬🇧',sky:['#8da4bd','#d8dfe8'],sun:'#eef1f5',far:'#4a5f55',bg:'pines',grass:['#3f7f3a','#397634'],road:['#44464c','#3d3f45'],rum:['#c8102e','#ffffff'],obj:['pine','#2d5a3a'],bpm:126,root:47,sc:SC.min,prog:[0,-4,-2,-7],seed:75,
 tr:[[60,0],[70,-4],[50,4],[60,-3],[40,0],[80,5],[60,-5],[50,0],[100,3],[40,0],[70,-6],[60,2],[90,0]]},
{n:'México',f:'🇲🇽',sky:['#ff9a3d','#ffe08a'],sun:'#fff0b0',far:'#9c4a32',bg:'mount',grass:['#c79a55','#bc8f4c'],road:['#4a4440','#433e3a'],rum:['#1e8f4e','#ffffff'],obj:['palm','#2a8a3a'],bpm:118,root:52,sc:SC.mix,prog:[0,5,7,5],seed:83,
 tr:[[80,0],[70,3],[60,-3],[50,0],[90,-5],[50,5],[60,0],[100,-2],[70,4],[40,0],[80,-4],[60,3],[90,0]]},
{n:'Australia',f:'🇦🇺',sky:['#2e9cff','#bfe8ff'],sun:'#fffbd0',far:'#c06a3a',bg:'sugar',grass:['#d1a24a','#c79942'],road:['#4d4d55','#46464e'],rum:['#0a2f8f','#ffffff'],obj:['board','#ffb020'],bpm:134,root:54,sc:SC.maj,prog:[0,5,7,5],seed:97,
 tr:[[110,0],[60,4],[50,-4],[110,0],[70,5],[60,0],[80,-3],[50,0],[70,6],[40,-6],[120,0],[60,2],[80,0]]}];
const LM={'Japón':'pagoda','Brasil':'cristo','Alemania':'castle','Estados Unidos':'bridge','Italia':'colosseum','Reino Unido':'bigben','México':'pyramid','Australia':'opera'};
const O2={'Japón':['torii','#d62828'],'Alemania':['lamp','#ffe27a'],'Estados Unidos':['lamp','#ffe27a'],'Italia':['cypress','#2f6b3a'],'Reino Unido':['lamp','#ffe27a'],'México':['cactus','#3b9a4a'],'Australia':['euca','#7d9a6a']};
CT.forEach(c=>{c.lm=LM[c.n];c.o2=O2[c.n]});
const CARS=[
{n:'Kaze GT',c:'#e0243a',top:.90,acc:.88,grip:1.0,tank:2.4,nc:2,np:1.20,nd:2.0,tw:1.2,d:'Ágil'},
{n:'Bravo RS',c:'#f2f4f8',top:1.10,acc:1.12,grip:1.10,tank:20,nc:5,np:1.45,nd:3.2,tw:.35,d:'Insignia'},
{n:'Adler S',c:'#2468ff',top:.96,acc:.90,grip:.95,tank:3.0,nc:3,np:1.25,nd:2.2,tw:1.0,d:'Equilibrado'},
{n:'Vortex X',c:'#8a35ff',top:1.00,acc:.98,grip:1.0,tank:3.6,nc:3,np:1.30,nd:2.5,tw:.8,d:'Prototipo'},
{n:'Titán R',c:'#2b2b36',top:1.05,acc:1.0,grip:1.05,tank:4.2,nc:4,np:1.35,nd:2.8,tw:.6,d:'Élite'}];
let ci=0,ki=0,mode='menu',segs=[],N=0,L=0,pos=0,px=0,speed=0,st=0,t=0,cd=0,nit=3,nitT=0,bgx=0,rivals=[],rank=8,doneT=0,fin=0;
const inp={L:0,R:0,B:0,N:0,A:0};
const $=id=>document.getElementById(id);
const seg=i=>segs[((i%N)+N)%N];
let dmg=0,svcNeed=2.4,svcD0=0,pitLR=0,tyre=1,tyre0=1,tWarn=0,wx={rain:0,fog:0,night:0},wt={rain:0,fog:0,night:0},wxT=0,rainP=[],rainG=null,rec=[],recN=0,recOn=false,repT=0,repPlay=true,repSp=1,repFollow=0,repSave=null,repOv=null,repSeek=false,airT=0,lastRank=8,pitUsed=false,fpsAvg=60,qCool=0,wasPor=false,wl=null,achQ=[];
let clk=0,parts=[],shake=0,hitCd=0,drift=0,hits=0,lastBeep=9,lastGr=0,lapIdx=0,lapStart=0,lapTimes=[],mm=[],resT=0,acc=0,gunT=0,sqT=0,tT=0,tS='';
let camG=0,pgy=0,ph=0,air=false,vy=0,wear=0,fuel=1,goT=0,usePit=false,svc=0,svcDone=false,inLane=false,PZ0=0,PZ1=0,PB=0;
const gh=p=>{const i=Math.floor(p/SEG),f=p/SEG-i;return seg(i).y*(1-f)+seg(i+1).y*f};
function build(c){segs=[];let ix=0;
 for(const [n,cv_] of c.tr){for(let i=0;i<n;i++){const u=i/n;segs.push({i:ix++,curve:cv_*Math.min(1,Math.min(u,1-u)*4)})}}
 N=segs.length;L=N*SEG;PZ0=N-130;PZ1=N-20;PB=N-75;const sd=c.seed;segs.forEach(s=>{const u=s.i/N*6.2832;s.y=Math.sin(u*2+sd)*1200+Math.sin(u*5+sd*2)*500});for(const f of[.3,.72]){const j=Math.floor(N*f);for(let k=0;k<12;k++)segs[(j+k)%N].y+=k*45}mm=mmBuild()}
function mmBuild(){let c=0,cs=[];for(let i=0;i<N;i++){cs.push(c);c+=segs[i].curve}
 const mx=Math.max(1,...cs.map((v,i)=>Math.abs(v-c*i/N)));
 return cs.map((v,i)=>{const r=1+.32*((v-c*i/N)/mx),a=i/N*6.2832-1.5708;return[30+Math.cos(a)*r*22,22+Math.sin(a)*r*16]})}
