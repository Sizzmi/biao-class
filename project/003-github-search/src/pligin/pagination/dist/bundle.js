!function(n){var t={};function e(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return n[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=n,e.c=t,e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:i})},e.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=1)}([function(n,t){var e,i,a,r,o,s={amount:null,limit:null,range:5,current:1},c={init:function(n){if(!(i=document.querySelector(n.el)))throw"Invalid root element.";if(e=Object.assign({},s,n),i.classList.add("pagination"),i.innerHTML='\n  <fieldset class ="pagination-fieldset">\n  <div class = "pagination-pre">\n  <button class="pagination-first">First</button>\n  <button class="pagination-prev">Prev</button>\n  </div>\n  <div class="pagination-list"></div>\n  <div class="pagination-post">\n  <button class="pagination-next>Next</button>\n  <button class="pagination-last>Last</button>\n  </div>\n  </fieldset>\n  ',r=i.querySelector(".pagination-list"),o=i.querySelector(".pagination-fieldset"),i.addEventListener("click",function(n){var t=n.target,i=t.classList.contains("pagination-item"),r=t.classList.contains("pagination-first"),o=t.classList.contains("pagination-last"),s=t.classList.contains("pagination-prev"),c=t.classList.contains("pagination-next");if(i){var l=parseInt(t.dataset.page);d(l)}else r?d(1):o?d(a):s?d(e.current-1):c&&d(e.current+1);u()}),!n.amount||!n.limit)return;l(),d(e.current,!0),u()},change_page:d,disable:function(){o.disabled=!0},enable:function(){o.disabled=!1},is_disabled:function(){return o.disabled},show:function(){i.hidden=!1},hide:function(){i.hidden=!0},is_visible:function(){return!i.hidden},set_amount_and_limit:function(n,t){e.aomunt=n,e.limit=t,l(),u()}};function u(){r.innerHTML="";for(var n=function(){var n,t,i=Math.ceil(e.range/2),r=e.current<=i,o=e.current>=a-i;r?(n=1,t=e.range):o?(n=a-(e.range-1),t=a):(n=e.current-(i-1),t=e.current+(i-1));return{start:n,end:t}}(),t=n.start,i=n.end,o=t;o<=i;o++){var s=document.createElement("button");s.innerText=o,s.classList.add("pagination-item"),s.dataset.page=o,r.appendChild(s),o==e.current&&s.classList.add("active")}}function l(){a=Math.ceil(e.amount/e.limit)}function d(n,t){var i=e.current;e.current=n,n>a&&(e.current=a),n<1&&(e.current=1),(t||i!=e.current)&&e.on_page_change&&e.on_page_change(e.current)}n.exports=c},function(n,t,e){e(0).init({el:"#page",amount:400,limit:10,range:5,current:12,on_page_change:function(n,t){console.log(n)}})}]);