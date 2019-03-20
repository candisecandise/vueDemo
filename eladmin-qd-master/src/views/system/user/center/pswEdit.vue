<template>
  <div style="display: inline-block">
    <el-button v-if="isBtn" size="mini" class="button" type="success" @click="toPsw">修改</el-button>
    <span v-else style="display:block;" @click="toPsw">修改密码</span>
    <pswForm ref="pswForm"/>
  </div>
</template>

<script>
import pswForm from '@/views/system/user/center/pswForm'
export default {
  components: {
    pswForm
  },
  props: {
    isBtn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toPsw() {
      this.$refs.pswForm.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
