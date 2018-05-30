class Base {
  constructor(max_id, list) {//当这个类实例化的一瞬间就执行
    this.max_id = max_id || 1;
    this.list = list;
  }

  yo() {
    console.log("yo!");
  }
  $add() {
    console.log('base add')
  }

  $remove() {
    console.log('base remove')
  }

  $update() {
    console.log('base update')
  }

  $read() {
    console.log('base read')
  }
}
