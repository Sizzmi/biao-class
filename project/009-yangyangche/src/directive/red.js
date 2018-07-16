import Vue from 'vue';

export default Vue.directive('red', {
  bind : function (el) {
    el.addEventListener('click', () => {
      el.style.backgroundColor = 'red';
    });
  },
});
