<template>
  <transition name="slide">
      <!-- 购物车弹出动画 -->
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
          <!-- 标题 -->
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- 设置按钮 -->
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType === '1'" v-on:click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType === '2'" v-on:click="$emit('cancel')">{{cancelText}}</a>
          
          <div class="btn-group" v-if="btnType === '3'">
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'modal',
  props: {
    //弹框类型，小 small、中 middle、大 large、表单form
    modalType: {
      type: String,
      default: 'form'
    },
    //弹框标题
    title: String,
    //按钮类型 1:确定按钮，2：取消按钮，3：确定取消
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: Boolean
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/config.styl'
@import '../assets/stylus/mixin.styl'
@import '../assets/stylus/modal.styl'
</style>