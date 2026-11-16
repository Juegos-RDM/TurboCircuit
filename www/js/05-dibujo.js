/* ---------- drawing ---------- */
function proj(cx,z,wy){z=Math.max(z,1);const s=DEPTH/z;return{x:W/2+s*(-cx)*W/2,y:HOR+s*(camHt+camG-(wy||0))*H/2,w:s*RW*W/2,s}}
function poly(c,x1,y1,x2,y2,x3,y3,x4,y4){g.fillStyle=c;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.lineTo(x3,y3);g.lineTo(x4,y4);g.closePath();g.fill()}
const BGC={};
function lmDraw(x,k,hh){x.save();
 if(k==='pagoda'){let w=44,y=hh;const cx=470;for(let i=0;i<5;i++){const h=15;x.fillStyle=i%2?'#7a1f2a':'#a8323f';x.fillRect(cx-w/2+4,y-h,w-8,h);x.fillStyle='#2b2b36';x.beginPath();x.moveTo(cx-w/2-8,y-h);x.quadraticCurveTo(cx,y-h-6,cx+w/2+8,y-h);x.lineTo(cx+w/2,y-h-4);x.lineTo(cx-w/2,y-h-4);x.fill();y-=h+3;w-=6}x.fillStyle='#2b2b36';x.fillRect(470-1,y-12,2,12)}
 else if(k==='cristo'){const cx=372,y=hh-50;x.fillStyle='#e9eef2';x.fillRect(cx-3,y-26,6,26);x.fillRect(cx-15,y-22,30,5);x.beginPath();x.arc(cx,y-29,4,0,7);x.fill()}
 else if(k==='castle'){const cx=440,y=hh;x.fillStyle='#d8d4cc';x.fillRect(cx-40,y-34,80,34);for(const [dx,h] of[[-34,58],[-14,48],[10,66],[32,50]]){x.fillStyle='#e6e2da';x.fillRect(cx+dx-6,y-h,12,h);x.fillStyle='#3a5fa8';x.beginPath();x.moveTo(cx+dx-8,y-h);x.lineTo(cx+dx,y-h-16);x.lineTo(cx+dx+8,y-h);x.fill()}x.fillStyle='#3b3b44';for(let i=0;i<5;i++)x.fillRect(cx-32+i*15,y-22,4,8)}
 else if(k==='bridge'){const y=hh;x.fillStyle='#d8542a';for(const cx of[330,470]){x.fillRect(cx-4,y-70,8,70);x.fillRect(cx-4,y-70,8,6)}x.strokeStyle='#d8542a';x.lineWidth=2;x.beginPath();x.moveTo(250,y-18);x.quadraticCurveTo(330,y-12,330,y-66);x.quadraticCurveTo(400,y-20,470,y-66);x.quadraticCurveTo(470,y-12,560,y-18);x.stroke();x.fillRect(250,y-18,310,4)}
 else if(k==='colosseum'){const cx=420,y=hh;x.fillStyle='#c9a77a';x.beginPath();x.ellipse(cx,y-6,64,22,0,Math.PI,0);x.lineTo(cx+64,y);x.lineTo(cx-64,y);x.fill();x.fillStyle='rgba(60,40,20,.8)';for(let r=0;r<2;r++)for(let i=0;i<9;i++)x.fillRect(cx-56+i*12.5,y-12-r*10,6,8)}
 else if(k==='bigben'){const cx=440,y=hh;x.fillStyle='#b99a5e';x.fillRect(cx-9,y-72,18,72);x.fillRect(cx-12,y-82,24,12);x.beginPath();x.moveTo(cx-12,y-82);x.lineTo(cx,y-102);x.lineTo(cx+12,y-82);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(cx,y-58,6,0,7);x.fill();x.fillStyle='#b99a5e';x.fillRect(cx+16,y-36,60,36);x.fillStyle='#8c7440';for(let i=0;i<5;i++)x.fillRect(cx+20+i*11,y-30,5,12)}
 else if(k==='pyramid'){const cx=430,y=hh;for(let i=0;i<5;i++){x.fillStyle=shade('#c9b27a',1-i*.04);x.fillRect(cx-60+i*10,y-(i+1)*12,120-i*20,12)}x.fillStyle='#8a6d3a';x.fillRect(cx-5,y-60,10,60);x.fillStyle='#d9c38a';x.fillRect(cx-8,y-72,16,12)}
 else if(k==='opera'){const cx=430,y=hh;x.fillStyle='#8b8f99';x.fillRect(cx-70,y-8,140,8);x.fillStyle='#f4f4f8';for(const [dx,r,h] of[[-40,28,46],[-6,34,58],[34,24,38]]){x.beginPath();x.moveTo(cx+dx-r,y-8);x.quadraticCurveTo(cx+dx-r*.2,y-8-h*1.6,cx+dx+r*.7,y-8-h*.2);x.quadraticCurveTo(cx+dx+r*.9,y-8-h*.1,cx+dx+r,y-8);x.fill()}}
 x.restore()}
function bgBuild(c){const mk=()=>{const k=document.createElement('canvas');k.width=W;k.height=Math.ceil(HOR)+2;return k},far=mk(),near=mk(),cl=mk(),hh=far.height;
 let x=cl.getContext('2d');x.fillStyle='rgba(255,255,255,.6)';
 for(let i=0;i<6;i++){const cx=(i*97+60)%(W-140)+50,cy=18+(i*41)%55;for(let j=0;j<4;j++){x.beginPath();x.ellipse(cx+j*17-25,cy+(j%2)*4,22-j*2,9,0,0,7);x.fill()}}
 x=far.getContext('2d');x.globalAlpha=.7;x.fillStyle=lg(x,hh-70,hh,[[0,shade(c.far,1.5)],[1,shade(c.far,1.15)]]);x.beginPath();x.moveTo(0,hh);
 for(let p=0;p<=W;p+=8)x.lineTo(p,hh-32-18*Math.sin(p/W*12.566+c.seed)-10*Math.sin(p/W*31.416));x.lineTo(W,hh);x.fill();
 x=near.getContext('2d');
 if(c.bg==='mount'){[[0,200,70,0],[140,520,125,1],[430,W,60,0]].forEach(([a,b,t,sn])=>{const m=(a+b)/2;x.fillStyle=shade(c.far,1.1);x.beginPath();x.moveTo(a,hh);x.lineTo(m,hh-t);x.lineTo(m,hh);x.fill();x.fillStyle=shade(c.far,.7);x.beginPath();x.moveTo(m,hh-t);x.lineTo(b,hh);x.lineTo(m,hh);x.fill();if(sn){x.fillStyle='#fff';x.beginPath();x.moveTo(m,hh-t);x.lineTo(m-t*.28,hh-t*.64);x.lineTo(m-t*.1,hh-t*.7);x.lineTo(m,hh-t*.6);x.lineTo(m+t*.12,hh-t*.7);x.lineTo(m+t*.28,hh-t*.64);x.fill()}})}
 else if(c.bg==='sugar'){[[150,80,70],[360,50,48],[520,70,60]].forEach(([cx,r,ht])=>{x.fillStyle=lg(x,hh-ht,hh,[[0,shade(c.far,1.3)],[1,shade(c.far,.8)]]);x.beginPath();x.ellipse(cx,hh,r,ht,0,Math.PI,0);x.fill()})}
 else if(c.bg==='pines'){for(let i=0;i<28;i++){const px=i*23+(i%3)*5,h=34+(i*37)%32;x.fillStyle=shade(c.far,.75+.1*(i%3));x.beginPath();x.moveTo(px-14,hh);x.lineTo(px,hh-h);x.lineTo(px+14,hh);x.fill()}}
 else{for(let i=0;i<16;i++){const bx=i*40,h=34+(i*53)%80;x.fillStyle=lg(x,hh-h,hh,[[0,shade(c.far,1.1)],[1,shade(c.far,.7)]]);x.fillRect(bx,hh-h,34,h);x.fillStyle='rgba(255,230,140,.8)';for(let wy=hh-h+6;wy<hh-6;wy+=9)for(let wx=bx+5;wx<bx+30;wx+=8)if((wx*7+wy*3)%5<2)x.fillRect(wx,wy,3,4)}}
 if(c.lm)lmDraw(x,c.lm,hh);
 return{far,near,cl}}
