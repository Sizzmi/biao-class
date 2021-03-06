
    /*模板床*/
    var el_user_list = document.getElementById('user-list')
      , el_form = document.getElementById('search-form')
      , el_input = document.getElementById('search-input')
      , el_top = document.getElementById('top')
      , el_placeholer = document.getElementById('placeholer')
      , el_pagination_container = document.getElementById('pagination-container')
      , el_pagination = el_pagination_container.querySelector('#pagination')
      , el_pagination_start = el_pagination_container.querySelector('#pagination-start')
      , el_pagination_end = el_pagination_container.querySelector('#pagination-end')
      , el_history_list = document.getElementById('history-list')
      , history_list
      , keyword
      , no_more
      , amount
      , page_amount
      , MAX_LIMIT = 999
      , max_page_btn = 7
      , current_page = 1
      , limit = 5
    ;

    /*返回的数据*/
    var res;

    init();

    /*初始化*/




    /*通过用户名搜Github用户
    * @param String keyword 关键词
    * */
    function search() {

      /*准备发射*/
      var http = new XMLHttpRequest();
      http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + current_page + '&per_page=' + limit);
      http.setRequestHeader('Authorization', 'Basic ' + btoa('biaoyansu:94bfe1cf32b7aa3d0c2cbdd94958510841afece0'));

      /*发射*/
      http.send();

      /*返回后*/
      http.addEventListener('load', function () {
        /*解析（将JSON格式的字符串转换为JS能理解的数据）返回数据*/
        res = JSON.parse(http.responseText);

        /*拿到搜索结果总数*/
        amount = res.total_count;
        /*既然有了数据，不就可以渲染用户列表和页码组件了吗？*/
        render();
        render_pagination();
      });

      append_history(keyword);
    }

    /*将关键词写入历史记录*/
    function append_history(kwd) {
      /*不管有没有已经搜过的先删一遍再说*/
      find_and_delete(history_list, kwd);
      /*更新炒瓢数据*/
      history_list.unshift(kwd);
      /*更新冰箱数据*/
      overwrite_history_list(history_list);
    }


    /*从冰箱中重新获取搜索历史记录*/





    function find_and_delete(arr, element) {
      var shit_index = arr.indexOf(element);

      if (shit_index == -1)
        return false;

      arr.splice(shit_index, 1);
      return true;
    }

    //@1
    // function detect_click_history_list() {
    //   el_history_list.addEventListener('click', function (e) {
    //     var history_wrapper = e.target.closest('.history');
    //     if (!history_wrapper)
    //       return;
    //
    //     set_keyword(history_wrapper.dataset.history);
    //   });
    // }

    function set_keyword(kwd) {
      el_input.value = kwd;
      keyword = kwd;
    }

    /*往冰箱存*/
    function store_set(key, val) {
      /*加保鲜膜（JSON化）*/
      var json = JSON.stringify(val);
      /*存冰箱（状态稳定不轻易改变）*/
      localStorage.setItem(key, json);
    }

    /*从冰箱取*/
    function store_get(key) {
      /*从冰箱取到带保鲜膜的数据*/
      var json = localStorage.getItem(key);
      /*撕膜（将数据转化为JS可以理解的数据类型）*/
      return JSON.parse(json);
    }



    function detect_click_input() {
      el_input.addEventListener('click', function () {
        show_history_list();
      });
    }

    function detect_click_document() {
      /*给html元素加点击事件*/
      document
        .documentElement
        .addEventListener('click', function (e) {
          var target = e.target;

          console.log(target);

          var in_search_input = target.closest('#search-input')
            , in_history_list = target.closest('#history-list')
          ;

          if (in_search_input || in_history_list)
            return;

          hide_history_list();
        });
    }

    function detect_blur_input() {
      el_input.addEventListener('blur', function () {

      });
    }

    function show_history_list() {
      if (!history_list.length)
        return;

      el_history_list.hidden = false;
    }

    function hide_history_list() {
      el_history_list.hidden = true;
    }

    function goto_page(page) {

      var max_user_limit_reached = page * limit > MAX_LIMIT;

      if (max_user_limit_reached) {
        current_page = Math.floor(MAX_LIMIT / limit);
      } else {
        current_page = page;
      }

      search();
    }

   
    

    /*重置页码为1*/
    function reset_page() {
      current_page = 1;
    }

    /*清空已渲染内容*/
    function reset_user_list() {
      el_user_list.innerHTML = '';
    }


    /**
     * 通过数据生成HTML
     */
    function render() {
      /*初始化HTML*/
      var html = '';

      /*遍历用户列表*/
      res.items.forEach(function (user) {
        /*每个用户都追加到HTML后面*/
        html = html + `
  <div class="user">
    <a class="avatar" target="_blank" href="${user.html_url}">
      <img src="${user.avatar_url}">
    </a>
    <div class="info">
      <div class="username">${user.login}</div>
      <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
    </div>
  </div>
    `;
      });

      /*将生成的HTML写入模板床*/
      el_user_list.innerHTML = html;
      document
        .getElementById('amount')
        .innerHTML = `共有${res.total_count}条结果`;

      /*如果每页的数量乘以页数大于总数就说明当前页就是最后一页*/
      no_more = current_page * limit >= amount;

      /*
      .hidden = no_more;
      el_placeholer.hidden = !no_more;
      */

      /*如果没有更多*/
      if (no_more) {
        /*隐藏翻页按钮*/
        /*显示"谋了"*/
        el_placeholer.hidden = false;
      } else { // 否则正好相反
        el_placeholer.hidden = true;
      }
    }

    function clear_pagination() {
      el_pagination.innerHTML = '';
    }

    function hide_pagination() {
      el_pagination_container.hidden = true;
    }

    function show_pagination() {
      el_pagination_container.hidden = false;
    }

    function render_pagination() {
      show_pagination();
      clear_pagination()
      get_page_amount();

      var start
        , end
        , middle = Math.ceil(max_page_btn / 2)
        , reaching_left = current_page <= middle
        , reaching_right = current_page >= page_amount - middle;
      ;


      if (reaching_left) {
        /*
        当前页在左边
        [...].....
        */
        /*设按钮开始为1*/
        start = 1;

        /*设结束为可视按钮最大值*/
        end = max_page_btn;
      } else if (reaching_right) {
        /*
        当前页在右边
        .....[...]
        */
        /*设按钮开始为总页数减去可视按钮最大值*/
        start = page_amount - max_page_btn;
        /*设按钮结束为总页数*/
        end = page_amount;
      } else {
        /*
        当前页在中间
        ...[...]...
        */

        /*加1或减1是为了排除中间按钮*/

        /*设按钮开始为当前页减去可视按钮最大值的一半*/
        start = current_page - middle + 1;
        /*设按钮结束为当前页加上可视按钮最大值的一半*/
        end = current_page + middle - 1;
      }

      /*如果出于任何诡异的原因导致开始按钮小于1就将其复位为1*/
      if (start < 1) {
        start = 1;
      }

      /*如果出于任何诡异的原因导致结束按钮大于页面总数就将其复位为总数*/
      if (end > page_amount) {
        end = page_amount;
      }

      /*通过指定开始和结束动态的追加翻页按钮*/
      for (var i = start; i <= end; i++) {
        var num = i;

        /*生成btn按钮*/
        var btn = document.createElement('button');
        /*指定它是第几页的按钮*/
        btn.innerText = num;

        /*给所有页码加pager类，方便以后指定样式*/
        btn.classList.add('pager');

        /*如果当前页等于正在迭代的按钮，就给按钮加一个激活的类，
        不然用户不知道自己当前在第几页*/
        if (current_page == num) {
          btn.classList.add('active');
        }

        /*追加到页码容器的后面*/
        el_pagination.appendChild(btn);

        btn.addEventListener('click', make_function_on_page_change(num));
      }
    }

    function make_function_on_page_change(num) {
      return function (e) {
        /*让current_page（当前页面）等于点击的按钮的序号*/
        current_page = num;
        /*然后再搜索，不然的话永远都在取第1页的数据*/
        search();
      };
    }


    /*获取页面总数*/
    function get_page_amount() {
      /*总人数除以每页的数量*/
      page_amount = Math.ceil(amount / limit);
    }
  })();
