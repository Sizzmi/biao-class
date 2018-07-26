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
            <h2>二手车列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建二手车</button>
              </div>

              <form @submit="search($event)">
                <input type="search" v-model="keyword" placeholder="搜标题/描述" autofocus>
                <button type="submit" hidden>搜</button>
              </form>

            </div>
            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>标题</label>
                <input v-validator="'required|max_length:40|min_length:3'"
                       error-el="#title-error"
                       type="text" v-model="current.title">
                <div class="error-list">
                  <div id="title-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>价格</label>
                <input
                        error-el="#price-error"
                        type="text" v-model="current.price">
                <div class="error-list">
                  <div id="price-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>卖车原因</label>
                <input v-validator="'max_length:140'"
                       error-el="#publish_reason-error" type="text" v-model="current.publish_reason">
                <div class="error-list">
                  <div id="publish_reason-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>当前里程</label>
                <input v-validator="'positive'"
                       error-el="#consumed_distance-error"
                       type="number" v-model="current.consumed_distance">
                <div class="error-list">
                  <div id="consumed_distance-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>封面地址</label>
                <div style="margin-bottom: 5px;">
                  <div v-for="(p, i) in current.preview" class="input-group-3">
                    <input type="text" placeholder="部位" v-model="p.name">
                    <input type="url" placeholder="图片地址" v-model="p.url">
                    <button @click="current.preview.splice(i, 1)" type="button">-</button>
                  </div>
                </div>
                <button @click="current.preview.push({})" type="button">+</button>
              </div>
              <div class="input-control">
                <label>过户次数</label>
                <input v-validator="'positive'"
                       error-el="#exchange_times-error"
                       type="number" v-model="current.exchange_times">
                <div class="error-list">
                  <div id="exchange_times-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>第一次上牌时间</label>
                <input type="date" v-model="current.birth_day">
              </div>
              <div class="input-control">
                <label>预期出售时间</label>
                <input type="date" v-model="current.deadline">
              </div>
              <div class="input-control">
                <label>车况</label>
                <input v-validator="'positive|max:9'"
                       error-el="#condition-error"
                       type="number" v-model="current.condition">
                <div class="error-list">
                  <div id="condition-error"></div>
                </div>
              </div>
              <div class="input-control">
                <label>描述</label>
                <textarea v-validator="'max_length:10000'"
                          v-model="current.description"></textarea>
              </div>
              <div class="input-control">
                <label>发布人</label>
                <Dropdown :api="'user.username,realname'"
                          displayKey="username"
                          :onSelect="set_publisher_id"
                />
              </div>
              <div class="input-control">
                <label>品牌</label>
                <Dropdown :list="brand_list"
                          :onSelect="set_brand_id"
                />
              </div>
              <div class="input-control">
                <label>型号</label>
                <Dropdown :list="model_list"
                          :onSelect="set_model_id"
                />
              </div>
              <div class="input-control">
                <label>设计</label>
                <Dropdown :list="design_list"
                          :onSelect="set_design_id"
                />
              </div>
              <div class="input-control">
                <label>所属位置</label>
                <Location :onSelect="set_location_id"/>
              </div>
              <div class="input-control">
                <label class="dib">促销
                  <input type="checkbox" v-model="current.on_sale">
                </label>
                <label class="dib">本地车牌
                  <input type="checkbox" v-model="current.local">
                </label>
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
                <th>标题</th>
                <th>价格</th>
                <th>里程</th>
                <th>预期出售时间</th>
                <th>车况</th>
                <th>过户次数</th>
                <th>特价</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr v-for="row in list">
                  <td>{{row.title}}</td>
                  <td>{{row.price}}</td>
                  <td>{{row.consumed_distance || '-'}}</td>
                  <td>{{row.deadline || '-'}}</td>
                  <td>{{row.condition ? row.condition + '成新' : '-'}}</td>
                  <td>{{row.exchange_times || '-'}}</td>
                  <td>{{row.on_sale || '-'}}</td>
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

  import api from "../../lib/api";

  import AdminPage from '../../mixin/AdminPage.vue';
  import Dropdown  from "../../component/Dropdown";
  import Location  from "../../component/Location";
  // import validator from '../../directive/validator';

  export default {
    // directives : { validator },
    components : { Location, Dropdown },
    mounted () {
      this.list_user();
      this.list_brand();
      this.list_model();
      this.list_design();
    },
    data () {
      return {
        current     : {
          preview : [],
        },
        user_list   : [],
        model_list  : [],
        design_list : [],
        brand_list  : [],
        model       : 'vehicle',
        searchable  : [ 'title', 'description' ],
      };
    },
    methods    : {
      after_set_current () {
        this.current.preview = this.current.preview || [];
      },
      list_user () {
        api('user/read')
          .then(r => {
            this.user_list = r.data;
          });
      },
      list_model () {
        api('model/read')
          .then(r => {
            this.model_list = r.data;
          });
      },
      list_brand () {
        api('brand/read')
          .then(r => {
            this.brand_list = r.data;
          });
      },
      list_design () {
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
      set_publisher_id (row) {
        this.$set(this.current, 'publisher_id', row.id);
      },
      set_model_id (row) {
        this.$set(this.current, 'model_id', row.id);
      },
      set_location_id (row) {
        this.$set(this.current, 'location_id', row.id);
      },
    },
    mixins     : [ AdminPage ],
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
