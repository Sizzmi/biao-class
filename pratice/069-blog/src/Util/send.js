const ok = true;
const data = {
  list: {
    article: [
      {
        'id': 1,
        'title': '叫我王花花',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\n',
      },
      {
        'id': 2,
        'title': '叫我李拴蛋',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\n',
      },
      {
        'id': 3,
        'title': '叫我刘备备',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\n',
      },
    ],
    tag: [
      {
        'id': 1,
        'name': 'HTML',
      },
      {
        'id': 2,
        'name': '生活',
      },
      {
        'id': 3,
        'name': 'CSS',
      },
    ],
  },
};

const output = {
  get,
  post,
};

function get(url, on_succeed, on_fail) {
  var model = url.split('/')[2];

  if (ok)
    if (on_succeed)
      on_succeed(data.list[model]);
      else{
        if(on_fail)
        on_fail({
          ok :false,
          message:'invalid page',
        });
      }
}

function post(){

}


export default output;