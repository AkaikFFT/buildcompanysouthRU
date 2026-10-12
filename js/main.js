/* Интерфейс: затемнение фона при прокрутке, мобильное меню, форма заявки */
(function(){
var veil=document.getElementById('veil'),nav=document.getElementById('nav'),
burger=document.getElementById('burger'),menu=document.getElementById('menu'),tick=false;

function onScroll(){
if(tick)return;tick=true;
requestAnimationFrame(function(){
var p=Math.min(1,scrollY/(innerHeight*.9));
veil.style.opacity=(p*.55).toFixed(3);
nav.classList.toggle('solid',scrollY>20);
tick=false})}
addEventListener('scroll',onScroll,{passive:true});onScroll();

function setMenu(open){
nav.classList.toggle('open',open);
burger.setAttribute('aria-expanded',open?'true':'false');
burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')}
burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
addEventListener('resize',function(){if(innerWidth>860)setMenu(false)});

document.getElementById('send').addEventListener('click',function(){
var n=document.getElementById('n').value.trim(),p=document.getElementById('p').value.trim(),o=document.getElementById('ok');
o.style.display='block';o.style.color=(n&&p)?'':'#ff8a7a';
o.textContent=(n&&p)?'Заявка отправлена. Мы свяжемся с вами в ближайшее время.':'Укажите имя и телефон, чтобы мы могли перезвонить.'});
})();