function drawBG(c){const B=BGC[ci]||(BGC[ci]=bgBuild(c));
 const gr=g.createLinearGradient(0,0,0,HOR);gr.addColorStop(0,c.sky[0]);gr.addColorStop(1,c.sky[1]);g.fillStyle=gr;g.fillRect(0,0,W,HOR+2);
 const sx=W*.72,sy=HOR-70,sg=g.createRadialGradient(sx,sy,4,sx,sy,90);sg.addColorStop(0,c.sun);sg.addColorStop(.25,c.sun);sg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=sg;g.fillRect(sx-90,sy-90,180,180);
 const lay=(img,f)=>{const o=((bgx*f%W)+W)%W;g.drawImage(img,o-W,0);g.drawImage(img,o,0)};
 lay(B.cl,.25);lay(B.far,.55);lay(B.near,1)}
function shade(h,f){const n=parseInt(h.slice(1),16),m=v=>Math.max(0,Math.min(255,Math.round(v*f)));return `rgb(${m(n>>16&255)},${m(n>>8&255)},${m(n&255)})`}
function rrect(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
const lg=(x,y0,y1,st)=>{const q=x.createLinearGradient(0,y0,0,y1);st.forEach(([o,c])=>q.addColorStop(o,c));return q};
function carModel(v){const P=[],add=(m,...p)=>P.push({m,p}),ov=(m,...p)=>P.push({m,p,o:1});
 const box=(m,x0,x1,y0,y1,z0,z1)=>{add(m,[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]);add(m,[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0]);add(m,[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]);add(m,[x0,y0,z0],[x0,y1,z0],[x0,y1,z1],[x0,y0,z1]);add(m,[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[x1,y0,z1])};
 const S=[[-2.2,.16,.58,.96],[-1.7,.14,.62,1],[-.6,.14,.64,1],[.6,.14,.62,1],[1.5,.14,.52,.96],[2.2,.16,.34,.82]];
 const st=v===0?[[-.13,-.05],[.05,.13]]:v===1?[[-.06,.06]]:v===3?[[-.015,.015]]:v===4?[[-.2,-.12],[.12,.2]]:[],sm=(v===0||v===3)?'w':'y';
 for(let i=0;i<5;i++){const a=S[i],b=S[i+1];
  add('b',[-a[3],a[2],a[0]],[a[3],a[2],a[0]],[b[3],b[2],b[0]],[-b[3],b[2],b[0]]);
  for(const [u0,u1] of st)ov(sm,[u0,a[2]+.004,a[0]],[u1,a[2]+.004,a[0]],[u1,b[2]+.004,b[0]],[u0,b[2]+.004,b[0]]);
  for(const sd of[-1,1]){const w1=sd*a[3],w2=sd*b[3];add('b',[w1,a[1],a[0]],[w1,a[2],a[0]],[w2,b[2],b[0]],[w2,b[1],b[0]]);ov('k',[w1*1.003,a[1],a[0]],[w1*1.003,a[1]+.11,a[0]],[w2*1.003,b[1]+.11,b[0]],[w2*1.003,b[1],b[0]])}}
 add('b',[-.96,.16,-2.2],[.96,.16,-2.2],[.96,.58,-2.2],[-.96,.58,-2.2]);
 add('b',[-.82,.16,2.2],[.82,.16,2.2],[.82,.34,2.2],[-.82,.34,2.2]);
 for(const sd of[-1,1])ov('w',[sd*.45,.24,2.205],[sd*.74,.24,2.205],[sd*.74,.31,2.205],[sd*.45,.31,2.205]);
 if(v!==1){const bw=v===3?.52:.62,rw=v===3?.4:.5,rh=v===3?.93:.84,ww=v===3?.6:.68;
 add('g',[-bw,.62,-1.75],[bw,.62,-1.75],[rw,rh,-.62],[-rw,rh,-.62]);
 add('b',[-rw,rh,-.62],[rw,rh,-.62],[rw,rh-.01,.5],[-rw,rh-.01,.5]);
 for(const [u0,u1] of st)ov(sm,[u0,rh+.004,-.62],[u1,rh+.004,-.62],[u1,rh-.006,.5],[u0,rh-.006,.5]);
 add('g',[-rw,rh-.01,.5],[rw,rh-.01,.5],[ww+.06,.62,1.3],[-ww-.06,.62,1.3]);
 for(const sd of[-1,1])add('g',[sd*bw,.62,-1.75],[sd*rw,rh,-.62],[sd*rw,rh-.01,.5],[sd*(ww+.06),.62,1.3]);
 if(v===4)box('k',-.14,.14,rh,rh+.07,-.3,.2);}else{for(const sd of[-1,1]){const lo=Math.min(sd*.66,sd*.15),hi=Math.max(sd*.66,sd*.15);box('b',sd*.66-.04,sd*.66+.04,.62,.88,-1.5,-1.4);box('b',sd*.15-.04,sd*.15+.04,.62,.88,-1.5,-1.4);box('b',lo-.04,hi+.04,.84,.9,-1.5,-1.4);box('k',Math.min(sd*.6,sd*.2),Math.max(sd*.6,sd*.2),.62,.78,-1.25,-1.05)}
 ov('k',[-.62,.645,-1.35],[.62,.645,-1.35],[.62,.645,.3],[-.62,.645,.3]);box('m',-.12,.12,.8,.86,-.2,-.16);}
 const yy=z=>.586+.08*(z+2.2);
 for(let i=0;i<4;i++){const z0=-2.05+i*.1;ov('k',[-.5,yy(z0),z0],[.5,yy(z0),z0],[.5,yy(z0+.04),z0+.04],[-.5,yy(z0+.04),z0+.04])}
 const zr=-2.205,rg=(cx,cy,r,z)=>Array.from({length:12},(_,j)=>{const a=j/12*6.2832;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r,z]});
 ov('k',[-.7,.16,zr],[.7,.16,zr],[.7,.31,zr],[-.7,.31,zr]);
 if(v===1||v===2){ov('q',[-.6,.4,zr],[.6,.4,zr],[.56,.55,zr],[-.56,.55,zr]);
 ov('r',[-.55,.5,zr-.001],[.55,.5,zr-.001],[.55,.53,zr-.001],[-.55,.53,zr-.001]);
 ov('w',[-.5,.44,zr-.002],[.5,.44,zr-.002],[.5,.455,zr-.002],[-.5,.455,zr-.002]);
 for(const sd of[-1,1])ov('r',[sd*.64,.36,zr],[sd*.94,.4,zr],[sd*.94,.54,zr],[sd*.66,.5,zr]);}else{ov('k',[-.9,.36,zr],[.9,.36,zr],[.9,.56,zr],[-.9,.56,zr]);
 for(let i=0;i<5;i++){const yy=.385+i*.034;ov('p',[-.86,yy,zr-.001],[.86,yy,zr-.001],[.86,yy+.012,zr-.001],[-.86,yy+.012,zr-.001])}
 for(const sx of[-1,1])for(const lx of[.3,.62]){ov('q',...rg(sx*lx,.46,.088,zr-.002));ov('r',...rg(sx*lx,.46,.068,zr-.003));ov('w',...rg(sx*lx-.02,.48,.018,zr-.004))}}
 if(v===3){ov('p',[-.9,.31,zr-.001],[.9,.31,zr-.001],[.9,.58,zr-.001],[-.9,.58,zr-.001]);ov('b',[-.07,.31,zr-.002],[.07,.31,zr-.002],[.05,.58,zr-.002],[-.05,.58,zr-.002]);
  for(const sx of[-1,1]){ov('r',...rg(sx*.62,.46,.11,zr-.003));ov('k',...rg(sx*.62,.46,.075,zr-.004));ov('r',...rg(sx*.62,.46,.04,zr-.005))}
  for(const [qx,qy] of[[-.17,.27],[.17,.27],[-.17,.44],[.17,.44]]){ov('m',...rg(qx,qy,.085,zr-.004));ov('k',...rg(qx,qy,.055,zr-.005))}}
 if(v===4){ov('k',[-.95,.31,zr-.001],[.95,.31,zr-.001],[.95,.58,zr-.001],[-.95,.58,zr-.001]);
  for(const sd of[-1,1])ov('r',[sd*.7,.4,zr-.002],[sd*.93,.4,zr-.002],[sd*.93,.5,zr-.002],[sd*.7,.5,zr-.002]);
  ov('r',[-.08,.5,zr-.002],[.08,.5,zr-.002],[.08,.56,zr-.002],[-.08,.56,zr-.002]);
  ov('w',...rg(0,.42,.13,zr-.003));ov('k',...rg(0,.42,.1,zr-.004));ov('y',...rg(.55,.2,.045,zr-.004))}
 if(v!==3){ov('w',[-.25,.18,zr-.003],[.25,.18,zr-.003],[.25,.285,zr-.003],[-.25,.285,zr-.003]);ov('p',[-.23,.19,zr-.004],[.23,.19,zr-.004],[.23,.275,zr-.004],[-.23,.275,zr-.004])}
 for(const ex of(v===3?[]:v===4?[-.85,.85]:[-.4,.4])){ov('m',...rg(ex,.235,.1,zr-.005));ov('k',...rg(ex,.235,.062,zr-.006))}
 if(v===1||v===2)for(const ex of[-.68,.68]){ov('r',...rg(ex,.235,.05,zr-.005));ov('w',...rg(ex-.01,.245,.016,zr-.006))}
 for(const sx of[-1,1])for(const wz of[-1.35,1.4]){const N=10,cy=.34,xi=sx*.82,xo=sx*1.1,c=[sx*.96,cy,wz];
  const ring=(xx,r)=>Array.from({length:N},(_,j)=>{const a=j/N*6.2832;return[xx,cy+Math.sin(a)*r,wz+Math.cos(a)*r]});
  const A=ring(xi,.34),B=ring(xo,.34);
  for(let j=0;j<N;j++){const j2=(j+1)%N;P.push({m:'k',p:[A[j],A[j2],B[j2],B[j]],c})}
  P.push({m:'t',p:B,c});P.push({m:'m',p:ring(xo+sx*.004,.22),c,o:1});P.push({m:'k',p:ring(xo+sx*.008,.07),c,o:1})}
 if(v===0){box('b',-.96,.96,.58,.66,-2.22,-1.9);for(const t of[.15,.3,.45,.6,.75]){const z=-1.75+t*1.13,y=.62+t*.22,w=.62-t*.12;ov('k',[-w,y,z],[w,y,z],[w,y+.025,z+.05],[-w,y+.025,z+.05])}}
 else if(v===1){box('b',-.9,.9,.58,.62,-2.22,-1.95)}
 else if(v===2){box('c',-1.05,1.05,.86,.91,-2.27,-1.8);box('k',-.6,-.5,.58,.86,-2.05,-1.95);box('k',.5,.6,.58,.86,-2.05,-1.95);box('b',-.03,.03,.58,1.05,-2.1,-1.7);box('b',-1.08,-1.04,.78,.98,-2.3,-1.76);box('b',1.04,1.08,.78,.98,-2.3,-1.76)}
 else if(v===3){box('c',-.7,.7,.7,.74,-2.2,-1.95);box('k',-.5,-.44,.58,.7,-2.1,-2.04);box('k',.44,.5,.58,.7,-2.1,-2.04);box('b',-.76,-.72,.66,.84,-2.22,-1.9);box('b',.72,.76,.66,.84,-2.22,-1.9)}
 else{box('c',-1.0,1.0,.98,1.03,-2.3,-1.7);box('k',-.62,-.54,.6,.98,-2.05,-1.97);box('k',.54,.62,.6,.98,-2.05,-1.97);box('b',-1.04,-1.0,.86,1.08,-2.34,-1.66);box('b',1.0,1.04,.86,1.08,-2.34,-1.66);box('b',-1.14,-.96,.22,.6,-2.1,-.9);box('b',.96,1.14,.22,.6,-2.1,-.9)}
 return P}
const CAR3={};
function carFrame(col,v,yi){const key=col+v+'_'+yi;if(CAR3[key])return CAR3[key];if(Object.keys(CAR3).length>260)for(const k in CAR3)delete CAR3[k];
 const yaw=(yi-6)/6*.45,cs=Math.cos(yaw),sn=Math.sin(yaw),F=1711/(1+Math.max(0,Math.abs(yi-6)-6)*.08),D=14,camH=1.1,Y0=160-camH*F/11.8;
 const k=document.createElement('canvas');k.width=320;k.height=165;const x=k.getContext('2d');
 const L=[-.35,.85,-.4],out=[];
 for(const f of carModel(v)){
  const q=f.p.map(([px,py,pz])=>[px*cs+pz*sn,py,-px*sn+pz*cs]);
  const c0=f.c||[0,.5,0],cc=[c0[0]*cs+c0[2]*sn,c0[1],-c0[0]*sn+c0[2]*cs];
  const a=q[0],b=q[1],c=q[2];let n=[(b[1]-a[1])*(c[2]-a[2])-(b[2]-a[2])*(c[1]-a[1]),(b[2]-a[2])*(c[0]-a[0])-(b[0]-a[0])*(c[2]-a[2]),(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])];
  const m=Math.hypot(n[0],n[1],n[2])||1;n=n.map(u=>u/m);
  const mx=q.reduce((s,p)=>s+p[0],0)/q.length,my=q.reduce((s,p)=>s+p[1],0)/q.length,mz=q.reduce((s,p)=>s+p[2],0)/q.length;
  if(n[0]*(mx-cc[0])+n[1]*(my-cc[1])+n[2]*(mz-cc[2])<0)n=n.map(u=>-u);
  if(n[0]*(0-mx)+n[1]*(camH-my)+n[2]*(-D-mz)<=0)continue;
  out.push({f,n,pts:q.map(([X,Y,Z])=>{const d=Z+D,s=F/d;return[160+X*s,Y0-(Y-camH)*s]}),d:mz+D-(f.o?.35:0)})}
 out.sort((a,b)=>b.d-a.d);
 const COL={g:'#27466f',k:'#101015',m:'#98a0ad',c:'#24242b',t:'#141418',w:'#ffffff',y:'#ffd36b',r:'#ff2a45',q:'#6e0b17',p:'#34343a'};
 for(const o of out){const m=o.f.m,l=Math.max(0,o.n[0]*L[0]+o.n[1]*L[1]+o.n[2]*L[2]),fc=.5+.62*l,base=m==='b'?col:COL[m],fill=m==='r'?base:shade(base,m==='g'?.6+.9*l:fc);
  x.beginPath();o.pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();
  x.save();if(m==='r'){x.shadowColor='#ff1a3a';x.shadowBlur=7}x.fillStyle=fill;x.fill();x.restore();
  x.strokeStyle=m==='r'?fill:shade(base,.5*fc);x.lineWidth=1;x.stroke()}
 return CAR3[key]=k}
