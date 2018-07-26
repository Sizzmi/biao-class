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
            <h2>型号列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建型号</button>
              </div>

              <form @submit="search($event)">
                <input type="search" v-model="keyword"
                       placeholder="搜标题/描述" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
              <form @submit="search_by_username($event)"></form>
            </div>

            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>型号名</label>
                <input v-validator="'required|max_length:64'" type="text" v-model="current.name">
              </div>
              <div class="input-control">
                <label>品牌</label>
                <Dropdown :default="current.brand_id"
                          :list="brand_list"
                          :onSelect="set_brand_id"/>
              </div>
              <div class="input-control">
                <label>设计</label>
                <Dropdown :default="current.design_id"
                          :list="design_list"
                          :onSelect="set_design_id"/>
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
                <th>型号名</th>
                <th>品牌</th>
                <th>设计</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr v-for="row in list">
                  <td>{{row.name}}</td>
                  <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                  <td>{{row.$design ? row.$design.name : '-'}}</td>
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
  import Dropdown  from "../../component/Dropdown";
  import api       from '../../lib/api';

  export default {
    mounted () {
      this.read_brand();
      this.read_design();
    },
    components : { Dropdown },
    data () {
      return {
        brand_list : [],
        model      : 'model',
        searchable : [ 'name' ],
        with       : [
          { model : 'brand', type : 'has_one' },
          { model : 'design', type : 'has_one' },
        ],
      };
    },

    methods : {
      read_brand () {
        api('brand/read')
          .then(r => {
            this.brand_list = r.data;
          });
      },
      read_design () {
        api('design/read')
          .then(r => {
            this.design_list = r.data;
          });
      },
      set_brand_id (row) {
        this.$set(this.current, 'brand_id', row.id);
      },
      set_design_id (row) {
        this.$set(this.current, 'design_id', row.id);
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
