var max_id = 1;
var todo_list = [
  { // 0
    id: 100,
    name: '买菜',
    remind_at: '2020...',
    completed: false,
  },
  { // 1
    id: 101,
    name: '洗菜',
    remind_at: '2020-10-01 20:20:02',
    completed: false,
  },
];

/**增 */
function add(row) {
  max_id++;
  row.id = max_id;
  todo_list.push(row);
}

add({
  id:102,
  name:'切菜',
  completed:false,
});



/**改 */
function change(id,new_row){
  list[index] = Object.assign({},old_row,new_row);
  //Object.assign(target, ...sources) 合并具有相同属性的对象, 注意目标对象自身也会改变
}

/**查 */
function read(id){
  if(id)
  return find_row_by_id(id);
  return todo_list;
}