function drawCar(cx,by,w,col,flame,v,br,yaw){v=v||0;if(!(w>1)||w>1200||!isFinite(cx+by))return;const h=w*165/320,top=by-h*160/165;
 g.save();g.translate(cx,by);g.scale(1,.18);const sg=g.createRadialGradient(0,0,0,0,0,w*.62);sg.addColorStop(0,'rgba(0,0,0,.65)');sg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sg;g.beginPath();g.arc(0,0,w*.62,0,7);g.fill();g.restore();
 const yi=Math.round(Math.max(-1,Math.min(1,(yaw||0)/.45))*6)+6;
 g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(carFrame(col,v,yi),cx-w/2,top,w,h);
 g.save();g.globalCompositeOperation='lighter';
 if(br){for(const s of[-1,1]){const gx=cx+s*w*.35,gy=by-h*.395,q=g.createRadialGradient(gx,gy,0,gx,gy,w*.2);q.addColorStop(0,'rgba(255,40,60,.75)');q.addColorStop(1,'rgba(255,40,60,0)');g.fillStyle=q;g.fillRect(gx-w*.22,gy-w*.22,w*.44,w*.44)}}
 if(flame){for(const o of[-.172,.172]){const ex=cx+o*w,ey=by-h*.212,ln=h*(.8+Math.random()*.7),q=g.createLinearGradient(0,ey,0,ey+ln);q.addColorStop(0,'#fff');q.addColorStop(.3,'#ffb020');q.addColorStop(1,'rgba(255,60,0,0)');g.fillStyle=q;g.beginPath();g.moveTo(ex-w*.045,ey);g.lineTo(ex,ey+ln);g.lineTo(ex+w*.045,ey);g.fill()}}
 g.restore()}
