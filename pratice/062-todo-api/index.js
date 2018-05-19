var max_id = 101;
var todo_list = [
  {//0
    id: 100,
    name: '买车',
    remind_at:"2020..",
    completed: false,
  },
  {//1
    id: 101,
    name: '洗车',
    remind_at: '2018-5-19 20:00:00',
    completed: false,
  }
];

/**增 */
function add(row) {
  max_id = max_id + 1;
  row.id
  todo_list.push(row);
}

/**删 */
function remove(id) {
  /**先通过id找到索引，因为从数组中删元素要指定索引，不然 */
  var index = find_index_by_id(todo_list, id);

  /**如果id有误，就直接返回 */
  if (index < 0)
    return;
/**用splice()删除找到的元素 */
  todo_list.splice(index, 1);
}


/**改 */
function update(id,new_row) {
/**先通过id 找到索引*/

var index = find_index_by_id(todo_list,id);

/**如果id有误。就直接返回 */
if(index < 0)
return;

var old_row = todo_list[index];
todo_list[index] = Object.assign({},old_row,new_row);
}


/**查 */
function read(id) {
  if (id)
    return find_by_id(todo_list, id);

  return todo_list;
}

/**通过id找索引 
 * @param array 在那个数字中找
 * @param number id 找哪个id
 * @return number 找到的索引
 * 
 *
 * */
function find_index_by_id(arr, id) {
  return arr.findIndex(function (row) {
    /**如果当前元素的id等于要找的id就会返回true，
     * 一旦返回true说明目标元素找到了，
     * findIndex()方法也就停止循环了，
     * 同事它会将找到的元素索引返回给调用者
     */
    return row.id == id;
  });
}

/*通过id找元素
 * @param array 在那个数组中找
 * @param number id 找哪个id
 * @return number 找到的元素
 * */
function find_by_id(arr, id) {
  return arr.find(function (row) {
    return row.id === id;
  });
}