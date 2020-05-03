<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'
export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{

    }
  },
  mounted(){
    // storage.setItem();
    // storage.setItem('user',{a:1});
    // storage.setItem('abc',{a:1},'user');
    // storage.clear('a',1);
  //   this.axios.get('/user/login')
  //     .then((res) => {
  //       this.res = res;
  //     });
  }
}
</script>

<style lang="stylus">
@import'./assets/stylus/reset.styl'
</style>
