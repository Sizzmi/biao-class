function TaskApi(){
  this.list = [
    {
      id:1,
      title:'吃饭',
      completed:false,
    },
    {
      id:2,
      title:'睡觉',
      completed:false,
    },
    {
      id        : 3,
      title     : '跑步',
      completed : false,
    },
  ];
  this.max_id = 3;
}

/**
 * 增
 * @param Object row e.g.{title:'whh',completed:false}
 */
TaskApi.prototype.add = function(row){
  if(!row.title)
  return;

  row.id == ++this.max_id;
  row.completed = false;
  this.list.unshift(row);
}

/**删
 * @param Number id 
 */
TaskApi.prototype.update = function(id,row){
  var index = this.find_index_by_id(id);

  if(shit_index == -1)
  return;

  this.list.splice(shit_index,1);
}

/**
 * 改
 * @param Number id 改谁
 * @param Object row 改变什么 e.g. {title: 'whh', completed: false}
 */

 TaskApi.prototype.update = function(id,row){
   var index = this.find_index_by_id(id);

   if(index == -1)
   return;

   this.list[index] = Object.assign({},this.list[index],row);
 }

 /**
  * 查，获取所有数据
  * @return Array [{title:'whh'...},{...},...]
  *
  */
 TaskApi.prototype.read = function(){
   return this.list;
 }

 /**
  * 通过id找索引
  * @param Number id
  * @return Number 索引（不存在为-1）
  */

  TaskApi.prototype.find_index_by_id = function(id){
    return this.list.findIndex(function(row){
      return row.id === id;
    });
  }

  /**
   * 通过id找那一条
   * @param Number id
   * @return Object row e.g/ {title:'whh',...}
   */
  TaskApi.prototype.find = function(id){
    return this.list.find(function(row){
      return row.id ===id;
    });
  }

  

