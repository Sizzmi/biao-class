class Base {
  constructor(max_id, list) {
    this.max_id = max_id || 1;
    this.list = list;
  }

  yo() {
    console.log();
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
