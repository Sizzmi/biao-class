import Vue from 'vue';
import api from '../lib/api';

function parse_string_rule (str) {
  let rule = {};

  str
    .split('|')
    .forEach(r => {
      let arr = r.split(':');
      let key = arr[ 0 ]; // 例子：'min_length:4'，那么key就等于min_length
      let val = arr[ 1 ]; // 例子：'min_length:4'，那么val就等于4
      if (val)
        val = val.split(',');

      // 如果只有键没有值，例子：'required'，那么val就等于true
      val = val === undefined ? true : val;

      rule[ key ] = val;
    });

  return rule;
}

// 各种验证规则
const valid = {
  /**
   * 是否为正数
   * @param val
   * @param lang
   */
  max (val, lang, max) {
    const lang_conf = {
      zh : '最大值为：' + max,
      en : 'Max value: ' + max,
    };

    if (this.numeric(val) && parseFloat(val) > max)
      throw lang_conf[ lang ];

    return true;
  },
  /**
   * 是否为正数
   * @param val
   * @param lang
   */
  positive (val, lang) {
    const lang_conf = {
      zh : '不合法的数字',
      en : 'Invalid number',
    };

    if (this.numeric(val) && parseFloat(val) < 0)
      throw lang_conf[ lang ];

    return true;
  },

  /**
   * 是否为邮箱
   * @param val
   * @param lang
   */
  mail (val, lang) {
    const lang_conf = {
      zh : '不合法的邮箱',
      en : 'Invalid email',
    };

    let re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

    console.log('re.test(val):', re.test(val));

    if (!re.test(val))
      throw lang_conf[ lang ];

    return true;
  },


  /**
   * 是否为数字
   * @param val
   * @param lang
   */
  numeric (val, lang) {
    const lang_conf = {
      zh : '不合法的数字',
      en : 'Invalid number',
    };

    if (parseFloat(val) != val)
      throw lang_conf[ lang ];

    return true;
  },

  cellphone (val, lang) {
    const lang_conf = {
      zh : '不合法的手机号',
      en : 'Invalid phone number',
    };

    if (!this.numeric(val, lang) || !this.length(val, lang, 11))
      throw lang_conf[ lang ];

    return true;
  },

  length (val, lang, len) {
    const lang_conf = {
      zh : '不合法的长度，长度需等于' + len + '位',
      en : 'Invalid field length, length should equals to ' + len,
    };

    val = val.toString();
    if (val.length == len)
      return true;

    throw lang_conf[ lang ];
  },

  /**
   * 验证用户名格式
   * @param val
   * @return {boolean}
   */
  username (val, lang) {
    const lang_conf = {
      zh : '用户名不合法，只能包含字母和数字',
      en : 'Invalid username',
    };

    const re = /^[a-zA-Z0-9]*$/;
    let r    = re.test(val);

    if (!r)
      throw lang_conf[ lang ];

    return r;
  },

  /**
   * 是否与指定input一致
   * @param val
   * @return {boolean}
   */
  shadow (val, lang, selector) {
    const lang_conf = {
      zh : '两次输入不一致',
      en : 'Inconsistent double inputs',
    };

    let reference = document.querySelector(selector);
    let value     = reference.value;

    if (value !== val)
      throw lang_conf[ lang ];

    return true;
  },

  not_exist (val, lang, model, property, except) {
    return new Promise((s, j) => {
      if (!val || val == except)
        s();

      return api(`${model}/first`, { where : { and : { [ property ] : val } } })
        .then(r => {
          return r.data ? j('用户名已存在') : s(true);
        });
    });
  },

  /**
   * 验证非空
   * @param val
   * @return {boolean}
   */
  required (val, lang) {
    const lang_conf = {
      zh : '此项为必填项',
      en : 'This field is required',
    };

    if (typeof val === 'number')
      return true;

    let r = !!val;

    if (!r)
      throw lang_conf[ lang ];

    return r;
  },

  /**
   * 验证最小长度
   * @param val
   * @param min
   * @return {boolean}
   */
  min_length (val, lang, min) {
    const lang_conf = {
      zh : '此项的最小长度为' + min,
      en : 'Minimal length: ' + min,
    };

    let r = val.length >= parseInt(min);

    if (!r)
      throw lang_conf[ lang ];

    return r;
  },

  /**
   * 验证最大长度
   * @param val
   * @param max
   * @return {boolean}
   */
  max_length (val, lang, max) {
    const lang_conf = {
      zh : '此项的最大长度为' + max,
      en : 'Maximum length: ' + max,
    };

    let r = val.length <= parseInt(max);

    if (!r)
      throw lang_conf[ lang ];

    return r;
  },
};

/**
 * 设置表单是否合法，其实就是更新form_valid全文变量
 * @param valid
 */
// function set_form_valid (valid) {
//   form_valid = valid;
// }

