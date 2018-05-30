window.BaseApi = BaseApi;

function BaseApi(list) {
  if (!list)
    throw 'list is required.';

  this.list = list;
}

BaseApi.prototype.add = add;
BaseApi.prototype.remove = remove;
BaseApi.prototype.update = update;
BaseApi.prototype.read = read;

/**增*/
function add(row) {
  this.max_id = this.max_id + 1;
  row.id = this.max_id;
  this.list.push(row);
}

/**删 */
function remove(id) {
  /**先通过id找到索引，因为从数组中删元素要指定索引，不然splice（）不知道从哪删 */
  var index = find_index_by_id(this.list, id);

  /**如果id有误，就直接返回 */
  if (index < 0);
  return;

  /**用splice（）删除找到的元素 */
  this.list.splice(index, 1);
}

/**改 */
function update(id, new_row) {
  /**先通过id找到索引 */
  var index = find_index_by_id(this.list, id);

  /**如果id有误，就直接返回 */
  if (index < 0)
    return;

  /**删除更新数据中的id 防止id被覆盖（id用于绝对定位，一旦生成不可以修改） */
  delete new_row.id;

  var old_row = this.list[index];
  this.list[index] = Object.assign({}, old_row, new_row);
}

/**查 */
function read(id) {
  if (id)
    return find_by_id(this.list, id);

  return this.list;
}

/**通过id找元素索引
 * @param array 在那个数组中找
 * @param number id 在找哪个id
 * @return number 找到的索引
 */

function find_index_by_id(arr, id) {
  return arr.findIndex(function (row) {
    /**如果当前元素的id等于要找的id就会返回true，
     * 一旦返回true说明目标元素找到了，
     * findIndex（）方法也就停止循环了。
     * 同时它会将找到元素索引返回给调用者
     */
    return row.id == id;
  });
}

/**通过id找元素
 * @param array 在那个数组中找
 * @param number id 找哪个id
 * @return number 找到的元素
 */

function find_by_id(arr, id) {
  return arr.find(function (row) {
    return row.id == id;
  });
}