const OBJ={};
function objSpr(ty,col){const key=ty+col;if(OBJ[key])return OBJ[key];const k=document.createElement('canvas');k.width=120;k.height=200;const x=k.getContext('2d');
 if(ty==='pine'){x.fillStyle='#4a2f1b';x.fillRect(54,150,12,50);for(let i=0;i<4;i++){const y=150-i*32,w=54-i*8;x.beginPath();x.moveTo(60-w,y);x.lineTo(60,y-46);x.lineTo(60+w,y);x.closePath();x.fillStyle=lg(x,y-46,y,[[0,shade(col,1.35)],[1,shade(col,.7)]]);x.fill();x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.moveTo(60,y-46);x.lineTo(60+w,y);x.lineTo(60,y);x.closePath();x.fill()}}
 else if(ty==='sakura'){x.fillStyle='#4a2f1b';x.fillRect(54,100,12,100);x.fillRect(40,98,28,6);for(const [cx,cy,r] of[[60,66,38],[32,92,26],[88,92,26],[42,50,24],[78,50,24],[60,32,22]]){const q=x.createRadialGradient(cx-r*.3,cy-r*.3,2,cx,cy,r);q.addColorStop(0,shade(col,1.25));q.addColorStop(1,shade(col,.8));x.fillStyle=q;x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}x.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<14;i++){x.fillRect(22+(i*37)%76,26+(i*53)%70,3,3)}}
 else if(ty==='palm'){x.strokeStyle='#8a6a45';x.lineWidth=10;x.lineCap='round';x.beginPath();x.moveTo(52,200);x.quadraticCurveTo(46,120,66,62);x.stroke();x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=2;for(let i=0;i<9;i++){x.beginPath();x.moveTo(46+i*.6,190-i*14);x.lineTo(58+i*.6,190-i*14);x.stroke()}
  for(const a of[-.3,.45,1.1,1.8,2.5,3.3,4.0]){x.save();x.translate(66,62);x.rotate(a);x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(30,-26,58,12);x.quadraticCurveTo(30,-4,0,0);x.fillStyle=lg(x,-26,12,[[0,shade(col,1.4)],[1,shade(col,.7)]]);x.fill();x.restore()}x.fillStyle='#5a3a1e';x.beginPath();x.arc(62,68,5,0,7);x.arc(72,70,5,0,7);x.fill()}
 else if(ty==='torii'){x.fillStyle=col;x.fillRect(22,70,10,130);x.fillRect(88,70,10,130);x.fillRect(10,56,100,12);x.fillStyle='#1b1b22';x.fillRect(4,46,112,12);x.fillStyle=col;x.fillRect(30,92,60,7)}
 else if(ty==='cypress'){x.fillStyle='#4a3a22';x.fillRect(56,170,8,30);const q=x.createLinearGradient(40,0,80,0);q.addColorStop(0,shade(col,.7));q.addColorStop(1,shade(col,1.25));x.fillStyle=q;x.beginPath();x.moveTo(60,6);x.quadraticCurveTo(86,100,66,176);x.lineTo(54,176);x.quadraticCurveTo(34,100,60,6);x.fill()}
 else if(ty==='cactus'){x.fillStyle=col;rrect(x,52,40,18,160,9);x.fill();rrect(x,26,84,14,50,7);x.fill();x.fillRect(26,120,40,12);rrect(x,82,60,14,60,7);x.fill();x.fillRect(66,104,28,12)}
 else if(ty==='lamp'){x.fillStyle='#2b2b36';x.fillRect(56,30,8,170);x.fillRect(56,30,34,6);x.fillStyle=col;x.beginPath();x.arc(92,42,9,0,7);x.fill()}
 else if(ty==='euca'){x.strokeStyle='#cfc8bb';x.lineWidth=9;x.lineCap='round';x.beginPath();x.moveTo(58,200);x.quadraticCurveTo(66,120,52,70);x.stroke();for(const [qx,qy,r] of[[44,56,26],[74,44,24],[60,26,22],[86,70,18]]){x.fillStyle=shade(col,.9+(qx%3)*.08);x.beginPath();x.ellipse(qx,qy,r,r*.6,0,0,7);x.fill()}}
 else if(ty==='pump'){rrect(x,28,50,64,140,8);x.fillStyle=lg(x,50,190,[[0,'#ff5a5a'],[1,'#a01020']]);x.fill();x.strokeStyle='#300';x.lineWidth=3;x.stroke();x.fillStyle='#e9edf5';x.fillRect(28,110,64,14);rrect(x,38,62,44,30,4);x.fillStyle='#0b2a1a';x.fill();x.fillStyle='#4dff9a';x.font='bold 22px sans-serif';x.textAlign='center';x.fillText('GAS',60,86);x.fillStyle='#222';x.fillRect(22,36,76,14);x.strokeStyle='#222';x.lineWidth=6;x.beginPath();x.moveTo(92,120);x.quadraticCurveTo(116,130,108,170);x.stroke();x.fillStyle='#ffd36b';x.beginPath();x.moveTo(60,138);x.quadraticCurveTo(48,160,60,172);x.quadraticCurveTo(72,160,60,138);x.fill()}
 else if(ty==='crew'){x.fillStyle='#222';x.fillRect(46,150,12,40);x.fillRect(64,150,12,40);x.fillStyle='#111';x.fillRect(42,186,18,10);x.fillRect(62,186,18,10);rrect(x,40,86,42,70,10);x.fillStyle=lg(x,86,156,[[0,shade(col,1.25)],[1,shade(col,.7)]]);x.fill();x.strokeStyle=shade(col,.4);x.lineWidth=2;x.stroke();x.strokeStyle=shade(col,.9);x.lineWidth=12;x.lineCap='round';x.beginPath();x.moveTo(42,96);x.lineTo(18,58);x.moveTo(80,96);x.lineTo(104,58);x.stroke();x.fillStyle='#f4f4f8';x.beginPath();x.arc(61,64,20,0,7);x.fill();x.fillStyle='#1a2a44';x.fillRect(46,58,30,12);x.fillStyle='#fff';x.fillRect(48,59,10,3)}
 else if(ty==='pitsign'){x.fillStyle='#8a8f99';x.fillRect(28,90,7,110);x.fillRect(85,90,7,110);rrect(x,4,14,112,80,8);x.fillStyle=lg(x,14,94,[[0,shade(col,1.3)],[1,shade(col,.7)]]);x.fill();x.strokeStyle='#fff';x.lineWidth=3;x.stroke();x.fillStyle='#fff';x.font='bold 34px sans-serif';x.textAlign='center';x.fillText('PIT',50,66);x.beginPath();x.moveTo(84,38);x.lineTo(104,54);x.lineTo(84,70);x.closePath();x.fill()}
 else{x.fillStyle='#8a8f99';x.fillRect(30,100,7,100);x.fillRect(83,100,7,100);rrect(x,6,18,108,84,6);x.fillStyle='#14162a';x.fill();x.strokeStyle='#b8bec9';x.lineWidth=3;x.stroke();rrect(x,13,25,94,70,4);x.fillStyle=lg(x,25,95,[[0,shade(col,1.3)],[1,shade(col,.7)]]);x.fill();x.fillStyle='rgba(255,255,255,.3)';for(let i=0;i<4;i++)x.fillRect(20+i*22,25,8,70);x.fillStyle='#fff';x.font='bold 21px sans-serif';x.textAlign='center';x.fillText('TURBO',60,66);x.fillStyle='#ffe27a';x.fillRect(20,2,80,6)}
 return OBJ[key]=k}
