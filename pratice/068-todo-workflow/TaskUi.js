function TaskUi(){
  this.form = document.getElementById('task-form');
  this.list = document.getElementById('task-list');
  this.input = document.getElementById('[name=title]');
  this._api = new TaskApi();
}

TaskApi.prototype.init = function(){
  this.render();
  this.detect_add();
}

TaskApi.prototype.detect_add = function(){
  var me = this;
  this.form.addEventListener('submit',function(e){
    e.preventDefault();
    var row = {
      id:document.querySelector('[name=id]').value,
      title:document.querySelector('[name=title]').value,
    };

    var id =parseInt(row.id);

    if(id)
    me._api.update(id,row);
    else
    me._api.add(row);

    me.render();
  });
}

TaskApi.prototype.render = function(){
  var list = this.list
  ,me = this;
  list.innerHTML = '';

  this._api.read().forEach(function(row){
    var el =document.createElement('div');
    el.innerHTML =  `
    <input type = "checkbox">
    <span>${row.title}</span>
    <button class="update">更新</button>
    <button class="delete">删除</button>
    `;
    list.appendChild(el);

    el
    .querySelector('.delete')
    .addEventListener('click',function(){
      me._api.remove(row.id);
      el.remove();
    });

    el
    .querySelector('.update')
    .addEventListener('click',function(){
      document.querySelector('[name=id]').value = row.id;
      document.querySelector('[name=title]').value = row.title;
    });
  });
}