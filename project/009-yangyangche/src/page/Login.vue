<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container por">
        <form class="main-form" autocomplete="off">
          <h1>登录</h1>
          <div class="error-list">
            <div class="error">用户名或密码有误</div>
          </div>
          <div class="input-control">
            <!--<label for="username">用户名</label>-->
            <input v-validator="'required'" id="username" type="text" placeholder="用户名">
          </div>
          <div class="input-control">
            <!--<label for="password">密码</label>-->
            <input id="password" type="password" placeholder="密码">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">登录</button>
          </div>
          <div class="input-control small muted">
            没有账号？<a href="#/signup">注册</a>
          </div>
        </form>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis, sed! A culpa enim eveniet explicabo
        omnis quibusdam ullam vel. Animi aspernatur cupiditate incidunt nostrum quae, quidem totam. Labore, sequi!
      </div>
    </div>
  </div>
</template>

<script>
  import '../css/auth.css';

  import Nav from '../component/Nav.vue';
  // import validator from '../directive/validator';
  // import red       from '../directive/red';

  export default {
    // directives : { validator },
    components : { Nav },
  };
</script>

<style scoped>
  .header {
    height: 400px;
    background-image: url(../assets/login/1200x400.png);
    background-repeat: no-repeat;
    -webkit-background-size: contain;background-size: contain;
  }

  .main-form {
    position: absolute;
    top: 60px;
    right: 10px;
    width: 240px;
  }
</style>



