<template>
  <div class="login">
    <div class="wrap" :class="qrActive?'wrap-qr-active':'wrap-input-active'">
      <!-- 左上角小图标切换 -->
      <div class="switch-btn" @click="changeTab">
        <i class="iconfont-light" v-show="!downIcon">&#60314;</i>
        <i class="iconfont-bold" v-show="downIcon">&#60475;</i>
      </div>
      <!-- 输入 -->
      <div class="login-content input-content">
        <h1 class="login-title">后台监控管理系统</h1>
        <div class="switch-tab">
          <div class="login-inputall">
            <div class="login-imgmin">
              <i class="iconfont-light">&#60314;</i>
            </div>
            <!-- 工号 -->
            <div class="login-input">
              <input
                type="text"
                name="username"
                required="required"
                v-model="username"
                @focus="numbFocus()"
                @blur="inputOnBlur()"
                :class="tipUsr !== null ? 'warning': ''"
              />
              <label>工号</label>
              <span class="tips">{{ tipUsr }}</span>
            </div>
            <!-- 密码 -->
            <div class="login-input">
              <input
                type="password"
                name="pwd"
                required="required"
                v-model="pwd"
                @focus="pwdFocus()"
                @blur="inputOnBlur()"
                :class="tipPwd !== null ? 'warning': ''"
              />
              <label>密码</label>
              <span class="tips">{{ tipPwd }}</span>
            </div>
            <!-- 底下跳转 -->
            <div class="login-but">
              <router-link to="/register">
                <div class="login-link">
                  <i class="iconfont-light icon">&#59845;</i>
                  申请权限
                </div>
              </router-link>
              <router-link to="/resetpwd" target="_blank">
                <div class="login-link">
                  <i class="iconfont-light icon">&#60666;</i>
                  <br />忘记密码
                </div>
              </router-link>
              <a>
                <div class="login-link special" @click="loginTo()">
                  login
                  <i class="iconfont-light icon">&#59844;</i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="login-content qr-content">
        <h1 class="login-title">后台监控管理系统</h1>
        <div class="switch-tab">
          <div class="QRcon">
            <!-- <img src="../assets/svgs" /> -->
          </div>
        </div>
      </div>
      <div class="bgicon">
        <img src="../assets/svgs/gear.svg" :class="bgicon===0?'gear-show':'gear-hidden'" />
        <img src="../assets/svgs/user.svg" :class="bgicon===1?'user-show':'user-hidden'" />
        <img src="../assets/svgs/lock.svg" :class="bgicon===2?'lock-show':'lock-hidden'" />
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from "@/api/Login.js";

export default {
  name: 'login',
  data() {
    return {
      // icons: [
      //   // eslint-disable-next-line global-require
      //   require('../assets/svgs/gear.svg'),
      //   // eslint-disable-next-line global-require
      //   require('../assets/svgs/user.svg'),
      //   // eslint-disable-next-line global-require
      //   require('../assets/svgs/lock.svg'),
      // ],
      bgicon: 0,
      downIcon: true,
      username: '', // 工号
      pwd: '', // 密码
      tipUsr: null, // 工号不对时提示
      tipPwd: null,
      qrActive: false,
    };
  },

  methods: {
    inputOnBlur() {
      this.bgicon = 0;
    },
    numbFocus() {
      this.tipUsr = null;
      this.bgicon = 1;
    },
    pwdFocus() {
      this.tipPwd = null;
      this.bgicon = 2;
    },
    changeTab() {
      this.downIcon = !this.downIcon;
      this.qrActive = !this.qrActive;
    },
    encodePwd(pwd) {
      // 对字符串进行编码
      const encode = encodeURI(pwd);
      // 对编码的字符串转化base64
      const base64 = window.btoa(encode);
      return base64;
    },
    // 底下跳转按钮
    loginTo() {
      window.cookieStore.set(
        'uinoSystemUserInfo',
        JSON.stringify({
          user: 'test',
          authority: 'test',
        }),
      );
      this.$router.push('/system/meters');

      // if (this.username && this.pwd) {
      //   let postPwd = this.encodePwd(this.pwd);
      //   login({ usr: this.username, pwd: postPwd }).then((res) => {
      //     if (res.data.code === 200) {
      //       let saveData = JSON.stringify(res.data.data);
      //       window.cookieStore.set("uinoSystemUserInfo", saveData);
      //       this.$router.push("/system/meters");
      //     } else {
      //       if (res.data.code === 401) {
      //         let patternUsr = /用户名不正确$/;
      //         let patternPwd = /密码不正确$/;
      //         if (patternUsr.test(res.data.message)) {
      //           this.tipUsr = "用户名错误";
      //         }
      //         if (patternPwd.test(res.data.message)) {
      //           this.tipPwd = "密码错误";
      //         }
      //       } else {
      //         this.tipUsr = "";
      //         this.tipPwd = "";
      //       }
      //     }
      //   });
      // } else {
      //   this.tipUsr = "工号不能为空";
      //   this.tipPwd = "密码不能为空";
      // }
    },
  },
  mounted() {
    window.cookieStore.set('uinoSystemUserInfo', null);
  },
};
</script>

<style lang="scss" scopted>
$rotate-time: 0.7s;