function drawObj(o,x,y,s,f){const h=1500*s*W/2*(f||1);if(!(h>=4)||h>1800)return;const w=h*.6;g.drawImage(objSpr(o[0],o[1]),x-w/2,y-h,w,h)}
function render(){
 const c=CT[ci],car=CARS[ki];g.setTransform(DPR,0,0,DPR,0,0);g.save();if(shake>0)g.translate((Math.random()-.5)*shake*12,(Math.random()-.5)*shake*8);drawBG(c);
 g.fillStyle=c.grass[0];g.fillRect(0,HOR,W,H-HOR);
 const camZ=pos-PZ,bi=Math.floor(camZ/SEG),bp=(camZ-bi*SEG)/SEG,camX=px*RW;
 let x=0,dx=-(seg(bi).curve*bp);const P=[];
 for(let n=0;n<DRAW;n++){const s=seg(bi+n),z1=(bi+n)*SEG-camZ;
  P.push({n:bi+n,s,a:proj(camX-x,z1,s.y),b:proj(camX-x-dx,z1+SEG,seg(bi+n+1).y),cars:[]});x+=dx;dx+=s.curve}
 for(const r of rivals){r.sw=0}
 for(const r of rivals){const idx=Math.floor(r.z/SEG)-bi;if(idx>=0&&idx<DRAW)P[idx].cars.push(r)}
 for(let n=DRAW-1;n>=0;n--){const q=P[n],a=q.a,b=q.b,alt=Math.floor(q.n/3)%2;if(a.y<=b.y)continue;
  g.fillStyle=c.grass[alt];g.fillRect(0,b.y,W,a.y-b.y+1);
  poly(c.rum[alt],a.x-a.w*1.14,a.y,a.x+a.w*1.14,a.y,b.x+b.w*1.14,b.y,b.x-b.w*1.14,b.y);
  poly(c.road[alt],a.x-a.w,a.y,a.x+a.w,a.y,b.x+b.w,b.y,b.x-b.w,b.y);
  if(Math.floor(q.n/4)%2===0)poly('#f4f4f4',a.x-a.w*.02,a.y,a.x+a.w*.02,a.y,b.x+b.w*.02,b.y,b.x-b.w*.02,b.y);
  const qi=((q.n%N)+N)%N;
  if(usePit&&qi>=PZ0-40&&qi<PZ0)poly('rgba(77,210,255,'+(.35+.3*Math.sin(t*8))+')',a.x+a.w*.8,a.y,a.x+a.w*1.2,a.y,b.x+b.w*1.2,b.y,b.x+b.w*.8,b.y);
  if(usePit&&qi>=PZ0&&qi<=PZ1){poly('#3a3d4a',a.x+a.w*1.2,a.y,a.x+a.w*2.15,a.y,b.x+b.w*2.15,b.y,b.x+b.w*1.2,b.y);poly(alt?'#ffd36b':'#ffffff',a.x+a.w*1.2,a.y,a.x+a.w*1.26,a.y,b.x+b.w*1.26,b.y,b.x+b.w*1.2,b.y);
   if(qi>=PB-5&&qi<=PB+5)poly('rgba(255,176,32,.4)',a.x+a.w*1.3,a.y,a.x+a.w*2.05,a.y,b.x+b.w*2.05,b.y,b.x+b.w*1.3,b.y)}
  if(usePit&&qi===PZ0-8)drawObj(['pitsign','#2bb5ff'],a.x+a.w*1.5,a.y,a.s,.55);
  if(usePit&&qi===PB){drawObj(['pump','#e0243a'],a.x+a.w*2.5,a.y,a.s,.3);drawObj(['crew','#e0243a'],a.x+a.w*2.2,a.y,a.s,.28)}
  if(usePit&&qi===PB+3)drawObj(['crew','#2468ff'],a.x+a.w*2.2,a.y,a.s,.28);
  if(usePit&&qi===PB-3)drawObj(['crew','#f2f4f8'],a.x+a.w*2.2,a.y,a.s,.28);
  if(q.n%8===0){for(const sd of[-1,1])drawObj(c.obj,a.x+sd*a.w*1.55,a.y,a.s,sd)}
  if(c.o2&&q.n%20===10)drawObj(c.o2,a.x+(q.n%40===10?1:-1)*a.w*1.85,a.y,a.s,1)
  for(const r of q.cars){const pc=(r.z-q.n*SEG)/SEG,sx=a.x+(b.x-a.x)*pc,sy=a.y+(b.y-a.y)*pc,ss=a.s+(b.s-a.s)*pc;
   r.sx=sx+ss*r.off*RW*W/2;r.sy=sy;r.sw=ss*CWID*W/2;drawCar(r.sx,r.sy,r.sw,r.col,0,r.k%5,0,q.s.curve*.06+Math.sin(t*.7+r.k)*.04)}}
 const sp=speed/MAXS;drawCar(W/2+st*5,H*.92-Math.random()*sp*1.5-(ph-gh(pos))*DEPTH/PZ*H/2,CWID*DEPTH/PZ*W/2,repOv?repOv.col:carCol(ki),nitT>0,repOv?repOv.d:ki,inp.B,st*.4);
 drawWx();if(speed/MAXS>.85&&!(nitT>0)){g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=1.5;for(let i=0;i<10;i++){const a=Math.random()*6.283,d1=170+Math.random()*50;g.beginPath();g.moveTo(W/2+Math.cos(a)*d1*1.5,H*.45+Math.sin(a)*d1*.75);g.lineTo(W/2+Math.cos(a)*(d1+40)*1.5,H*.45+Math.sin(a)*(d1+40)*.75);g.stroke()}}
 drawParts();g.restore();
 hud(c);
}
function pitScreen(){
 const si=((Math.floor(pos/SEG)%N)+N)%N;
 if(!(usePit&&mode==='race'&&inLane&&si>=PB-5&&si<=PB+5&&!svcDone))return;
 const F="'Russo One',Impact,sans-serif",G="'Chakra Petch',sans-serif",car=CARS[ki];
 const T=(a,x,y,al,col,f)=>{g.font=f;g.textAlign=al;g.textBaseline='alphabetic';g.fillStyle='rgba(0,0,0,.55)';g.fillText(a,x+1.5,y+1.5);g.fillStyle=col;g.fillText(a,x,y)};
 g.fillStyle='rgba(5,8,28,.93)';g.fillRect(0,0,W,H);g.imageSmoothingEnabled=true;
 rrect(g,12,12,368,336,16);g.fillStyle='rgba(30,36,90,.55)';g.fill();g.strokeStyle='rgba(77,210,255,.6)';g.lineWidth=2;g.stroke();
 T('BOXES',28,48,'left','#ffb020','30px '+F);T(svc>0?'Repostando…':'Entrando a boxes…',28,70,'left','#9fd8ff','14px '+G);
 if(svc>0)T('Servicio '+Math.min(100,Math.round(svc/svcNeed*100))+'%',364,48,'right','#4dd2ff','18px '+F);
 g.drawImage(objSpr('crew','#2468ff'),16,136,60,100);
 g.drawImage(carFrame(carCol(ki),ki,6),70,112,236,122);
 g.drawImage(objSpr('pump','#e0243a'),300,96,66,110);
 g.save();g.lineCap='round';g.strokeStyle='#222';g.lineWidth=7;g.beginPath();g.moveTo(330,178);g.quadraticCurveTo(300,232,262,200);g.stroke();
 g.strokeStyle='#ffd36b';g.lineWidth=3;g.setLineDash([8,10]);g.lineDashOffset=-t*70;g.beginPath();g.moveTo(330,178);g.quadraticCurveTo(300,232,262,200);g.stroke();g.restore();
 g.fillStyle='#ffe27a';for(let k=0;k<5;k++){const u=(t*1.4+k/5)%1,m=1-u,x=m*m*330+2*m*u*300+u*u*262,y=m*m*178+2*m*u*232+u*u*200;g.beginPath();g.arc(x,y,3.2,0,7);g.fill()}
 T('GASOLINA',28,250,'left','#9fa6d6','13px '+G);T(Math.round(fuel*100)+'%',364,250,'right','#fff','20px '+F);
 rrect(g,28,258,336,16,8);g.fillStyle='rgba(255,255,255,.15)';g.fill();const gr=g.createLinearGradient(28,0,364,0);gr.addColorStop(0,'#ff8a1f');gr.addColorStop(1,'#ffe27a');rrect(g,28,258,Math.max(10,336*fuel),16,8);g.fillStyle=gr;g.fill();
 T('LLANTAS',28,298,'left','#9fa6d6','13px '+G);rrect(g,100,288,264,12,6);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,100,288,Math.max(8,264*(1-wear)),12,6);g.fillStyle='#4dd2ff';g.fill();
 T('CARROCERÍA',28,326,'left','#9fa6d6','13px '+G);rrect(g,128,315,236,12,6);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,128,315,Math.max(8,236*(1-dmg)),12,6);g.fillStyle=dmg>.6?'#ff3d5a':dmg>.3?'#ffb020':'#3ddc84';g.fill();
 T('◀ '+TY[tyre].n+' ▶',364,72,'right',TY[tyre].col,'17px '+F);
 rrect(g,392,12,236,336,16);g.fillStyle='rgba(30,36,90,.55)';g.fill();g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=1;g.stroke();
 T('POSICIONES',408,42,'left','#ffffff','18px '+F);
 const ord=[{n:'Tú',z:pos,col:carCol(ki),v:ki,me:1},...rivals.map(r=>({n:NM[r.k+1],z:r.z,col:r.col,v:r.k%5}))].sort((a,b)=>b.z-a.z);
 ord.forEach((o,j)=>{const y=54+j*36;rrect(g,402,y,216,32,8);g.fillStyle=o.me?'rgba(255,176,32,.28)':'rgba(255,255,255,.07)';g.fill();if(o.me){g.strokeStyle='#ffb020';g.lineWidth=2;g.stroke()}
  g.beginPath();g.arc(424,y+16,13,0,7);g.fillStyle=o.me?'#ffb020':'#2a3070';g.fill();T(String(j+1),424,y+22,'center',o.me?'#1a1200':'#ffffff','16px '+F);
  g.drawImage(carFrame(o.col,o.v,6),450,y+3,56,29);T(o.n,516,y+22,'left',o.me?'#ffd36b':'#ffffff','15px '+G)})
}
function lights(){const n=Math.max(0,4-Math.ceil(cd));g.fillStyle='rgba(8,10,30,.7)';rrect(g,W/2-85,H*.3-30,170,60,14);g.fill();
 for(let i=0;i<3;i++){g.beginPath();g.arc(W/2+(i-1)*46,H*.3,17,0,7);g.save();if(i<n){g.shadowColor='#ff2a3a';g.shadowBlur=18}g.fillStyle=i<n?'#ff2a3a':'#2a0a10';g.fill();g.restore();g.strokeStyle='#555';g.lineWidth=3;g.stroke()}}
