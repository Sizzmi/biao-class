<template>
  <form @submit="search($event);submit($event)" class="search-bar">
    <input placeholder="现代领动"
           type="search"
           @keyup="change()"
           v-model="kwd"
           autofocus>
    <button type="submit">搜</button>
  </form>
</template>

<script>
  export default {
    props : [ 'onChange', 'onSubmit', 'keyword' ],

    data () {
      return {
        kwd : '',
      };
    },

    methods : {
      change () {
        if (this.onChange)
          this.onChange(this.kwd);
      },
      submit (e) {
        e.preventDefault();

        if (this.onSubmit)
          this.onSubmit(this.kwd);
      },
      search (e) {
        e.preventDefault();
        this.$router.push({
          path  : '/search',
          query : { keyword : this.kwd },
        });
      },
    },
    watch   : {
      keyword (n) {
        this.kwd = n;
      },
    },
  };
</script>

<style scoped>
  .search-bar {
    min-width: 150px;
    display: inline-block;
    /*margin-top: 10px;*/
    /*margin-bottom: 10px;*/
  }

  .search-bar input {
    width: 80%;
    outline: 0;
  }

  .search-bar [type="submit"] {
    width: 20%;
    border-left: 0;
  }
</style>
