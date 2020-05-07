<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, index) of menuList" :key="index">
                  <li v-for="(sub, subIndex) of item" :key="subIndex">
                    <a :href="sub ? '/#/product/' + sub.id: ''">
                      <img :src="sub? sub.img : '/imgs/item-box-1.png'" />
                      {{sub ? sub.name : '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) of slideList" :key="index">
            <a :href="'/#/product/' + item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item, index) of adsList" :key="index">
          <img :src="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="/imgs/banner-1.png" />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img src="/imgs/mix-alpha.jpg" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) of phoneList" :key="i">
              <div class="item" v-for="(item, j) of arr" :key="j">
                <span v-bind="{'new-pro': j%2 === 0}">新品</span>
                <div class="item-img">
                  <img :src="item.mainImage" />
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subTitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      btnType="1"
      sureText="查看购物车"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal= false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from '../components/ServiceBar';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Modal from '../components/Modal';
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg'
        },
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          }, {
            id: 31,
            img: 'imgs/item-box-2.png',
            name: '小米8青春版'
          }, {
            id: 32,
            img: 'imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro'
          }, {
            id: 33,
            img: 'imgs/item-box-4.jpg',
            name: '移动4G专区'
          }
        ],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 33,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 33,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 33,
          img: '/imgs/ads/ads-4.jpg'
        }],
      phoneList: [
      ],
      showModal: false
    }
  },
  mounted () {
    this.init();//加载商品列表
  },
  methods: {
    //获取商品,通过接口文档
    init () {
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      }).then((res) => {
        res.list = res.list.slice(6, 14);//从第六条数据开始分割
        this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];//会改变原数组,每个数组有四个元素
      });
    },
    addCart (id) {
      this.showModal = true;
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then((res) => {
        this.showModal = true;
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
      }).catch((errMsg) => {
        this.showModal = true;
      });
    },
    goToCart () {
      this.$router.push("/cart");
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/base.styl';
@import '../assets/stylus/mixin.styl';
@import '../assets/stylus/config.styl';

.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      padding: 26px 0;
      background-color: rgba(85, 88, 90, 0.478);
      box-sizing: border-box;
      z-index: 9;

      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          a {
            font-size: 16px;
            color: white;
            padding-left: 30px;
            position: relative;
            display: block;

            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: '';
              bgImg(10px, 15px, '/imgs/icon-arrow.png');
            }
          }

          &:hover {
            background-color: $colorA;

            .children {
              display: block;//
            }
          }

          .children {
            display: none;
            width: 962px;
            height: 449px;
            position: absolute;
            top: 0px;
            left: 264px;
            background-color: $colorG;
            border: 1px solid $colorH;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;

              li {
                height: 75px;
                line-height: 75px;
                width: 24%;
                padding-left: 23px;

                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;//字体居中
                  margin-right: 15px;//与字体的距离
                }

                a {
                  color: $colorB;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }

    .swiper-container {
      height: 451px;

      img {
        width: 100%;
      }

      .swiper-button-prev {
        left: 274px;
      }
    }
  }

  .ads-box {
    setFlex();
    margin-top: 14px;
    margin-bottom: 31px;

    a {
      width: 296px;
      height: 167px;
    }
  }

  .banner {
    margin-bottom: 50px;
  }

  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px 0;
    // 设置手机字体
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }

    .wrapper {
      display: flex;//弹性布局，使得两个盒子左右分开

      .banner-left {
        margin-right: 16px;//与listbox的距离

        img {
          width: 224px;
          height: 619px;
        }
      }

      .list-box {
        .list {
          setFlex();
          width: 986px;
          margin-bottom: 14px;//每行与上一行的距离

          &:last-child {
            margin-bottom: 0px;//最后一个不需要
          }
            //每一个产品盒子设置
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            // 设置新品字体样式
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: $colorG;

              &.new-pro {
                background-color: #7ecf68;
              }

              &.kill-pro {
                background-color: #e82626;
              }
            }
            //设置产品图片大小
            .item-img {
              img {
                height: 195px;
                width: 100%;
              }
            }
            //设置产品字体大小
            .item-info {
              h3 {
                color: $colorB;
                font-size: $fontJ;
                line-height: 14px;//用行高做间距
                font-weight: bold;
              }
              //设置价格文字
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }

              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                //伪类加图标
                &:after {
                  content: ' ';
                  bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  margin-left: 5px;
                  vertical-align: middle;//设置居中
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
