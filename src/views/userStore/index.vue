<template>
  <div class="user-store flex justify-center align-center flex-direction">
    <h1 class="block h1">如何使用store</h1>
    <h2 class="map-state h2">使用mapState: <span>{{ `登录名：${this.userName1}密码：${this.passWord1}` }}</span></h2>
    <h2 class="map-getters h2">使用mapGetters: <span>{{ `登录名：${this.userName2}密码：${this.passWord2}` }}</span></h2>
  </div>
</template>

<script>
import { mapState, mapGetters} from 'vuex'
export default {
  name: 'UserStore',
  data() {
    return {}
  },
  computed:{
    ...mapState('userStore', {
      userName1: 'userName',
      passWord1: 'passWord'
    }),
    ...mapGetters('userStore', {
      userName2: 'userName',
      passWord2: 'passWord'
    })
  },
  methods:{}
}
</script>
<style lang="scss" scoped>
.user-store{
  .h1{
    font-size: 18px;
    line-height: 16px;
    padding: 5px 0;
  }
  .h2{
    font-size: 16px;
    line-height: 14px;
    padding: 5px 0;
  }
}
</style>
