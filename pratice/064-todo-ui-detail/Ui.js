window.Ui = Ui;

function Ui(form_selector,list_selector,input_selector){
  this.form = document.querySelector(form_selector);
  this.input = document.querySelector(input_selector);
  this.list = document.querySelector(list_selector);
  /**私有，不应该直接调用 */
  this._api = new Api();
}

Ui.prototype.get_form_data = get_form_data;
Ui.prototype.set_form_data = set_form_data;
Ui.prototype.render = render;
Ui.prototype.init = init;
Ui.prototype.datect_add = detect_add;
Ui.prototype.detect_click_list = detect_click_list;
Ui.prototype.remove = remove;

function init(){
  this.render();
  this.detect_add();
  this.detect_click_list();
}
/*监听添加事件（表单提交事件）*/
function detect_add() {
  var me = this;
  this.form.addEventListener('submit',function(e){
    e.preventDefault();
    /**更新数据 */
    me._api.add({
      title:me.input.value,
      completed:false,
    });
    /**更新界面 */
    me.render();
    /**清空输入框 */
    me.input.value = '';
  });
}

function detect_click_list() {
  var me = this;
  this.list.addEventListener('click',function(e){
    var target = e.target
    ,is_remove_btn = target.classList.contains('remove');

    if(is_remove_btn){
      /**找到按钮所在的.todo-item,因为.todo-item上有当前任务的id */
      var todo_item = target.closest('todo-item')
      ,id = todo_item.dataset.id;
        me.remove(id);
    
    }
  });
}

/*渲染任务列表*/
function render() {
  /**先通过api拿到所有数据 */
  var todo_list = this._api.read();
  var me = this;

  /**清空上次渲染的数据 */
  this.list.innerHTML = '';

  /**遍历所有的任务数据，生成每一条html元素，并插入到任务列表中 */
  todo_list.forEach(function(item){
    var el =document.createElement('div');

    el.innerHTML = `
    <div class="row todo-item">
    <div class="col checkbox">
      <input type="checkbox">
    </div>
    <div class="col detail">
      <div class="title">${item.title}</div>
    </div>
    <div class="col tool-set">
      <button>更新</button>
      <button>删除</button>
    </div>
  </div>
    `;

    me.list.appendChild(el);
  });
}

function get_form_data(form_selector) {
  var data = {};
  var form = document.querySelector(form_selector);
  var list = form.querySelectorAll('[name]');

  list.forEach(function (input) {
    switch (input.nodeName) {

      case 'INPUT':
        switch (input.type) {
          case 'text':
          case 'search':
          case 'number':
          case 'password':
          case 'hidden':
            /*如果是字符类数据，使用用户输入的值*/
            data[input.name] = input.value;
            break;
          case 'radio':
          case 'checkbox':
            /*如果是打钩类数据，使用打钩的状态（打|没打）*/
            data[input.name] = input.checked;
            break;
        }
        // console.log(input);
        break;
      case 'TEXTAREA':
        data[input.name] = input.value;
        break;
    }
  });

  return data;
}

function set_form_data(form_selector, data) {
  /*选中要插入数据的表单*/
  var form = document.querySelector(form_selector);

  /*遍历数据对象*/
  for (var key in data) {
    /*缓存当前属性的值*/
    var value = data[key];
    /*找到当前属性在表单中对应的input*/
    var input = form.querySelector(`[name=${key}]`);

    if (!input)
      continue;

    /*获取当前属性的数据类型*/
    var data_type = typeof value;

    switch (data_type) {
      /*如果是字符串或者数字，就默认其为input[type=number|text|url|...]*/
      case 'string':
      case 'number':
        input.value = value;
        break;
      /*如果是布尔值，就默认其为input[type=radio|checkbox]*/
      case 'boolean':
        input.checked = value;
        break;
    }
  }
}

