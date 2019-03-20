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
      if (this.isEdit) {
        _this.form = { id: this.data.id, component: this.data.component, name: this.data.name, sort: this.data.sort, pid: this.data.pid, path: this.data.path, roles: [], icon: this.data.icon, iframe: this.data.iframe.toString(), isMenu: this.data.isMenu.toString() }
      } else {
        _this.form = { component: this.data.component, sort: this.data.sort, pid: this.data.id, path: this.data.path, iframe: this.data.iframe.toString(), isMenu: this.data.isMenu.toString() }
      }

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
