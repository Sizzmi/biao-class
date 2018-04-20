// 以下顶部导航栏
var menu_trigger = document.querySelector('#menu-trigger')
  , menu_content = document.querySelector('#menu-content')
  ;
function visible() {
  return menu_content.classList.contains('show');
}

function show() {
  menu_content.classList.add('show');
}

function hide() {
  menu_content.classList.remove('show');
}

menu_trigger.addEventListener('click', function () {
  visible() ? hide() : show();
});

document.addEventListener('click', function (e) {
  var el = e.target;
  var menu = el.closest('#menu-content');
  if (!menu && el !== menu_trigger)
    hide();
});
//以下是左侧栏
var menu_trigger_l = document.querySelector('#menu-trigger-l')
  , menu_content_l = document.querySelector('#menu-content-l')
  , menu_close_l = document.querySelector('#menu-close-l')
  ;

menu_trigger_l.addEventListener('click', function () {
  menu_content_l.hidden = !menu_content_l.hidden;
});

menu_close_l.addEventListener('click', function () {
  menu_content_l.hidden = true;
});
// 以下是下拉菜单
var menu_trigger_dropdown = document.querySelector('#menu-trigger-dropdown'),
  menu_content_dropdown = document.querySelector('#menu-content-dropdown');

menu_trigger_dropdown.addEventListener('click', function (e) {
  e.preventDefault();
  menu_trigger_dropdown.focus();
  if (is_visible()) {
    hide_down();
  } else {
    show_down();
  }
});

menu_trigger_dropdown.addEventListener('blur', function () {
  hide_down();
})

function show_down() {
  menu_content_dropdown.style.display = 'inline-block';
}

function hide_down() {
  menu_content_dropdown.style.display = 'none';
}

function is_visible() {
  return menu_content_dropdown.style.display == "inline-block";
}

//以下是弹框