/**
 * 检查所有input是否合法（即有没有invalid属性）
 * @param input_list 当前表单所有已验证的input，通常在el_form.$state.input_list中
 * @param el_submit 提交按钮
 */
function validate_form (input_list, el_submit) {
  let invalid = false;

  input_list.forEach(input => {
    if (input.getAttribute('invalid') === 'true') {
      invalid = true;
    }
  });

  if (invalid)
    disable_submit(el_submit);
  else
    enable_submit(el_submit);
}

/**
 * 禁用提交按钮
 */
function disable_submit (el_submit) {
  el_submit.setAttribute('disabled', 'disabled');
}

/**
 * 启用提交按钮
 */
function enable_submit (el_submit) {
  el_submit.removeAttribute('disabled');
}

function init_form_state (form, lang) {
  let el_submit = form.querySelector('[type=submit]');

  if (!el_submit)
    throw 'Missing submit button.';

  form.$state = {
    lang       : lang,
    el_submit  : el_submit,
    input_list : [],
  };
  // form.$state.input_list = form.$state.input_list || [];
}

function track_input (form, input) {
  form.$state.input_list.push(input);
}

/**
 * 开始验证并显示错误信息
 * @param el_form input所属表单
 * @param el_input input元素
 * @param el_error 显示错误的元素
 * @param rule 规则 {required: true, min_length:4}
 */
function go (el_form, el_input, el_error, rule) {
  let val     = el_input.value;
  let invalid = false;
  let lang    = el_form.$state.lang;

  // 由于错误信息可能不止一条（不是用户名还没满足最小长度）
  // 所以每一条错误信息都要一个独立的元素包含：
  // <div class="error">错误1...</div>
  // <div class="error">错误2...</div>
  let inner_msg = '';

  set_invalid(false);

  if (!val && !rule.required)
    return;

  // 如果有非空验证就先执行非空验证
  if (rule.required) {
    try {valid.required(val, lang);}
    catch (e) {
      set_invalid(true, e);
      return;
    }
  }

  // 循环并验证每一条规则
  for (let type in rule) {
    // type是每一类验证规则如'required'或'username'
    let arg       = rule[ type ]; // 获取传参，如'min_length:4'中的'4'
    let validator = valid[ type ].bind(valid); // 获取验证函数

    try {
      let args = [ val, el_form.$state.lang ].concat(arg);

      if (!invalid) {
        // if (!val && type != 'required')
        //   return;
        let result = validator(...args);
        if (result instanceof Promise) {
          result
            .then(r => {
              if (r)
                set_invalid(false);
            })
            .catch((r) => {
              set_invalid(true, r);
            });
        }
      }
    } catch (e) {
      set_invalid(true, e);
      break;
    }
  }

  function set_invalid (invalid, e) {
    if (invalid) {
      inner_msg += `<div class="error">${e}</div>`;
      el_input.setAttribute('invalid', 'true');
    } else
      el_input.setAttribute('invalid', 'false');

    if (el_input.getAttribute('dirty') === 'true') {
      el_error.innerHTML = inner_msg;
    }

    validate_form(el_form.$state.input_list, el_form.$state.el_submit);
  }
}


export default Vue.directive('validator', {
  /**
   * 当此指令插入DOM中的一瞬间
   * @param el
   * @param binding
   */
  inserted : function (el, binding) {
    let debounce_timer;
    // 先拿到字符串验证规则
    let rule = binding.value; // 'required|username|min_length:4'

    let selector = el.getAttribute('error-el'); // 用于显示错误信息的选择器
    let error_el = document.querySelector(selector); // 用于显示错误信息的元素

    if (!error_el) {
      error_el = document.createElement('div');
      error_el.classList.add('error-list');
      el.insertAdjacentElement('afterEnd', error_el);
    }

    // 如果规则直接是字符串就解析字符串为对象规则
    if (typeof rule === 'string')
      rule = parse_string_rule(binding.value); // {required: true, min_length: 4}

    // @var {HTMLFormElement} 当前指令所属表单
    let el_form = el.closest('form');

    // 将表单内所有input的状态存在当前<input>所在的<form>上，如果没有存过，就初始化
    if (!el_form.$state) {
      let lang = el.getAttribute('error-lang') || 'zh'; // 错误信息的语言
      init_form_state(el_form, lang);
    }

    // 将新的input追加到$state中
    track_input(el_form, el);

    // 执行初始验证
    go(el_form, el, error_el, rule);

    function on_input_change () {
      clearTimeout(debounce_timer);
      debounce_timer = setTimeout(() => {
        go(el_form, el, error_el, rule);
      }, 300);
    }


    // 当输入框有字符输入时开始验证
    el.addEventListener('keyup', on_input_change);
    // el.addEventListener('click', on_input_change);
    el.addEventListener('change', on_input_change);

    el.addEventListener('focus', () => {
      el.setAttribute('dirty', 'true');
    });
  },
});
