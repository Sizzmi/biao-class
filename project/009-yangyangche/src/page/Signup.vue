<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <form class="main-form">
          <h1>注册</h1>
          <div class="error-list">
            <div class="error">用户名或者密码有误</div>
          </div>
          <div class="input-control">
            <label for="username">用户名</label>
            <input id="username" type="text" placeholder="请输入">
          </div>
          <div class="input-control">
            <label for="password">密码</label>
            <input id="password" type="password">
          </div>
          <div class="input-control">
            <label for="password2">重复密码</label>
            <input id="password2" type="password">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">登录</button>
          </div>
          <div class="input-control small muted">
            没有账号？
            <a href="#/signup.vue">注册</a>
          </div>
        </form>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis, sed! A culpa enim eveniet explicabo omnis quibusdam ullam vel. Animi aspernatur cupiditate incidunt nostrum quae, quidem totam. Labore, sequi!
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/auth.css";
import Nav from "../components/Nav.vue";

export default {
  components: { Nav }
};
</script>

<style scoped>
.main-form {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.footer {
  margin-top: 20px;
}
</style>


