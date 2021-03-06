<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，不解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <loading v-if="loading"></loading>
        <div class="order-box" v-else>
          <div class="order" v-for="(order, index) of list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item, i) of order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">item.productName</div>
                    <div class="p-money">{{item.totalPrice}} * {{item.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
        </div>
        <no-data v-if="loading == false && list.length == 0"></no-data>
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>
        <!-- <div v-show="false" class="load-more" v-if="showNextPage">
          <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
        </div>
        <div
          v-show="false"
          class="scroll-more"
          v-infinite-scroll="scrollMore"
          infinite-scroll-disabled="true"
          infinite-scroll-distance="410"
        >
          <img v-show="loading" src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import { Pagination, Button } from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll';
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  directives: {
    infiniteScroll
  },
  data () {
    return {
      list: [],
      loading: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      busy: false,//滚动加载是滞触发
      showNextPage: true
    };
  },
  mounted () {
    this.getOrderList();
  },
  methods: {
    getOrderList () {
      this.loading = true;
      this.axios.get('/orders', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then((res) => {
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
        this.showNextPage = res.hasNextPage;
      }).catch((errMsg) => {
        this.loading = false;
      });
    },
    goPay (orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      });
    },

    //分页器分页
    handlePageChange (pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    //加载更多按钮
    loadMore () {
      this.pageNum++;
      this.getOrderList();
    },
    //滚动加载
    scrollMore () {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 500);
    },
    //专门组scroll-more使用
    getList () {
      this.loading = true;
      this.axios.get('/orders/', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then((res) => {
        this.list = this.list.concat(res.list);
        this.loading = false;
        if(res.hasNextPage){
          this.busy = false;
        } else {
          this.busy = true;
        }
      });
    }
  }
}
 </script>

<style lang="stylus" scoped>
@import '../assets/stylus/base.styl';
@import '../assets/stylus/config.styl';
@import '../assets/stylus/mixin.styl';

.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;

    .order-box {
      .order {
        setBorder();
        background-color: $colorG;
        margin-bottom: 31px;

        &:last-child {
          margin-bottom: 0;
        }

        .order-title {
          setHeight(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;

          .item-info {
            span {
              margin: 0 9px;
            }
          }
        }

        .order-content {
          padding: 0 43px;

          .good-box {
            width: 88%;

            .good-list {
              display: flex;
              align-items: center;
              height: 145px;

              .good-img {
                width: 112px;

                img {
                  width: 100%;
                }
              }

              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }

          .good-state {
            setHeight(145px);
            font-size: 20px;
            color: $colorA;

            a {
              color: $colorA;
            }
          }
        }
      }
    }

    .pagination {
      text-align: right;
    }

    >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #ff6600;
      color: #fff;
    }

    .load-more {
      text-align: center;
      margin-top: 20px;

      >>> .el-button--primary {
        background-color: #ff6600;
        color: #fff;
        border-color: #ff6600;
      }
    }

    .scroll-more {
      text-align: center;
    }
  }
}
</style>
