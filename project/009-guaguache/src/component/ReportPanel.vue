<template>
  <div class="report-panel">
    <div class="title">{{title || '检测报告'}}</div>
    <div v-if="empty_report()">
      <div v-for="(ok, key) in report"
           v-if="(conf = reportStructure[key]) && conf.cat == cat"
           :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
        <span v-if="ok" class="fa fa-check"></span>
        <span v-else class="fa fa-minus"></span> {{conf.display_name}}
      </div>
    </div>
    <div v-else class="empty-holder">暂未检测</div>
  </div>
</template>

<script>
  export default {
    props   : [ 'reportStructure', 'report', 'title', 'cat' ],
    methods : {
      empty_report () {
        if (!this.report)
          return false;

        return Object.keys(this.report).length;
      },
    },
  };
</script>

<style scoped>
  .report-panel {
    padding: 0;
    border: 1px solid mediumseagreen;
  }

  .report-item {
    padding: 10px;
    /*border-bottom: 1px solid #ccc;*/
    color: mediumseagreen;
    /*font-size: .75rem;*/
  }

  .report-item.muted {
    color: #aaa;
  }

  .title {
    background: mediumseagreen;
    color: #fff;
    padding: 10px;
    text-align: center;
  }
</style>
