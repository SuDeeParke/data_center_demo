<template>
  <div class="login">
    <div class="wrap" :class="qrActive?'wrap-qr-active':'wrap-input-active'">
      <!-- 左上角小图标切换 -->
      <div class="switch-btn" @click="changeTab()">
        <i class="iconfont-light" v-show="!downIcon">&#60314;</i>
        <i class="iconfont-bold" v-show="downIcon">&#60447;</i>
      </div>
      <!-- 输入 -->
      <div class="login-content input-content">
        <h1 class="login-title">数据中心可视化运维</h1>
        <div class="switch-tab">
          <div class="login-inputall">
            <div class="login-imgmin">
              <i class="iconfont-light">&#60314;</i>
            </div>
            <!-- 工号 -->
            <div class="login-input">
              <input
                type="text"
                name="phone"
                required="required"
                v-model="phone"
                @focus="numbFocus()"
                @blur="inputOnBlur()"
                :class="tipUsr !== null ? 'warning': ''"
              />
              <label>手机号</label>
              <span class="tips">{{ tipUsr }}</span>
            </div>
            <!-- 密码 -->
            <div class="login-input">
              <input
                type="password"
                name="password"
                required="required"
                v-model="password"
                @focus="pwdFocus()"
                @blur="inputOnBlur()"
                :class="tipPwd !== null ? 'warning': ''"
              />
              <label>密码</label>
              <span class="tips">{{ tipPwd }}</span>
            </div>
            <!-- 底下跳转 -->
            <div class="login-but">
              <a @click="changeTab">
                <div class="login-link">
                  <i class="iconfont-light icon">&#59845;</i>
                  注册
                </div>
              </a>
              <router-link to="/resetpwd" target="_blank">
                <div class="login-link">
                  <i class="iconfont-light icon">&#60666;</i>
                  <br />忘记密码
                </div>
              </router-link>
              <a>
                <div class="login-link special" @click="loginTo()">
                  登录
                  <i class="iconfont-light icon">&#59844;</i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="login-content qr-content">
        <h1 class="login-title">数据中心可视化运维</h1>
        <div class="switch-tab">
          <div class="registerPanel">
            <el-form
            label-position="top"
            ref="registerData"
            label-width="50px"
            :model="registerData"
            :rules="rules"
            >
              <div class="registerWrap">
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="registerData.name" maxlength="5" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="registerData.phone" type="phone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="registerData.email" type="email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="registerData.password" show-password maxlength="13"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                  <el-input v-model="registerData.confirm" show-password></el-input>
                </el-form-item>
              </div>
              <div class="buttonArea">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('registerData')">立即创建</el-button>
                  <el-button @click="resetForm('registerData')">重置</el-button>
                </el-form-item>
              </div>
            </el-form>
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
import { login } from '../api/user';

export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      const pattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,13}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!pattern.test(value)) {
        callback(new Error('密码需包含字母,数字且长度为6-13'));
      } else {
        if (this.registerData.checkPass !== '') {
          this.$refs.registerData.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      bgicon: 0,
      downIcon: true,
      phone: '', // 工号
      password: '', // 密码
      tipUsr: null, // 手机号不对时提示
      tipPwd: null,
      qrActive: false,
      registerData: {
        name: '',
        phone: '',
        email: '',
        password: '',
        confirm: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
        ],
        confirm: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
        return null;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
      if (process.env.VUE_APP_DEV === 'true') {
        if (this.phone && this.password) {
          login(this.phone, this.password).then((result) => {
            window.cookieStore.set(
              'DataCenter',
              JSON.stringify({
                user: this.phone,
                authority: result.data.data.token,
              }),
            );
            // this.$router.push('/home');
          });
        } else {
          this.tipUsr = '手机不能为空';
          this.tipPwd = '密码不能为空';
        }
      }
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
.registerPanel {
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  z-index: 20;
  border-radius: 10px;
  display: block;
  padding: 10px 50px;
  text-align: left;
  .registerWrap {
    height: 465px;
    overflow-y:auto;
  }
  .buttonArea{
      display: flex;
      width: 100%;
      justify-content: center;
    }
}
.registerPanel > img {
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
