var name = 'whh';
var age = 1;

function get_name() {
  return name;
}

function set_name(val) {
  return name = val;
}

function get_age() {
  return age;
}

function set_age(val) {
  return age = val;
}

module.exports = {
  get_name: get_name,
  set_name: set_name,
  get_age: get_age,
  set_age: set_age,
}