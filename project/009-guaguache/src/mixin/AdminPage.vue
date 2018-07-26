<script>
  import api         from '../lib/api';
  import validator   from '../directive/validator';
  import AdminNav    from '../component/AdminNav.vue';
  import Nav         from '../component/Nav.vue';
  import Pagination  from '../component/Pagination.vue';
  import AdminFooter from '../component/AdminFooter';
  import Dropdown from '../component/Dropdown';

  export default {
    directives : { validator },
    components : { AdminNav, Nav, Pagination, AdminFooter,Dropdown },

    mounted () {
      if (!this.model) {
        throw new Error('请在data中配置当前页model');
      }

      // 拿到管理页列表初始数据，相当于点击第一页
      this.read();
    },

    data () {
      return {
        // 重要的模型状态和配置
        model : null, // 当前模型，不同管理页对应着不同模型，如：'user', 'vehicle'

        // 搜索相关
        keyword    : '', // 搜索关键词
        searchable : [], // 可搜索的所有属性

        // 界面相关
        show_form : false, // 是否显示表单

        // 数据相关
        current : {}, // 正在编辑的数据
        list    : [], // 表格中当前页数据

        // 翻页相关
        current_page : 1, // 当前页码
        last_page    : 0, // 最后一页，一开始不知道所以是零
        total        : 0, // 总共有多少条
        limit        : 5, // 每页显示几条
      };
    },

    methods : {

      /**
       * 翻页时应该做什么
       * @param {number} 页码
       * */
      on_page_change (page) {
        this.read(page);
      },

      /**
       * 创建或更新
       * create or update
       *
       * 具体常见还是更新取决于是否有id
       */
      cou (e) {
        e.preventDefault();

        let action = this.current.id ? 'update' : 'create';

        api(`${this.model}/${action}`, this.current)
          .then(r => {
            this.current = {};
            this.read();
          });
      },

      /**
       * 获取某一页的数据并将其覆盖至this.list
       * @param {number} 页码
       * */
      read (page = 1) {
        if (page == this.current_page && page != 1)
          return;

        api(`${this.model}/read`, { limit : this.limit, page : page, with : this.with })
          .then(r => {
            this.total        = r.total;
            this.list         = r.data;
            this.last_page    = r.last_page;
            this.current_page = r.current_page;
          });
      },

      /**
       * 通过id删一条
       * @param {number} id
       * */
      remove (id) {
        if (!confirm('确定删除？'))
          return;

        api(`${this.model}/delete`, { id })
          .then(r => {
            this.read();
          });
      },

      /**
       * 设置当前数据行
       * 通常用于当用户点击编辑按钮时填充表单数据
       * @param row
       */
      set_current (row) {
        this.current   = row;
        this.show_form = true;
        if (this.after_set_current) {
          this.after_set_current();
        }
      },

      /**
       * 搜索
       * @param {Event} e
       */
      search (e) {
        e.preventDefault();

        let param = {
          or : {},
        };

        this.searchable.forEach(prop => {
          param.or[ prop ] = this.keyword;
        });

        api(`${this.model}/search`, param)
          .then(r => {
            this.list = r.data;
          });
      },

      is_update () {
        return !!this.current.id;
      },
    },
  };</script>
