<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
     
    </div>
    <div class="cotyright">Cpoyright 2019</div>
  </div>
</template>
<script>
export default {
  name: 'nav-footer'
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/config.styl';

.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: #333333;
  color: #999;
  font-size: $fontI;
  text-align: center;

  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;

    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }

  .footer-link {
    a {
      color: #999999;
      display: inline-block;
    }

    span {
      margin: 0 10px;
    }

    margin-bottom: 13px;
  }

  .copyright {
  }
}
</style>
