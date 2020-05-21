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
  this.getUser();
  this.getCartCount();
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={}) => {
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0) => {
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="stylus">
@import'./assets/stylus/reset.styl'
</style>
