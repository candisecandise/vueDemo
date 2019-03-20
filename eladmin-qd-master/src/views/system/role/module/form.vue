<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="授权" prop="menus">
        <div :style="'min-height:100px;max-height: 250px;overflow-y: auto;margin:5px 0'">
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="form.menuIds"
            :default-expand-all="true"
            :props="defaultProps"
            show-checkbox
            node-key="id"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="描述">
        <el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/role'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: false, dialog: false,
      form: { name: '', menuIds: [], remark: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      console.log('form')
      console.log(this.form.name)
      // 得到半选的父节点数据，保存起来
      const _this = this.form
      console.log(_this)
      _this.menuIds = []
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        const permission = { id: data.id }
        console.log(permission)
        _this.menuIds.push(data.id)
      })
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data }
        console.log(permission)
        _this.menuIds.push(data)
      })
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true

          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', menuIds: [], remark: '' }
    }
  }
}
</script>

<style scoped>

</style>
