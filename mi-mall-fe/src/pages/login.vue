<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>
              密记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
    
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      userId: ''
    };
  },
  methods: {
    ...mapActions(['saveUserName']),
    login () {
      let { username, password } = this;
      this.axios.post('/user/login', {
        username,
        password
      }).then((res) => {
        this.$cookie.set('userId', res.id, { expires: 'Session' });
        this.saveUserName(res.username);
        this.$router.push("/index");
        this.axios.get('/carts/products/sum').then((res) => {
          this.$store.dispatch('saveCartCount', res);
        });
      });
    },
    register () {
      this.axios.post('/user/register', {
        username: 'parabola',
        passowrd: 'q19880324',
        email: 'huangsongxiang@wzpbc.com'
      }).then((res) => {
        Message.success('注册成功');
      }).catch(res => {
        console.log(res);
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/base.styl';
@import '../assets/stylus/mixin.styl';
@import '../assets/stylus/config.styl';

.login {
  &>.container {
    height: 113px;

    img {
      width: auto;
      height: 100%;
    }
  }

  .wrapper {
    bgImg(100%, 100%, '/imgs/login-bg.jpg', auto);

    .container {
      height: 576px;

      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: white;
        position: absolute;
        bottom: 29px;
        right: 0;

        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;

          .checked {
            color: $colorA;
          }

          .sep-line {
            margin: 0 32px;
          }
        }

        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid $colorH;
          margin-bottom: 20px;

          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }

        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }

        .tips {
          margin-top: 14px;
          font-size: 14px;
          cursor: pointer;
          setFlex();

          .sms {
            color: $colorA;
          }

          .reg {
            color: $colorD;

            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }

  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;

    .footer-link {
      a {
        color: $colorD;
        display: inline-block;
      }

      span {
        margin: 0 10px;
      }
    }

    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