function hud(c){if(mode==='replay'){hudRep();return}
 const r=1+rivals.filter(v=>v.z>pos).length,lap=Math.min(LAPS,Math.floor(pos/L)+1),sp=Math.min(1,speed/MAXS),F="'Russo One',Impact,sans-serif",G="'Chakra Petch',sans-serif";
 const txt=(s,x,y,al,col,f)=>{g.font=f||('20px '+F);g.textAlign=al;g.textBaseline='alphabetic';g.fillStyle='rgba(0,0,0,.55)';g.fillText(s,x+1.5,y+1.5);g.fillStyle=col||'#fff';g.fillText(s,x,y)};
 const pan=(a,b,w,h)=>{rrect(g,a,b,w,h,10);g.fillStyle='rgba(10,14,40,.58)';g.fill();g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=1;g.stroke()};
 const vg=g.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H*.95);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,10,.45)');g.fillStyle=vg;g.fillRect(0,0,W,H);
 if(nitT>0){g.fillStyle='rgba(80,180,255,.10)';g.fillRect(0,0,W,H);g.strokeStyle='rgba(255,255,255,.28)';g.lineWidth=1.5;for(let i=0;i<14;i++){const a=Math.random()*6.283,d1=130+Math.random()*60,d2=d1+40+Math.random()*60;g.beginPath();g.moveTo(W/2+Math.cos(a)*d1*1.6,H*.45+Math.sin(a)*d1*.8);g.lineTo(W/2+Math.cos(a)*d2*1.6,H*.45+Math.sin(a)*d2*.8);g.stroke()}}
 pan(8,8,104,56);txt('VUELTA '+lap+'/'+LAPS,18,25,'left','#9fa6d6','12px '+G);txt(r+'º',18,56,'left','#ffb020','32px '+F);txt(mode2===2?'':'/ 8',62,56,'left','#9fa6d6','15px '+G);
 pan(8,68,104,26);txt(TY[tyre].n.slice(0,3).toUpperCase(),16,85,'left',TY[tyre].col,'10px '+G);rrect(g,58,76,46,8,4);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,58,76,Math.max(4,46*(1-wear)),8,4);g.fillStyle=wear>.7?'#ff3d5a':wear>.4?'#ffb020':'#4dd2ff';g.fill();
 if(dmg>.02){pan(8,128,104,26);txt('DAÑO',16,145,'left','#9fa6d6','10px '+G);rrect(g,58,136,46,8,4);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,58,136,Math.max(3,46*(1-dmg)),8,4);g.fillStyle=dmg>.6?'#ff3d5a':dmg>.3?'#ffb020':'#3ddc84';g.fill()}
 if(usePit){const si=((Math.floor(pos/SEG)%N)+N)%N;
  pan(8,98,104,26);txt('GASOLINA',16,115,'left','#9fa6d6','10px '+G);rrect(g,70,106,34,8,4);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,70,106,Math.max(3,34*fuel),8,4);g.fillStyle=fuel<.2?(Math.floor(t*4)%2?'#ff3d5a':'#7a1020'):fuel<.4?'#ffb020':'#3ddc84';g.fill();
  if(fuel<=0&&mode==='race')txt('¡Sin gasolina!',W/2,H*.34,'center','#ff3d5a','26px '+F);
  if(mode==='race'&&!inLane&&CARS[ki].tank<LAPS&&si>=PZ0-90&&si<=PZ0+30){const pu=.5+.5*Math.sin(t*8);
   rrect(g,W/2-150,36,300,50,12);g.fillStyle='rgba(8,12,40,.86)';g.fill();g.strokeStyle='rgba(77,210,255,'+(.55+.4*pu)+')';g.lineWidth=2.5;g.stroke();
   txt('¡ENTRA A BOXES!',W/2-14,62,'center','#ffffff','22px '+F);
   txt(px>1.15?'Frena en la zona amarilla':'Gira a la derecha y sigue las flechas',W/2-14,80,'center','#4dd2ff','12px '+G);
   g.fillStyle='rgba(77,210,255,'+(.5+.5*pu)+')';for(let k=0;k<2;k++){const x=W/2+112+k*14+pu*6;g.beginPath();g.moveTo(x,50);g.lineTo(x+12,61);g.lineTo(x,72);g.lineTo(x+5,72);g.lineTo(x+17,61);g.lineTo(x+5,50);g.closePath();g.fill()}}}
 pan(W-112,8,104,28);txt(fmt(t),W-18,29,'right','#fff','18px '+F);
 {const cx=W-62,cy=92,R=36,a0=Math.PI*.8,a1=Math.PI*2.2,s1=Math.min(1,speed/MAXS/1.1);pan(W-118,40,112,94);g.lineCap='round';
  g.lineWidth=7;g.strokeStyle='rgba(255,255,255,.14)';g.beginPath();g.arc(cx,cy,R,a0,a1);g.stroke();
  const g2=g.createLinearGradient(cx-R,0,cx+R,0);g2.addColorStop(0,'#3ddc84');g2.addColorStop(.6,'#ffb020');g2.addColorStop(1,'#ff3d5a');
  g.strokeStyle=nitT>0?'#4dd2ff':g2;g.beginPath();g.arc(cx,cy,R,a0,a0+(a1-a0)*Math.max(.01,s1));g.stroke();
  const gear=Math.min(6,1+Math.floor(speed/MAXS*6)),rpm=Math.min(1,(speed/MAXS*6)%1+.05);
  g.lineWidth=3;g.strokeStyle='rgba(255,255,255,.12)';g.beginPath();g.arc(cx,cy,R-9,a0,a1);g.stroke();g.strokeStyle=rpm>.85?'#ff3d5a':'#4dd2ff';g.beginPath();g.arc(cx,cy,R-9,a0,a0+(a1-a0)*rpm);g.stroke();
  g.lineWidth=1.5;g.strokeStyle='rgba(255,255,255,.4)';for(let i=0;i<=8;i++){const a=a0+(a1-a0)*i/8;g.beginPath();g.moveTo(cx+Math.cos(a)*(R+6),cy+Math.sin(a)*(R+6));g.lineTo(cx+Math.cos(a)*(R+9),cy+Math.sin(a)*(R+9));g.stroke()}
  const an=a0+(a1-a0)*s1;g.strokeStyle='#fff';g.lineWidth=2.5;g.beginPath();g.moveTo(cx+Math.cos(an)*(R-18),cy+Math.sin(an)*(R-18));g.lineTo(cx+Math.cos(an)*(R+2),cy+Math.sin(an)*(R+2));g.stroke();
  txt(String(Math.round(speed/MAXS*320)),cx,cy+6,'center','#ffffff','22px '+F);txt('km/h',cx,cy+19,'center','#9fa6d6','10px '+G);txt('Marcha '+gear,cx,cy+36,'center','#ffb020','12px '+G)}
 for(let i=0,nc=CARS[ki].nc,w0=(nc*28-4)/2;i<nc;i++){rrect(g,W/2-w0+i*28,10,24,8,4);if(i<nit){g.save();g.shadowColor='#ffb020';g.shadowBlur=10;g.fillStyle='#ffb020';g.fill();g.restore()}else{g.fillStyle='rgba(255,255,255,.18)';g.fill()}}
 rrect(g,W/2-60,24,120,5,2.5);g.fillStyle='rgba(255,255,255,.2)';g.fill();const pr=Math.min(1,pos/(LAPS*L));rrect(g,W/2-60,24,Math.max(5,120*pr),5,2.5);g.fillStyle='#ff3d5a';g.fill();
 pan(W-112,138,104,76);
 if(mm.length){const ox=W-112+22,oy=138+16;g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=3;g.lineJoin='round';g.beginPath();for(let i=0;i<mm.length;i+=4)i?g.lineTo(ox+mm[i][0],oy+mm[i][1]):g.moveTo(ox+mm[i][0],oy+mm[i][1]);g.closePath();g.stroke();
  const dot=(z,col,rr)=>{const q=mm[((Math.floor(z/SEG)%N)+N)%N];if(q){g.fillStyle=col;g.beginPath();g.arc(ox+q[0],oy+q[1],rr,0,7);g.fill()}};
  for(const q of rivals)dot(q.z,q.col,2.6);dot(pos,'#ffb020',4)}
 if(inLane){pan(W-112,218,104,26);txt('LÍMITE '+Math.round(.28*320)+' km/h',W-60,236,'center','#ffd36b','12px '+G)}
 {let g1=null;for(const q of rivals)if(q.z>pos&&(!g1||q.z<g1.z))g1=q;
  if(g1&&mode==='race')txt('▲ '+NM[g1.k+1]+'  +'+((g1.z-pos)/Math.max(speed,3000)).toFixed(1)+'s',W/2,104,'center','#ffd36b','13px '+G)}
 if(drift>0){rrect(g,W/2-40,112,80,6,3);g.fillStyle='rgba(255,255,255,.15)';g.fill();rrect(g,W/2-40,112,Math.max(4,80*drift),6,3);g.fillStyle='#ff8a1f';g.fill()}
 if(tT>0)txt(tS,W/2,H*.5,'center','#ffd36b','22px '+F);
 const big=(s,col)=>{g.save();g.shadowColor=col;g.shadowBlur=24;txt(s,W/2,H*.3,'center',col,'64px '+F);g.restore()};
 if(mode==='count')lights();
 else if(mode==='race'&&t<1)big('¡Ya!','#ffb020');
 else if(mode==='done')big('Meta','#ffffff');
 else if(air&&ph-gh(pos)>250)big('¡Salto!','#ffb020');
 if(goT>0)big('¡A pista!','#3ddc84');
 pitScreen();if(P.set.fps){g.font='11px monospace';g.textAlign='left';g.fillStyle='#9fd';g.fillText(Math.round(fpsAvg)+' FPS',W/2-20,H-6)}
}
function refreshSet(){$('sMus').value=Math.round(P.set.mus*100);$('sEng').value=Math.round(P.set.eng*100);$('sSfx').value=Math.round(P.set.sfx*100);
 $('trow').innerHTML=[['vib','Vibración'],['tilt','Inclinación'],['fps','Ver FPS'],['auto','Calidad auto']].map(([k,n])=>`<button class="opt ${P.set[k]?'on':''}" data-t="${k}">${n}</button>`).join('');
 $('qrow').innerHTML=['Gráficos bajos','Medios','Altos'].map((n,i)=>`<button class="opt ${i===P.set.q?'on':''}" data-q="${i}">${n}</button>`).join('')}
