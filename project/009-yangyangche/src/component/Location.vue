<template>
  <div class="location">
    <div class="search">
      <input type="search" v-model="keyword" placeholder="输入城市名称搜索">
    </div>
    <div class="step-list">
      <div v-if="location.state.length" class="step">
        <div :class="{active: lo.id == current.state, item:true}" @click="select(lo, 'state')"
             v-for="lo in location.state">{{lo.name}}
        </div>
      </div>
      <div v-if="location.city.length" class="step">
        <div :class="{active: lo.id == current.city, item:true}" @click="select(lo, 'city')"
             v-for="lo in location.city">{{lo.name}}
        </div>
      </div>
      <div v-if="location.region.length" class="step">
        <div :class="{active: lo.id == current.region, item:true}" @click="select(lo, 'region')"
             v-for="lo in location.region">{{lo.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const china_id = 1;

  import api from '../lib/api';

  export default {
    props : {
      onSelect : {},
    },

    mounted () {
      this.read(china_id, 'state');
    },

    data () {
      return {
        keyword   : '', // 搜索关键词
        parent_id : null, // 父级id
        location  : { // 存放检索结果
          state  : [],
          city   : [],
          region : [],
        },
        current   : { // 当前选中的地址id
          state  : null,
          city   : null,
          region : null,
        },
      };
    },

    methods : {
      /**
       * 选择地址
       * @param row
       * @param type
       */
      select (row, type) {
        let child_type;
        this.current[ type ] = row.id;

        switch (type) {
          case 'state':
            child_type = 'city';
            break;
          case 'city':
            child_type = 'region';
            break;
        }

        // 选中后开始获取其子地址
        this.read_children_and_select(row, child_type);
      },

      reset_location () {
        this.location = {
          state  : [],
          city   : [],
          region : [],
        };
      },

      /**
       * 获取子地址，如果没有子地址就说明最精确的地址找到了
       * @param parent
       * @param type
       */
      read_children_and_select (parent, type) {
        this
          .read(parent.id, type)
          .then(data => {
            if (!data.length || parent.type == 'city') {
              this.onSelect(parent);
            }
          });
      },

      /**
       * 列出地址
       * @param parent_id
       * @param type
       * @return {*}
       */
      read (parent_id, type) {
        this.parent_id = parent_id;
        return api('location/read', {
          where : {
            and : { parent_id },
          },
        }).then(r => {
          let data              = r.data;
          this.location[ type ] = data;
          return data;
        });
      },

      /**
       * 通过name搜索地址
       */
      search () {
        this.reset_location();
        api('location/search', {
          or : {
            name : this.keyword,
          },
        }).then(r => {
          this.group(r.data);
        });
      },

      /**
       * 将搜索结果分类存放
       * @param list
       */
      group (list) {
        list.forEach(row => {
          let sub = this.location[ row.type ];
          sub.push(row);
        });
      },
    },

    watch : {
      keyword () {
        this.search();
      },
    },
  };
</script>

<style scoped>
  .location {
    max-width: 200px;
  }

  .step-list {
    border: 1px solid rgba(0, 0, 0, .1);
    line-height: 0;
    border-top-width: 0;
  }

  .location .step {
    line-height: 1.7;
    display: inline-block;
    width: 33.333333333%;
    max-height: 100px;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, .1);
  }

  .location .step:last-child {
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .location .step:first-child {
    border-left: 0;
  }

  .location .item {
    cursor: pointer;
    padding: 5px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .location .item.active {
    background: #fd521d;
    color: #fff;
  }
</style>
