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
            <h2>品牌列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建品牌</button>
              </div>

              <form @submit="search($event)">
                <input type="search" v-model="keyword" placeholder="搜标题/描述" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
              <form @submit="search_by_username($event)"></form>
            </div>

            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>品牌名</label>
                <input v-validator="'required|max_length:64'" type="text" v-model="current.name">
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
                <th>品牌名</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr v-for="row in list">
                  <td>{{row.name}}</td>
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
        model      : 'brand',
        searchable : [ 'name' ],
      };
    },

    methods : {},

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