function closeSet(){$('pause').classList.add('hide');paused=false;if(musF)musF.frequency.value=20000;last=performance.now();save()}
function openSet(inRace){refreshSet();$('pt').textContent=inRace?'Pausa':'Ajustes';
 $('pb').innerHTML=inRace?'<button class="big" id="pc">Continuar</button><button class="opt" id="pr">Reiniciar</button><button class="opt" id="pm">Menú</button>':'<button class="big" id="pc">Cerrar</button>';
 $('pause').classList.remove('hide');$('pc').onclick=()=>inRace?setPause(false):closeSet();
 if(inRace){$('pr').onclick=()=>{closeSet();start()};$('pm').onclick=()=>{closeSet();toMenu()}}}
function setPause(v){if(v){if(mode!=='race'&&mode!=='count')return;paused=true;if(engG)engG.gain.value=0;if(rainG)rainG.gain.value=0;if(musF)musF.frequency.value=700;openSet(true)}else closeSet()}
$('sMus').oninput=e=>{P.set.mus=e.target.value/100;applyVol()};$('sEng').oninput=e=>{P.set.eng=e.target.value/100;applyVol()};$('sSfx').oninput=e=>{P.set.sfx=e.target.value/100;applyVol()};
$('setb').onclick=()=>openSet(false);
$('rPlay').onclick=()=>{repPlay=!repPlay;$('rPlay').textContent=repPlay?'⏸':'▶'};
$('rSp').onclick=()=>{repSp=repSp===1?2:repSp===2?.5:1;$('rSp').textContent=repSp+'×'};
$('rCam').onclick=()=>{repFollow=(repFollow+1)%8;toast('Siguiendo: '+NM[repFollow])};
$('rH').onclick=()=>{camHt=camHt===1000?800:camHt===800?1300:1000};
$('rSeek').oninput=e=>{repSeek=true;repT=e.target.value/1000*(rec.length-1)/30;repPlay=false;$('rPlay').textContent='▶'};
$('rSeek').onchange=()=>{repSeek=false};
$('rX').onclick=repEnd;
$('fsb').onclick=()=>{try{const e=document.documentElement;(e.requestFullscreen||e.webkitRequestFullscreen).call(e);if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(e){}};
$('pv2').addEventListener('pointerdown',e=>{gDrag=true;gX=e.clientX});addEventListener('pointermove',e=>{if(gDrag){gY=Math.max(-7,Math.min(19,gY+(e.clientX-gX)/14));gX=e.clientX}});addEventListener('pointerup',()=>{if(gDrag){gDrag=false;gT=Date.now()+2500}});
let rstT=0;$('rst').onclick=()=>{if(Date.now()<rstT){try{Object.keys(localStorage).filter(k=>k.startsWith('tc_')).forEach(k=>localStorage.removeItem(k))}catch(e){}P=loadSave();champ=P.champ;dif=P.set.dif;lapSel=6;setQ(P.set.q);applyVol();$('rst').textContent='Reiniciar progreso';ui()}else{rstT=Date.now()+4000;$('rst').textContent='¿Seguro? Toca otra vez';setTimeout(()=>{$('rst').textContent='Reiniciar progreso'},4000)}};
