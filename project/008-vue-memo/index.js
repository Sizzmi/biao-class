window.root = new Vue({
  el: '#root',
  data: {
    current: null,
    memo_list: [],
  },
  methods: {
    add() {
      let is_update = !!this.current.id;
      let api = is_update ? 'update' : 'create';

      http
        .post(`memo/${api}`, this.current)
        .then((res) => {
          let new_row = res.data.data;
          this.current = new_row;

          if (!is_update)
            this.memo_list.push(new_row);
        });
      // this.memo_list.push(this.current);
    },
    remove(id, e) {
      http
        .post('memo/delete', { id: id })
        .then((res) => {
          this.sync_from();
        });
      e.stopPropagation();
    },
    // sync_to (memo_list) {
    //   localStorage.setItem('memo_list', JSON.stringify(memo_list));
    // },
    sync_from() {
      http
        .post('memo/read', {
          limit: 5,
          // sort_by:['id','up'],
          where: {
            or: [
              // ['title','=','a'],
              // ['title','b']
              ['id', '>', 5],
            ],
          },
        })
        .then((res) => {
          this.memo_list = res.data.data;

        });

      // this.memo_list = JSON.parse(localStorage.getItem('memo_list'))||
      //   [
      //   {
      //     title   : 'title A',
      //     content : 'aaaa',
      //   },
      //   {
      //     title   : 'title B',
      //     content : 'bbbb',
      //   },
      //   {
      //     title   : 'title C',
      //     content : 'cccc',
      //   },
      // ];
      },
      init_current(){
        this.current={};
      },
    },
    //   watch: {
    //     memo_list: {
    //       deep: true,
    //         handler : function (n) {
    //           this.sync_to(n);
    //         },
    //     },
    //   },
    //   created() {
    //     this.sync_from();
    //   },
    created(){
      this.sync_from();
    },
    });
