window.TaskApi = TaskApi;

function TaskApi () {
  this._model_name = 'task';

  /*继承显性属性（也就是原型prototype）*/
  BaseApi.call(this);
  this.load_data();
}

/*继承隐性属性（也就是原型prototype）*/
TaskApi.prototype             = Object.create(BaseApi.prototype);
TaskApi.prototype.constructor = TaskApi;

TaskApi.prototype.add           = add;
TaskApi.prototype.remove        = remove;
TaskApi.prototype.update        = update;
TaskApi.prototype.read          = read;
TaskApi.prototype.read_by_cat   = read_by_cat;
TaskApi.prototype.remove_by_cat = remove_by_cat;
TaskApi.prototype.set_completed = set_completed;


function add (row) {
  if (!row.title)
    return;

  if (!row.cat_id)
    row.cat_id = 1;

  row.cat_id = parseInt(row.cat_id);

  return this.$add(row);
}

function remove (id) {
  return this.$remove(id);
}

function update (id, new_row) {
  return this.$update(id, new_row);
}

function set_completed (id, completed) {
  var row = this.$find(id);
  if (!row)
    return false;

  row.completed = completed;
  this.sync_to();
}

function read () {
  return this.$read();
}

function read_by_cat (cat_id) {
  return this.read().filter(function (row) {
    return row.cat_id == cat_id;
  });
}

function remove_by_cat (cat_id) {
  this.list = this.list.filter(function (row) {
    return row.cat_id != cat_id;
  });
  this.sync_to();
}