<template>
  <div>
    <Nav/>
    <div>
      <div class="container">
        <SearchBar :keyword="search_param.keyword"/>
      </div>
      <div class="container">
        <div class="filter-list">
          <div class="kill-space filter">
            <div class="col-lg-1 prop">品牌</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.brand_id}" @click="remove_query('brand_id')">不限</span>
              <span :class="{active: search_param.brand_id == row.id}" @click="set_query_where('brand_id', row.id)"
                    v-for="row in list.brand">{{row.name}}</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">设计</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.design_id}" @click="remove_query('design_id')">不限</span>
              <span :class="{active: search_param.design_id == row.id}" @click="set_query_where('design_id', row.id)"
                    v-for="row in list.design">{{row.name}}</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">价格</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.price_min && !search_param.price_max}"
                    @click="set_query_price_range()">不限
              </span>
              <span :class="{active: search_param.price_min == 0 && search_param.price_max ==3}"
                    @click="set_query_price_range(0, 3)">3万以下
              </span>
              <span :class="{active: search_param.price_min == 3 && search_param.price_max ==5}"
                    @click="set_query_price_range(3, 5)">3-5
                万</span>
              <span :class="{active: search_param.price_min == 5  && search_param.price_max ==8}"
                    @click="set_query_price_range(5, 8)">5-8
                万</span>
              <span :class="{active: search_param.price_min == 8 && search_param.price_max ==10}"
                    @click="set_query_price_range(8, 10)">8-10
                万</span>
              <span :class="{active: search_param.price_min == 10 && search_param.price_max == 15}"
                    @click="set_query_price_range(10, 15)">10-15
                万</span>
              <span :class="{active: search_param.price_min == 15 && search_param.price_max == 20}"
                    @click="set_query_price_range(15, 20)">15-20
                万</span>
              <span :class="{active: search_param.price_min == 20 && search_param.price_max == 30}"
                    @click="set_query_price_range(20, 30)">20-30
                万</span>
              <span :class="{active: search_param.price_min == 30}"
                    @click="set_query_price_range(30, 0)">30
                万以上</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <!--<div class="kill-space filter">-->
          <!--<div class="col-lg-1 prop">更多</div>-->
          <!--<div class="col-lg-10 range">-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--&lt;!&ndash;<Dropdown :onSelect="yo" :list="tmp"/>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="col-lg-1 right others">-->
          <!--<button>全部</button>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="filter-list">
          <div class="filter">
            <div class="range">
              <span>默认排序</span>
              <span class="anchor" @click="toggle_sort_by('id')">时间
                <i :class="{fas: true, 'fa-caret-up': is_sort('id', 'up'),
                        'fa-caret-down': is_sort('id', 'down')}"></i></span>
              <span class="anchor" @click="toggle_sort_by('price')">价格
                <i :class="{fas: true, 'fa-caret-up': is_sort('price', 'up'),'fa-caret-down': is_sort('price',
                        'down')}"></i></span>
              <span class="anchor" @click="toggle_sort_by('birth_day')">车龄
                <i :class="{fas: true, 'fa-caret-up': is_sort('birth_day', 'up'),'fa-caret-down': is_sort('birth_day',
                        'down')}"></i></span>
              <span class="anchor" @click="toggle_sort_by('consumed_distance')">里程
                <i :class="{fas: true, 'fa-caret-up': is_sort('consumed_distance', 'up'),'fa-caret-down': is_sort('consumed_distance',
                        'down')}"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div v-if="result.length" class="row vehicle-list">
          <div v-for="row in result" class="col-lg-3">
            <div class="card">
              <div class="thumbnail">
                <img :src="get_main_cover_url(row)">
              </div>
              <div class="info">
                <div class="title">{{row.title}}</div>
                <div class="desc">2015年02月 / 3.07万公里</div>
                <div class="others">
                  <span class="price">{{row.price}}万</span>
                  <span>首付3.5万</span>
                  <router-link :to="'/detail/' + row.id" class="btn btn-primary buy">购买</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-holder" v-else>暂无内容</div>
        <Pagination :totalCount="total"
                    :limit="limit"
                    :onChange="on_page_change"
                    :currentPage="search_param.page"
        />
      </div>
    </div>
    <div class="footer">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur beatae debitis deleniti doloribus, earum
      esse excepturi fugit impedit ipsum maxime, nulla optio porro quam quibusdam, sint tempora unde vel?
    </div>
  </div>
</template>

