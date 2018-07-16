<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container por">
        <form @submit="submit" class="main-form" autocomplete="off">
          <h1>注册</h1>
          <!--<div class="error-list">-->
          <!--<div class="error">用户名或密码有误</div>-->
          <!--</div>-->
          <div class="input-control">
            <label for="phone">手机号</label>
            <input v-validator="'cellphone'"
                   v-model="current.phone"
                   error-el="#phone-error"
                   id="phone"
                   type="text"
                   placeholder="whh">
            <div class="error-list">
              <div id="phone-error"></div>
            </div>
          </div>
          <div class="input-control">
            <label for="vcode">验证码</label>
            <div class="btn-group">
              <input style="width: 70%;"
                     id="vcode"
                     v-model="current.vcode"
                     type="text"
                     placeholder="whh">
              <button @click="send_sms" style="width: 30%;" type="button" :disabled="sms.countdown != 0">
                <span v-if="sms.countdown">{{sms.countdown}}</span>
                <span v-else>发送验证码</span>
              </button>
            </div>
            <div class="error-list">
              <div v-if="invalid_code" id="vcode-error">验证码有误</div>
            </div>
          </div>
          <div class="input-control">
            <label for="password">密码</label>
            <input v-validator="'required|min_length:6|max_length:64'"
                   v-model="current.password"
                   error-el="#password-error"
                   id="password"
                   type="password">
            <div class="error-list">
              <div id="password-error"></div>
            </div>
          </div>
          <div class="input-control">
            <label for="password2">重复密码</label>
            <input v-model="current.password2"
                   id="password2"
                   type="password">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">注册</button>
          </div>
          <div class="input-control small muted">
            已有账号？<a href="#/login">登录</a>
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
  import api from '../lib/api';

  export default {
    // directives : { validator },
    data () {
      return {
        sms          : {
          timer     : null,
          countdown : 0,
        },
        current      : {},
        code         : '',
        invalid_code : false,
      };
    },
    components : { Nav },

    methods : {
      submit (e) {
        e.preventDefault();
        this.invalid_code = this.current.vcode !== this.code;

        if (this.invalid_code)
          return;
      },
      send_sms () {
        if (!this.current.phone || this.sms.countdown)
          return;

        this.sms.countdown = 60;

        this.sms.timer = setInterval(() => {
          if (this.sms.countdown == 0)
            clearInterval(this.sms.timer);

          this.$set(this.sms, 'countdown', this.sms.countdown - 1);
        }, 1000);

        api('captcha/sms', { phone : this.current.phone })
          .then(r => {
            this.code = atob(r.data.result);
          });
      },
    },
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