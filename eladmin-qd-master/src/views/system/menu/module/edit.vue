<template>
  <div>
    <el-button v-if="isEdit" size="mini" type="success" @click="to">编辑</el-button>
    <el-button v-else size="mini" type="success" @click="to">新增</el-button>
    <eForm ref="form" :menus="menus" :sup_this="sup_this" :is-add="!isEdit"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      var iframe = this.data.iframe ? this.data.iframe.toString() : ''
      var isMenu = this.data.isMenu ? this.data.isMenu.toString() : ''
      if (this.isEdit) {
        _this.form = { name: this.data.name, pid: this.data.pid, roles: [], icon: this.data.icon }
      } else {
        _this.form = { pid: this.data.id }
      }
      _this.form = { component: this.data.component, sort: this.data.sort, pid: this.data.id, path: this.data.path, iframe: iframe, isMenu: isMenu }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
