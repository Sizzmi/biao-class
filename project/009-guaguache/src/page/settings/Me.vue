<template>
  <div>
    <Nav :push-down="true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <SettingNav/>
        </div>
        <div class="col-lg-9">
          <div class="content card">
            <div class="row">
              <div class="col-lg-2 left">
                <h1>基础信息</h1>
              </div>
              <div class="col-lg-10 tool-bar right">
                <button @click="edit_mode=true">修改</button>
              </div>
            </div>

            <form v-if="edit_mode" class="col-lg-6">
              <div class="input-control">
                <label>昵称</label>
                <input type="text">
              </div>
              <div class="input-control">
                <label>真实姓名</label>
                <input type="text">
              </div>
              <div class="input-control">
                <button class="btn-primary" type="submit">提交</button>
                <button @click="edit_mode=false" type="button">取消</button>
              </div>
            </form>
            <div v-else>
              <div class="row prop-item">
                <div class="col-lg-3 key">昵称</div>
                <div class="col-lg-9 value">yo</div>
              </div>
              <div class="row prop-item">
                <div class="col-lg-3 key">真实姓名</div>
                <div class="col-lg-9 value">王花花</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis, sed! A culpa enim eveniet explicabo
          omnis quibusdam ullam vel. Animi aspernatur cupiditate incidunt nostrum quae, quidem totam. Labore, sequi!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../css/admin.css';

  import SettingNav from '../../component/SettingNav.vue';
  import Nav        from '../../component/Nav.vue';

  export default {
    components : { SettingNav, Nav },
    data () {
      return {
        edit_mode : false,
      };
    },
  };
</script>

<style scoped>
  .prop-item {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .prop-item .key {
    opacity: .6;
  }
</style>
