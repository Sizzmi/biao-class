<template>
  <div>
    <Nav :push-down="true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
          <div class="content card">
            <h2>预约列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建预约</button>
              </div>

              <!--<form @submit="search($event)">-->
                <!--<input type="search" v-model="keyword" placeholder="搜标题/描述" autofocus>-->
                <!--<button type="submit" hidden>搜</button>-->
              <!--</form>-->
              <form @submit="search_by_username($event)"></form>
            </div>
            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>用户</label>
                <Dropdown api="user.username,realname"
                          displayKey="username"
                          :onSelect="set_user_id"/>
              </div>
              <div class="input-control">
                <label>二手车</label>
                <Dropdown api="vehicle.title,description"
                          displayKey="title"
                          :onSelect="set_vehicle_id"/>
              </div>
              <div class="input-control">
                <label>预约时间</label>
                <input type="date" v-model="current.appointed_at">
              </div>
              <div class="input-control">
                <label>备注</label>
                <textarea v-model="current.remark"></textarea>
              </div>
              <div class="input-control">
                <div class="btn-group">
                  <button class="btn-primary" type="submit">提交</button>
                  <button @click="show_form=false" type="button">取消</button>
                </div>
              </div>
            </form>
            <div class="table">
              <table>
                <thead>
                <th>二手车</th>
                <th>预约人</th>
                <th>预约时间</th>
                <th>备注</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr v-for="row in list">
                  <td>{{row.$vehicle ? row.$vehicle.title : '-'}}</td>
                  <td>{{row.$user ? row.$user.username : '-'}}</td>
                  <td>{{row.appointed_at}}</td>
                  <td>{{row.remark}}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn-small" @click="set_current(row)">编辑</button>
                      <button class="btn-small" @click="remove(row.id)">删除</button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <Pagination :totalCount="total" :limit="limit" :onChange="on_page_change"/>
          </div>
        </div>
      </div>
    </div>
    <AdminFooter/>
  </div>
</template>

<script>
  import '../../css/admin.css';
  import AdminPage from '../../mixin/AdminPage';

  export default {
    data () {
      return {
        model      : 'appo',
        searchable : [ 'remark' ],
        with       : [
          { type : 'has_one', model : 'user' },
          { type : 'has_one', model : 'vehicle' },
        ],
      };
    },

    methods : {
      set_user_id (row) {
        this.$set(this.current, 'user_id', row.id);
      },
      set_vehicle_id (row) {
        this.$set(this.current, 'vehicle_id', row.id);
      },
    },

    mixins : [ AdminPage ],
  };
</script>

<style scoped>
  h2 {
    margin-top: 0;
    font-size: 16px;
  }

  .table {
    overflow: auto;
  }

  th, td {
    padding: 5px 10px;
    text-align: left;
  }

</style>
