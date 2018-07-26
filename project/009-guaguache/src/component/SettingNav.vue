<template>
  <div :style="{width: width}" class="card side-nav">
    <a href="#" class="nav-item active">基础信息</a>
    <a href="#" class="nav-item">安全设置</a>
    <a href="#" class="nav-item">买卖设置</a>
  </div>
</template>

<script>
  import '../css/sidenav.css';

  export default {
    props : [ 'width' ],
  };
</script>

<style scoped></style>
