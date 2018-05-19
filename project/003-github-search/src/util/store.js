/**往冰箱存 */
function set(key,val) {
  /**加保鲜膜（JSON)化 */
  var json = JSON.stringify(val);
  /**存冰箱 */
  localStorage.setItem(key,json);
}

/**从冰箱取 */
function get(key) {
  /**从冰箱取到带保鲜膜的数据 */
  var json = localStorage.getItem(key);
  /**撕膜 （将数据转为JS可以理解的数据类型） */
  return JSON.parse(json);
}

module.exports = {
  set:set,
  get:get,
}