@keyframes rotateBG {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login {
  width: 100%;
  min-width: 1280px;
  height: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  perspective-origin: center;
  -webkit-perspective-origin: center;
  transform-style: preserve-3d;
  &::before {
    content: "";
    width: 100%;
    height: 2.4rem;
    background: #0c79f8;
    position: fixed;
    top: 0px;
    left: 50%;
    transform-origin: 0 0;
    transform: translate(-50%, -50%);
    border-radius: 100%;
  }
  &::after {
    content: "";
    width: 100%;
    height: 2.4rem;
    background: #0c79f8;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform-origin: 0 0;
    transform: translate(-50%, 50%);
    border-radius: 100%;
  }
}

.wrap {
  position: relative;
  z-index: 0;
  transition: all 0.3s;
  perspective-origin: center;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: center;
  transform-style: preserve-3d;
  /* 用户小图标 */
  .switch-btn {
    position: absolute;
    top: 0;
    z-index: 19;
    background: #fff;
    cursor: pointer;
    height: 15rem;
    width: 10rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    user-select: none;
    transition: all $rotate-time;
  }
  .switch-btn > i {
    font-size: 4rem;
    color: #0c79f8;
  }
  .bgicon {
    width: 48rem;
    height: 48rem;
    position: absolute;
    top: 50%;
    z-index: 19;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all $rotate-time;
  }
  .bgicon img {
    position: absolute;
    width: 100%;
    left: -50%;
    transition: all 0.4s;
  }
  img.gear-show {
    left: 0%;
    animation: 16s rotateBG linear infinite;
  }
  img.gear-hidden {
    opacity: 0;
  }
  img.user-show {
    left: 0%;
  }
  img.user-hidden {
    opacity: 0;
  }
  img.lock-show {
    left: 0%;
  }
  img.lock-hidden {
    opacity: 0;
  }
}
.wrap-input-active {
  transform: translate3d(0, 0, 100px) scale(1) rotateY(0deg);

  .input-content {
    transform: translate3d(0, 0, 100px) scale(0.8);
  }
  .qr-content {
    transform: translate3d(0, 0, -50px) rotateY(180deg);
  }
  .switch-btn {
    left: 0;
    transform: translate3d(-60%, 30%, 0);
    justify-content: flex-start;
  }
  .bgicon {
    left: 50%;
    transform: translate3d(0, -50%, 0);
  }
}
.wrap-qr-active {
  transform: translate3d(0, 0, 100px) scale(1) rotateY(180deg);

  .input-content {
    transform: translate3d(0, 0, 50px) scale(0.8);
  }
  .qr-content {
    transform: translate3d(0, 0, -100px) rotateY(180deg);
  }
  .switch-btn {
    left: 100%;
    transform: translate3d(-40%, 30%, 0);
    justify-content: flex-end;
  }
  .bgicon {
    left: -50%;
    transform: translate3d(0, -50%, 0);
  }
}
.switch-tab {
  min-height: 54rem;
  transition: all 0.3s;
}

.login-content {
  width: 50rem;
  position: relative;
  z-index: 20;
  background: rgb(255, 255, 255);
  margin-left: auto;
  margin-right: auto;
  font-size: 1.4rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Normal;
  font-weight: Normal;
  text-align: center;
  color: #333333;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 1.5rem;
  line-height: 2rem;
  padding-bottom: 1rem;
  transition: all $rotate-time;
  // backface-visibility: hidden;
}
.qr-content {
  position: absolute;
  top: 0;
  z-index: 19;
}

.login-title {
  display: inline-block;
  font-size: 3.6rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Normal;
  font-weight: Normal;
  color: #0c79f8;
  line-height: 5rem;
  margin: 5rem 0;
}
.login-imgmin {
  width: 100%;
  background: rgb(255, 255, 255);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
}
.login-imgmin > i.iconfont-light {
  display: block;
  width: 12rem;
  height: 12rem;
  color: #0c79f8;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  font-size: 9rem;
  line-height: 12rem;
  text-align: center;
}
/* 输入框 */
.login-inputall {
  background: rgb(255, 255, 255);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 3rem;
  transition: all 0.3s;
  .login-input {
    width: 70%;
    height: 6rem;
    position: relative;
    z-index: 6;
  }
  .login-input > input {
    outline: none;
    border: none;
    width: 100%;
    color: #0c79f8;
    font-size: 2rem;
    border-bottom: 0.3rem solid #eee;
    padding: 5px 0;
    margin-bottom: 0.5rem;
    transition: all 0.2s;
  }
  .login-input > input.warning {
    border-bottom: 0.3rem solid #f00;
  }
  .login-input > input:focus {
    border-bottom: 0.4rem solid #0c79f8;
  }
  .login-input > span.tips {
    display: inline-block;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: right;
    position: relative;
    color: #f00;
    font-size: 1.6rem;
  }

  .login-input > label {
    position: absolute;
    top: 0;
    left: 0rem;
    color: #0c79f8;
    font-size: 2.4rem;
    pointer-events: none;
    transition: all 0.3s;
  }
  .login-input input:focus + label,
  .login-input input:valid + label {
    font-size: 2.6rem;
    top: -2.5rem;
    font-weight: 600;
    color: #0c79f8;
  }
  .login-input input:focus {
    border-bottom: 0.3rem solid #0c79f8;
  }
}
/* 二维码内容 */
.QRcon {
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  z-index: 20;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
.QRcon > img {
  width: 31.4rem;
  height: 31.4rem;
}

/* 底下跳转 */
.login-but {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  color: #0c79f8;
  padding: 2.4rem;
  text-shadow: none;
}
.login-but > a {
  text-decoration: none;
  font-size: 2rem;
}
.login-link {
  color: #0c79f8;
  cursor: pointer;
  height: 100%;
  line-height: 4rem;
  transition: all 0.2s;
}
.login-link:hover {
  color: #0c7af89a;
}
.login-link i.icon {
  vertical-align: middle;
  font-size: 3.6rem;
}
.special {
  font-size: 2.4rem;
}
</style>
