<template>
  <div class="app-container">
    <div id="content-main" style="width:600px;">
      <el-card shadow="never" class="box-card user-info">
        <span class="account-label-icon">基本信息：</span>
        <edit :data="myData" :roles="roles" :sup_this="sup_this" :is-person="true"/>

        <ul class="user-info-content">
          <li><span>用户名：</span>{{ myData.username }}</li>
          <li><span>用户状态：</span>{{ myData.enabled?"正常":"锁定" }}</li>
          <li><span>用户角色：</span><span v-for="(item,index) in myData.roles" :key="index" style="display:inline-block">{{ item.name }}</span></li>
          <li><span>密码有效期：</span>{{ myData.period }}</li>
          <li><span>手机：</span>{{ myData.phone }}</li>
          <li><span>邮箱：</span>{{ myData.email }}</li>
          <li><span>用户描述：</span>{{ myData.remark }}</li>
          <li><span>最后登录ip：</span>{{ myData.lastIp }}</li>
          <li><span>最后登录时间：</span>{{ myData.lastTime }}</li>
          <li><span>注册时间：</span>{{ myData.createTime }}</li>
        </ul>
      </el-card>

      <el-card shadow="never" class="box-card reset-pass">
        <span class="account-label-icon">登录密码：</span>
        <pswEdit :is-btn="isBtn"/>
        <p>安全性高的密码可使账号更安全，建议设置同时包含字母，数字，符号的密码。</p>
      </el-card>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import pswEdit from './center/pswEdit'
import initData from '@/mixins/initData2'
import { parseTime } from '@/utils/index'
import edit from '@/views/system/user/module/edit'
export default {
  name: 'Center',
  components: { pswEdit, edit },
  mixins: [initData],
  data() {
    return {
      isBtn: true,
      roles: [{ id: 1 }], sup_this: this,
      myData: { enabled: true, roles: [{ id: 1 }] }

    }
  },
  async created() {
    await this.init()
    console.log(this.data)
    this.myData = this.data[0]
    this.$nextTick(() => {

    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/users'
      // 先注释
      this.params = {}
      return true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .box-card{border:0;border-bottom:1px solid #ECEDFE;border-radius:unset;
  // h4{height:26px;margin:0 0 7px;line-height:26px;font-size:1.1rem;font-weight:500;color:#444242;display:inline-block}
  p{font-family:Lantinghei;font-size:90%;color:#747474}
  ul{padding:0;margin:7px 0 0;list-style:none}
  li{font-size: 100%; margin:20px 0!important;color:#747474 ;span{display:inline-block;text-align:right;}}

  content:'';box-sizing:border-box}
  // .user-info-content{float:left}
  .user-info-content{font-family:Lantinghei;position:relative;font-size:14px;div{margin:15px 0}}
</style>