<script>
  import '../css/vehicle-list.css';

  import Nav        from '../component/Nav.vue';
  import SearchBar  from '../component/SearchBar.vue';
  import Dropdown   from '../component/Dropdown.vue';
  import Pagination from '../component/Pagination.vue';

  import Reader      from '../mixin/Reader';
  import VehicleList from '../mixin/VehicleList';

  import api       from '../lib/api';
  import { clone } from '../lib/helper';

  export default {
    mixins     : [ VehicleList, Reader ],
    mounted () {
      // this.search_param = this.$route.query;
      this.prepare_search_param();
      this.search();
      this.read('brand');
      this.read('design');
    },
    components : { Nav, SearchBar, Dropdown, Pagination },
    data () {
      return {
        result       : [],
        total        : 0,
        limit        : 3,
        list         : {},
        search_param : {},
        tmp          : [
          { name : '赵宁', value : 1 },
          { name : '安宁', value : 2 },
          { name : '邢冬冬', value : 3 },
          { name : '小宝', value : 4 },
        ],
      };
    },
    methods    : {

      on_page_change (page) {
        this.set_condition('page', page);
      },

      is_sort (property, direction) {
        let p = this.search_param;

        if (!p.sort_by)
          return false;

        return p.sort_by[ 0 ] == property && p.sort_by[ 1 ] == direction;
      },

      parse_route_query () {
        let query = clone(this.$route.query);

        if (!query.sort_by)
          query.sort_by = [ 'id', 'down' ];

        if (typeof query.sort_by == 'string')
          query.sort_by = query.sort_by.split(',');

        return query;
      },

      toggle_sort_by (property) {
        let query = this.parse_route_query();

        let sort_prop = query.sort_by[ 0 ];  // price
        let direction = query.sort_by[ 1 ];

        // 是不是上次排序的属性，如果是，就倒置排序
        if (sort_prop == property) {
          query.sort_by[ 1 ] = direction == 'up' ? 'down' : 'up';
        } else { // 否则使用指定的属性排序，默认使用降序排序
          query.sort_by[ 0 ] = property;
          query.sort_by[ 1 ] = 'down';
        }

        query.sort_by = query.sort_by.toString();

        // this.$router.replace({});
        this.$router.replace({ query });
      },

      set_query_price_range (min, max) {
        let query = this.parse_route_query();
        if (!min && !max) {
          delete query.price_min;
          delete query.price_max;
        } else {
          let condition = {
            price_min : min,
            price_max : max,
          };

          query = Object.assign({}, query, condition);
        }

        this.$router.replace({ query });
      },

      prepare_search_param () {
        let query         = this.parse_route_query();
        this.search_param = query;
      },

      set_condition (type, value) {
        let query = clone(this.$route.query);

        switch (type) {
          case 'sort_by':
            query.sort_by = value;
            break;
          case 'page':
            query.page = value;
            break;
        }

        this.$router.replace({ query });
        this.search();
      },

      set_query_where (type, value) {
        let condition     = {};
        condition[ type ] = value;

        let o = this.search_param;
        let n = Object.assign({}, o, condition);
        this.$router.replace({ query : n });
      },
      remove_query (type) {
        let query = this.parse_route_query();
        delete query[ type ];
        this.$router.replace({ query });
      },
      on_submit () {
        this.search();
      },
      search () {

        let p = this.search_param;

        let brand_query     = ''
          , design_query    = ''
          , price_min_query = ''
          , price_max_query = ''
        ;

        p.brand_id && (brand_query = `and "brand_id" = ${p.brand_id}`);
        p.design_id && (design_query = `and "design_id" = ${p.design_id}`);
        p.price_min && (price_min_query = `and "price" >= ${p.price_min}`);
        p.price_max && (price_max_query = `and "price" <= ${p.price_max}`);

        let query =
              `where("title" contains "${p.keyword || ''}" ${brand_query} ${design_query} ${price_min_query} ${price_max_query})`;

        api('vehicle/read', { query : query, sort_by : p.sort_by, limit : this.limit, page : p.page })
          .then(r => {
            this.result = r.data;
            this.total  = r.total;
          });
      },
    },
    watch      : {
      '$route.query' : {
        deep : true,
        handler () {
          this.prepare_search_param();
          this.search();
        },
      },
    },
  };
</script>

<style scoped>
  .search-bar {
    width: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .guarantee .col-lg-3 {
    padding: 20px;
  }

  .guarantee .card {
    padding: 15px;
    background: #fff;
  }

  .guarantee .title {
    margin-bottom: 10px;
  }

  .guarantee .desc {
    font-size: .7rem;
    color: #999;
  }

  .vehicle-nav .item {
    display: inline-block;
    width: 16.66666666666%;
    text-align: center;
    background: #fff;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left-width: 0;
  }

  .vehicle-nav .item:first-child {
    border-left-width: 1px;
  }

  .filter-list {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    margin-bottom: 5px;
    /*padding: 5px;*/
  }

  .filter {
    border-top: 1px solid rgba(0, 0, 0, .1);
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .filter:first-child {
    border-top: 0;
  }

  .filter > * {
    vertical-align: middle;
  }

  .filter .prop,
  .filter .range > * {
    padding: 5px 10px;
  }

  .filter .range > * {
    cursor: pointer;
    margin-right: 2px;
  }

  .filter .range > .active {
    background: #fd521d;
    color: #fff;
  }

  .filter .others button {
    background: transparent;
    border: 0;
  }

  .filter .others button,
  .filter .dropdown {
    padding: 2px 5px;
  }
</style>
