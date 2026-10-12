/* Анимированный фон: стройплощадка на canvas */
(function(){
var c=document.getElementById('scene'),x=c.getContext('2d'),W,H,D,gy,S,sky,stars=[],sky2=[],t0=performance.now();
function rnd(a){a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
function resize(){W=innerWidth;H=innerHeight;D=Math.min(devicePixelRatio||1,W<700?1.5:2);c.width=W*D;c.height=H*D;x.setTransform(D,0,0,D,0,0);
gy=H*.88;S=Math.max(.5,Math.min(1.25,H/800,W/620));
sky=x.createLinearGradient(0,0,0,gy);sky.addColorStop(0,'#0b1220');sky.addColorStop(.45,'#26356a');sky.addColorStop(.8,'#a7566b');sky.addColorStop(1,'#f0944f');
stars=[];for(var i=0;i<70;i++)stars.push([rnd(i)*W,rnd(i+99)*gy*.5,rnd(i+7)*1.4+.3,rnd(i+3)*6]);
sky2=[];var px=-20,i2=0;while(px<W+60){var w=40+rnd(i2)*70,h=60+rnd(i2+50)*190*S;sky2.push([px,w,h,i2]);px+=w+4+rnd(i2+9)*10;i2++}}
function cloud(cx,cy,s,a){x.fillStyle='rgba(255,190,160,'+a+')';x.beginPath();x.ellipse(cx,cy,60*s,14*s,0,0,7);x.ellipse(cx+30*s,cy-10*s,40*s,14*s,0,0,7);x.ellipse(cx-34*s,cy-6*s,34*s,11*s,0,0,7);x.fill()}
function crane(cx,top,front,hookK,col,s,ph,t){
x.strokeStyle=col;x.fillStyle=col;x.lineWidth=Math.max(1,1.6*s);
var mw=10*s;x.fillRect(cx-mw/2,top,2*s,gy-top);x.fillRect(cx+mw/2-2*s,top,2*s,gy-top);
x.beginPath();var st=mw*1.5,zz=0;for(var y=gy;y>top;y-=st){x.moveTo(cx-mw/2,y);x.lineTo(cx+mw/2,Math.max(top,y-st));x.moveTo(cx+mw/2,y);x.lineTo(cx-mw/2,Math.max(top,y-st))}x.stroke();
var jy=top;x.fillRect(cx-front*.28-2,jy-2*s,front*.28+Math.abs(front)+4,4*s);
x.beginPath();x.moveTo(cx-mw/2,jy);x.lineTo(cx,jy-24*s);x.lineTo(cx+mw/2,jy);x.stroke();
x.beginPath();x.moveTo(cx,jy-24*s);x.lineTo(cx+front,jy);x.moveTo(cx,jy-24*s);x.lineTo(cx-front*.28,jy);x.stroke();
x.fillRect(cx-front*.28-14*s,jy,18*s,12*s);
var hx=cx+front*.78,hy=jy+14*s+hookK*(gy-jy)*.5;
x.lineWidth=Math.max(1,s);x.beginPath();x.moveTo(hx,jy+2*s);x.lineTo(hx,hy);x.stroke();
x.fillRect(hx-4*s,jy,8*s,5*s);x.fillRect(hx-3*s,hy,6*s,6*s);
x.fillStyle='#ffc60a';x.fillRect(hx-20*s,hy+6*s,40*s,6*s);x.fillStyle=col;
if(Math.sin(t*.004+ph)>0){x.fillStyle='#ff4d3a';x.beginPath();x.arc(cx,jy-26*s,3*s,0,7);x.fill()}}
function frame(now){
var t=now-t0,i,s=S;
x.fillStyle=sky;x.fillRect(0,0,W,H);
for(i=0;i<stars.length;i++){var q=stars[i];x.fillStyle='rgba(255,255,255,'+(.35+.35*Math.sin(t*.002+q[3]))+')';x.fillRect(q[0],q[1],q[2],q[2])}
var sg=x.createRadialGradient(W*.28,gy,0,W*.28,gy,W*.5);sg.addColorStop(0,'rgba(255,170,90,.55)');sg.addColorStop(1,'rgba(255,170,90,0)');x.fillStyle=sg;x.fillRect(0,0,W,H);
cloud((t*.012)%(W+300)-150,gy*.38,1.4*s,.16);cloud((t*.008+W*.5)%(W+300)-150,gy*.55,1*s,.2);cloud((t*.005+W*.8)%(W+300)-150,gy*.24,1.8*s,.1);
for(i=0;i<sky2.length;i++){var b=sky2[i];x.fillStyle='#1a2447';x.fillRect(b[0],gy-b[2],b[1],b[2]);
if(rnd(b[3]+1)>.4){x.fillStyle='rgba(255,210,120,'+(.25+.25*Math.sin(t*.001+b[3]))+')';for(var wy=gy-b[2]+10;wy<gy-14;wy+=22)for(var wx=b[0]+8;wx<b[0]+b[1]-8;wx+=16)if(rnd(wx*3+wy)>.6)x.fillRect(wx,wy,5,8)}}
var far=Math.sin(t*.00028+1),farK=.3+.35*(.5+.5*Math.sin(t*.0006+1));
crane(W*(W<700?.9:.93),gy-330*s,150*s*far,farK,'#141c38',.7*s,1,t);
var fw=Math.min(240*s,W*(W<700?.34:.3)),bx=W<700?W*.4:W*.6,fh=36*s,per=26000,pr=(t%per)/per,fl=Math.min(9,pr*10.5),n=Math.floor(fl),fr=fl-n,al=pr>.95?(1-pr)/.05:1;
x.globalAlpha=al;
for(i=0;i<=Math.min(n,8);i++){var h=i<n?fh:fh*fr;if(i>=9)break;var fy=gy-(i+1)*fh;if(i==n)fy=gy-i*fh-h;
x.fillStyle='#232f55';x.fillRect(bx,fy,fw,h);x.fillStyle='#3c4b7c';x.fillRect(bx-6*s,fy,fw+12*s,Math.min(5*s,h));
if(i<n){for(var k=0;k<5;k++){x.fillStyle='#46568a';x.fillRect(bx+k*(fw-6)/4,fy,6,h)}
if(i<n-1&&i<7){for(k=0;k<4;k++){if(rnd(i*7+k)>.35){x.fillStyle='rgba(255,205,110,.85)';x.fillRect(bx+10+k*(fw-6)/4,fy+10*s,(fw-6)/4-14,h-18*s)}}}}}
var th=gy-fl*fh,sc=Math.min(n+1,9)*fh;
x.strokeStyle='rgba(255,198,10,.55)';x.lineWidth=1.2;x.beginPath();x.rect(bx-14*s,gy-sc-10*s,6*s,sc+10*s);
for(var yy=gy;yy>gy-sc;yy-=fh/2){x.moveTo(bx-14*s,yy);x.lineTo(bx-8*s,yy-fh/2)}
x.moveTo(bx-14*s,gy-sc-6*s);x.lineTo(bx+fw*.2,gy-sc-6*s);x.stroke();
x.globalAlpha=1;
var ck=Math.sin(t*.0004),mx=bx+fw+34*s,mt=Math.max(gy-460*s,th-170*s),jl=300*s;
var hk=.25+.4*(.5+.5*Math.sin(t*.0008));
crane(mx,mt,jl*ck,hk,'#0d1327',s,0,t);
x.fillStyle='#070b18';x.fillRect(0,gy,W,H-gy);x.fillStyle='#ffc60a';
for(i=0;i<W/60+2;i++)x.fillRect(i*60-((t*.03)%60),gy+16*s,30,3);
var tx=((t*.09)%(W+400))-200;x.fillStyle='#ffc60a';x.fillRect(tx,gy-26*s,70*s,22*s);x.fillStyle='#e8a800';x.fillRect(tx+70*s,gy-18*s,26*s,14*s);
x.fillStyle='#1d2a4d';x.fillRect(tx+74*s,gy-16*s,12*s,7*s);x.fillStyle='#000';[10,50,84].forEach(function(o){x.beginPath();x.arc(tx+o*s,gy-3*s,6*s,0,7);x.fill()});
var ex=W*.12,ea=Math.sin(t*.0012);x.fillStyle='#ffc60a';x.fillRect(ex,gy-20*s,56*s,16*s);x.fillRect(ex+8*s,gy-34*s,26*s,16*s);
x.strokeStyle='#ffc60a';x.lineWidth=5*s;x.beginPath();x.moveTo(ex+34*s,gy-28*s);var ax=ex+34*s+(60+20*ea)*s,ay=gy-70*s-12*s*ea;x.lineTo(ax,ay);x.lineTo(ax+22*s,gy-4*s-14*s*(.5+.5*ea));x.stroke();
x.fillStyle='#1a1d28';x.fillRect(ex-4*s,gy-8*s,64*s,9*s);
raf=run?requestAnimationFrame(frame):0}
function still(){if(!run)frame(t0+14000)}
var rm=matchMedia('(prefers-reduced-motion: reduce)'),run=!rm.matches,raf=0,lw=innerWidth,lh=innerHeight;
resize();
if(run)raf=requestAnimationFrame(frame);else still();
/* на телефонах адресная строка меняет высоту при прокрутке: такие события игнорируем */
addEventListener('resize',function(){
if(innerWidth===lw&&Math.abs(innerHeight-lh)<160)return;
lw=innerWidth;lh=innerHeight;resize();still()});
/* не тратим батарею, пока вкладка скрыта */
document.addEventListener('visibilitychange',function(){
if(document.hidden){cancelAnimationFrame(raf);raf=0}
else if(run&&!raf)raf=requestAnimationFrame(frame)});
})();
