var list = []
  , el
  , on_click
  , output = {
    init: init,
    add: add,
    remove: remove,
    clear: clear,
  }
  ;

function init(config) {

  /*找到用户指定的历史记录根元素*/
  el = document.querySelector(config.el);

  /*点击历史记录后要执行的函数（回调函数，执行个性化的功能）*/
  on_click = config.on_click;

  /*把冰箱里的数据取回到炒瓢*/
  sync_to_ladle();

  /*初次渲染*/
  render();
}

function render() {
  el.innerHTML = '';

  list.forEach(function (keyword) {
    var el_row = document.createElement('div');

    el_row.innerHTML = `${keyword}`

    el_row.addEventListener('click', function (e) {
      if (on_click)
        on_click(keyword, e);
    });

    el_row.classList.add('history');

    el.appendChild(el_row);
  });
}

function sync_to_ladle() {
  list = JSON.parse(localStorage.getItem('history_list')) || [];
}

function sync_to_store() {
  localStorage.setItem('history_list',JSON.stringify(list));
}

/*添加一条历史记录
* @param String keyword
**/
function add(keyword) {
  list.push(keyword);
  render();
  sync_to_store();
}

function remove(keyword) {
  var shit_index = list.indexOf(keyword);
  if (shit_index == -1)
  return;

  list.splice(shit_index,1);
  render();
  sync_to_store();
}

function clear() {
  list = [];
  render();
  sync_to_store();
}

module.exports =output;

