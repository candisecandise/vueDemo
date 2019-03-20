<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :roles="roles" :sup_this="sup_this" :is-add="false" :is-person="isPerson"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    roles: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    isPerson: {
      type: Boolean,
      required: true
    },
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      // this.$refs.form 调用子组件实例
      // this.data 当前行传递过来的data
      const _this = this.$refs.form
      _this.roleIds = []
      _this.form = { id: this.data.id, username: this.data.username, email: this.data.email, enabled: this.data.enabled.toString(), roles: [],
        period: this.data.period, phone: this.data.phone, remark: this.data.remark, lastIp: this.data.lastIp, lastTime: this.data.lastTime, createTime: this.data.createTime }
      // 将 rolesid 填入form  表单中
      this.data.roles.forEach(function(data, index) {
        _this.roleIds.push(data.id)
      })
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
