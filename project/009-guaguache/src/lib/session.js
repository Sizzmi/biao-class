export default {
  uinfo () {
    return JSON.parse(localStorage.getItem('uinfo')) || {};
  },

  login (row) {
    localStorage.setItem('uinfo', JSON.stringify(row));
  },

  logout (url) {
    localStorage.removeItem('uinfo');
    location.href = url || '/';
  },

  is_admin () {
    let info = this.uinfo();
    return info && this.uinfo().is_admin;
  },

  logged_in () {
    return !!this.his_id();
  },

  his_id () {
    let info = this.uinfo();
    return info && this.uinfo().id;
  },
};
