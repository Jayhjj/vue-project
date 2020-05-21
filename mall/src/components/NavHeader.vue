<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <template v-if="this.username">
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="javascript:;" v-if="username" @click="login">登入</a>
            <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart">购物车{{cartCount}}</span></a>
          </template>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item of phoneList" :key="item.id">
                  <a v-bind:href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'nav-header',
  data () {
    return {
      username:this.$store.state.username,
      phoneList: []
    };
  },
  filters: {
    currency (val) {
      if (!val) {
        return '0.00';
      }
      return '￥' + val.toFixed(2) + '元';
    }
  },
  computed: {
    // username () {
    //   return this.$store.state.username;
    // },
    // cartCount () {
    //   return this.$store.state.cartCount;
    // },
    ...mapState(['username', 'cartCount'])
  },
  mounted () {
    this.getProductList();
  },
  methods: {
    // login () {
    //   this.$router.push('/login');
    // },
    getProductList () {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then((res) => {
        this.phoneList = res.list;
      })
    },
    // logout () {
    //   this.axios.post('/user/logout').then(() => {
    //     this.$message.success('退出成功');
    //     this.$store.dispatch('saveUserName', '');
    //     this.$store.dispatch('saveCartCount', 0);
    //     this.$cookie.set('userId', {}, {expires: -1});
    //   });
    // },
    // goToCart () {
    //   this.$router.push('/cart');
    // },
    // goToOrder(){
    //   this.$router.push('/order/list');
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/base.styl';
@import '../assets/stylus/mixin.styl';
@import '../assets/stylus/config.styl';

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;

    .container {
      setFlex();

      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }

      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;

        .icon-cart {
          bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
        }
      }
    }
  }

  .nav-header {
    .container {
      position: relative;
      height: 112px;
      setFlex();

      .header-menu {
        display: inline-block;
        padding-left: 209px;
        width: 654px;

        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;

          span {
            cursor: pointer;
          }

          &:hover {
            color: $colorA;

            .children {
              height: 200px;
              opacity: 1;
            }
          }

          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            padding-top: 20px;
            transition: all 0.5s;
            background-color: white;

            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 200px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;

              a {
                display: inline-block;
              }

              img {
                width: auto;
                height: 111px;
              }

              .pro-img {
                height: 112px;
              }

              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }

              .pro-price {
                color: $colorA;
              }

              &:before {
                content: ' ';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }

              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }

      .header-search {
        width: 319px;

        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;

          input {
            border: none;
            border-right: 1px solid #e0e0e0;
            borderbox: border-box;
            width: 254px;
            height: 50px;
            padding-left: 14px;
          }

          a {
            bgImg(18px, 18px, '/imgs/icon-search.png');
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>
