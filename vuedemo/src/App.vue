<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { dynamicRouter } from '@/router/index'
import { getToken } from '@/utils/auth' // getToken from cookie
import store from '@/store'
export default {
  name: 'App',
  components: {},
  created() {
    // this.judgeLogin();
  },
  methods: {
    judgeLogin() {
      // let isLogin = store.state.token.name;
      const isLogin = getToken()
      console.log(store.state.token)
      if (!isLogin) {
        return this.$router.push('/login')
      } else {
        const dR = []
        for (let i = 0; i < dynamicRouter.length; i++) {
          for (let j = 0; j < dynamicRouter[i].meta.roles.length; j++) {
            if (dynamicRouter[i].meta.roles[j] === isLogin) {
              dR.push(dynamicRouter[i])
            }
          }
        }
        this.$router.addRoutes(dR)
      }
    }
  }
}
</script>

<style>
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  height: 100%;
}
</style>
