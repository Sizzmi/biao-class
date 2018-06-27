<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container por">
        <form class="main-form">
          <h1>登录</h1>
            <div class="error-list">
            <div class="error">用户名或密码有误</div>
          </div>
          <div class="input-control">
            <!--<label for="username">用户名</label>-->
            <input id="username" type="text" placeholder="用户名">
          </div>
          <div class="input-control">
            <!--<label for="password">密码</label>-->
            <input id="password" type="password" placeholder="密码">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">登录</button>
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
import Nav from '../components/Nav.vue';
export default {
  components:{
    Nav,
  }
};
</script>

<style>
h1 {
  margin-top: 0;
  margin-bottom: 5px;
}

  .header {
    height: 400px;
    background-image: url(../assets/login/pexels-photo-593172.jpeg);
    background-repeat: no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .main-form {
    padding: 10px;
    background: #fff;
    position: absolute;
    top: 60px;
    right: 0;
    width: 240px;
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
    -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
    box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
  }

  .main-form input,
  .main-form button {
    width: 100%;
  }
  
  .error {
    color: red;
    background:	#FFB5C5;
  }


</style>



