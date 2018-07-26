<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <SearchBar/>
      </div>
    </div>
    <div>
      <div class="container">
        <div style="padding-top: 5px; padding-bottom: 5px;" class="  bg-white">
          <div class="col-lg-6">
            <div class="slider">
              <img :src="detail.preview ? detail.preview[selected_preview].url :
            'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88'"
                   alt="">
            </div>
            <div class="row thumbnail-list">
              <div @click="selected_preview = i" v-for="(pre, i) in detail.preview" class="col-lg-3">
                <img :src="pre.url" alt="pre.name">
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-panel">
            <h1 class="title">{{detail.title}}</h1>
            <div class="well">
              <div class="row">
                <div class="col-lg-3 prop">报价</div>
                <div class="col-lg-9">
                  <span class="price currency">{{detail.price}}万</span>
                  <span class="price currency">含税{{detail.price}}万</span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3 prop">服务费</div>
                <div class="col-lg-9">
                  <span class="price currency">3000</span>
                  <span class="help"></span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3 prop">服务项</div>
                <div class="col-lg-9">
                  <span>整车质保</span>
                  <span>14天可退</span>
                  <span>249项车况检测</span>
                </div>
              </div>
            </div>
            <div class="short-props">
              <div class="dib">
                <div class="prop">上牌时间</div>
                <div class="value">{{detail.birth_day | only_day }}</div>
              </div>
              <div class="dib">
                <div class="prop">公里数</div>
                <div class="value">{{detail.consumed_distance || 0}}万公里</div>
              </div>
              <div class="dib">
                <div class="prop">外迁查询</div>
                <div class="value">国五</div>
              </div>
              <div class="dib">
                <div class="prop">排量</div>
                <div class="value">1.6L</div>
              </div>
            </div>
            <div v-if="!appointed_appo" class="action">
              <div v-if="!show_appo">
                <button @click="show_appo=true" class="btn btn-primary">预约看车</button>
                &nbsp;<span class="tel">400-080-5027</span>
              </div>
              <form v-if="show_appo" @submit="submit_appo">
                <div class="input-control">
                  <label for="appointed_at">预约时间</label>
                  <input v-validator="'required'" id="appointed_at" type="date" v-model="appo.appointed_at">
                </div>
                <div class="input-control btn-group">
                  <button type="submit" class="btn-primary">预约</button>
                  <button type="button" @click="show_appo=false">取消</button>
                </div>
              </form>
            </div>
            <div v-else>
              <button class="btn btn-primary" disabled>已预约</button>
              <p>
                预约时间：{{appointed_appo.appointed_at}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vehicle-detail bg-white">
      <div class="container">
        <h2>车辆详情</h2>
        <div class="row">
          <div class="col-lg-6">
            <ReportPanel title="排除重大事故检测"
                         cat="major_accident"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-6">
            <ReportPanel title="泡水火烧检测"
                         cat="soaking_and_roasting"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <ReportPanel title="轻微碰撞检测"
                         cat="minor_crash"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <ReportPanel title="易损耗部件检测"
                         cat="consumable"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-2">
            <ReportPanel title="安全系统检测"
                         cat="security_system"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-2">
            <ReportPanel title="外部配置检测"
                         cat="surface_peripheral"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-2">
            <ReportPanel title="内部配置检测"
                         cat="inner_peripheral"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-2">
            <ReportPanel title="灯光系统检测"
                         cat="lighting_system"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-2">
            <ReportPanel title="高科技配置检测"
                         cat="high_tech"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
          <div class="col-lg-2">
            <ReportPanel title="随车工具检测"
                         cat="tool"
                         :reportStructure="report_structure"
                         :report="report"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 dashed">
            <div class="sub-title">合作认证车辆介绍</div>
            <div class="info">
              这辆车是2015年8月首次上牌，到现在已经行驶了1.86万公里。车子平时开得不多，在我的精心呵护下，无论驾驶质感还是内饰氛围都和新车相差无几。最满意的一点当然是油耗了，其次是空间，动力我也觉得够用。这是我买的新车，纯个人一手车。每天开车前都会认真检查一下车辆，开的也是四平八稳。我对车还是比较温柔的，用车频率不是很高，总里程很少，车况一直很好，和新车也没差什么，没有遇到过什么烦人的毛病，很省心，这对我来说就足够了。好车不容错过，赶紧联系我看车吧！
            </div>
          </div>
          <div class="col-lg-6">
            <div class="sub-title">车辆手续信息</div>
            <div class="col-lg-6">
              <table>
                <tbody>
                <tr>
                  <td>年检到期时间</td>
                  <td>2019-08</td>
                </tr>
                <tr>
                  <td>商业险到期时间</td>
                  <td>2019-08</td>
                </tr>
                <tr>
                  <td>有无购车发票</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>是否4S店保养</td>
                  <td>否</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-6">
              <table>
                <tbody>
                <tr>
                  <td>交强险到期时间</td>
                  <td>2019-08</td>
                </tr>
                <tr>
                  <td>过户次数</td>
                  <td>0次</td>
                </tr>
                <tr>
                  <td>车辆购置税完税证明</td>
                  <td>无</td>
                </tr>
                <tr>
                  <td>有无改装</td>
                  <td>无</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="preview">
          <div class="title"></div>
          <div class="desc"></div>
          <div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Nav         from '../component/Nav';
  import Footer      from '../component/Footer';
  import ReportPanel from '../component/ReportPanel';
  import SearchBar   from '../component/SearchBar';

  import api     from '../lib/api';
  import session from '../lib/session';

  export default {
    mounted () {
      let id = this.get_id();

      this.find(id);
      this.find_report_by_vehicle(id);
      this.get_report_structure();
      this.prepare_appo_row();
      this.has_appointed();
    },
    data () {
      return {
        show_appo        : false,
        appo             : {},
        appointed_appo   : {},
        selected_preview : 0,
        detail           : {},
        report           : {},
        report_structure : {},
      };
    },
    methods    : {
      submit_appo (e) {
        e.preventDefault();

        let row = this.appo;

        api('appo/create', row)
          .then(r => {
            this.has_appointed();
          });
      },
      find (id) {
        api('vehicle/find', { id })
          .then(r => this.detail = r.data);
      },

      find_report_by_vehicle (vid) {
        api('report/first', {
          where : { vehicle_id : vid },
        }).then(r => {
          this.report = r.data;
        });
      },

      get_report_structure () {
        api('MODEL/FIND', { name : 'report' })
          .then(r => {
            this.report_structure = r.data.structure;
          });
      },

      prepare_appo_row () {
        this.appo.vehicle_id = this.get_id();
        this.appo.user_id    = session.uinfo().id;
      },

      has_appointed () {
        let row        = this.appo;
        let user_query = '';

        if (row.user_id)
          user_query = `and "user_id" = ${row.user_id}`;

        let query = `where("vehicle_id" = ${row.vehicle_id} ${user_query})`;

        api('appo/read', { query })
          .then(r => {
            this.appointed_appo = r.data[ 0 ];
          });

      },

      get_id () {
        return this.$route.params.id;
      },
    },
    components : {
      Nav,
      SearchBar,
      ReportPanel,
      Footer,
    },
  };
</script>

<style scoped>
  h2 {
    margin: 0;
    padding: 20px 0;
    text-align: center;
    font-weight: normal;
    border-bottom: 1px dashed #ddd;
  }

  .sub-title {
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .search-bar {
    width: 40%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .info {
  }

  /*.order-panel {*/
  /*font-size: .9rem;*/
  /*}*/

  .well .prop {
    font-size: .9rem;
    color: #666;
  }

  .well > .row {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .short-props > .dib {
    padding: 10px;
  }

  .short-props > .dib > * {
    margin-bottom: 5px;
  }

  .short-props .prop {
    font-size: .7rem;
    color: #888;
  }

  .action > * {
    margin-right: 10px;
  }

  .thumbnail-list {
    overflow: auto;
    white-space: nowrap;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .vehicle-detail {
    margin-top: 20px;
  }

  .vehicle-detail .container > .row {
    margin-bottom: 10px;
  }

  .dashed {
    margin-top: 10px;
    border-right: 1px dashed #ddd;
  }
</style>
