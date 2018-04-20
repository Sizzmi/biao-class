var mask = document.querySelector('.mask')
, modal = mask.querySelector('.modal')
, close = document.querySelector('.close')
, login = document.querySelector('.login')
;

function show() {
mask.classList.add('show');
}

function hide(){
mask.classList.remove('show');
}

login.addEventListener('click', show);
/*在爷爷辈检测点击事件（这意味着哪怕是孙子引发的点击事件也会传递上来，因为默认冒泡）*/
mask.addEventListener('click', function (e) {
/*如果点击源是close或自己（也就是遮罩），那么就隐藏modal*/
if (e.target === close || e.target === mask) {
  hide();
}
});

document.addEventListener('keyup',function(e){
if (e.code !== 'Escape')
return;

hide();
})