<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :menus="menus"/>
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
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      const val = this.data
      // menuids: this.menuids 到时候把data字段改了，可以改成直接从data获取
      _this.form = { id: this.data.id, name: this.data.name, remark: this.data.remark, menuIds: [] }
      val.menus.forEach(function(data, index) {
        let add = true
        // 去除父菜单，menuid 只需要加入子菜单
        for (let i = 0; i < val.menus.length; i++) {
          if (data.id === val.menus[i].pid) {
            add = false
            break
          }
        }
        if (add) {
          _this.form.menuIds.push(data.id)
        }
      })
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
