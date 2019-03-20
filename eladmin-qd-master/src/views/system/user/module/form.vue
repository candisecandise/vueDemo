<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="!isPerson" label="用户状态" prop="enabled">
        <el-radio v-model="form.enabled" label="true">正常</el-radio>
        <el-radio v-model="form.enabled" label="false" >锁定</el-radio>
      </el-form-item>
      <el-form-item v-if="!isPerson" label="用户角色">
        <treeselect v-model="roleIds" :multiple="true" :options="roles" style="width: 370px;" placeholder="请选择角色" />
      </el-form-item>
      <el-form-item label="密码有效期" prop="period">
        <el-input v-model="form.period" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="用户描述" prop="remark">
        <el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea"/>
      </el-form-item>
      <el-form-item v-if="!isAdd && !isPerson" label="最后登录ip" prop="lastIp">
        <span>{{ form.lastIp }}</span>
      </el-form-item>
      <el-form-item v-if="!isAdd && !isPerson" label="最后登录时间" prop="lastTime">
        <span>{{ parseTime(form.lastTime) }}</span>
      </el-form-item>
      <el-form-item v-if="!isAdd && !isPerson" label="创建时间" prop="createTime">
        <span>{{ parseTime(form.createTime) }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/user'
import Treeselect from '@riophae/vue-treeselect'
import { parseTime } from '@/utils/index'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Form',
  components: { Treeselect },
  props: {
    roles: {
      type: Array,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    isPerson: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // rolesIds 用户选中的rolesIds，form.roles 提交的字段
      dialog: false, loading: false, form: { username: '', enabled: 'true', roles: [], period: '', phone: '', email: '', remark: '', lastIp: '', lastTime: '', createTime: '' }, roleIds: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    parseTime,
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.roles = []
          const _this = this
          this.roleIds.forEach(function(data, index) {
            const role = { id: data }
            _this.form.roles.push(role)
          })
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
          message: '默认密码：123456',
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
      this.roleIds = []
      this.form = { username: '', enabled: 'false', roles: [] }
    }
  }
}
</script>

<style scoped>

</style>
