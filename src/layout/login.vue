<template>
  <div class="login">
    <div class="infor">
      <p class="login_title">账号登录</p>
      <el-form ref="form" :model="information" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="information.username"
            placeholder="请输入登录账号"
            clearable
          >
            <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="information.password"
            show-password
            placeholder="请输入登录密码"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="code">
          <el-input
            v-model="information.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="login"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code" @click="getCode">
            <img :src="codeUrl" />
          </div>
        </el-form-item> -->
        <el-form-item>
          <p>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </p>
        </el-form-item>
        <el-form-item>
          <p class="btn">
            <el-button type="primary" :loading="loading" @click="login">{{
              loading ? '登录中...' : '登录'
            }}</el-button>
          </p>
          <!-- <div class="forget">忘记密码></div> -->
        </el-form-item>
      </el-form>
      <Vcode :show="VShow" @success="success" @close="close" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getCodeImg } from '@/api/user';
import Vcode from '@/components/vuePuzzleCode';
export default {
  components: {
    Vcode,
  },
  data() {
    const validatorCode = (rule, value, callback) => {
      if (value) {
        if (value === this.resultCode) {
          callback();
        } else {
          callback(new Error('验证码不正确'));
        }
      }
    };
    return {
      codeUrl: '',
      information: {
        username: 'admin',
        password: '111111',
        code: '',
        uuid: '',
      },
      resultCode: '',
      rules: {
        username: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur',
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        },
        code: [
          { required: true, trigger: 'blur', message: '验证码不能为空' },
          {
            required: true,
            validator: validatorCode,
            trigger: 'blur',
          },
        ],
      },
      loading: false,
      VShow: false,
      checked: '',
    };
  },
  mounted() {
    // this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        // console.log(res);
        if (res.errorCode === '-1') {
          this.$message.warning(res.msg || '服务器异常');
          return false;
        }
        this.codeUrl = res.img;
        this.resultCode = res.result;
        this.information.uuid = res.uuid;
        // this.information.code = res.result;
      });
    },
    ...mapMutations(['changeLogin']),
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.VShow = true;
        } else {
          console.log(valid);
        }
      });
    },
    success() {
      // console.log(this.information);
      this.close();
      this.loading = true;
      this.$store
        .dispatch('user/login', this.information)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    close() {
      this.VShow = false;
    },
    open() {
      this.$notify({
        title: '提示',
        type: 'success',
        message: '登录成功！',
        duration: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url('../assets/login.jpg') no-repeat center / cover;
}
.infor {
  width: 400px;
  /* height: 450px; */
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-65%);
  padding: 20px;
}
.login_title {
  color: #008cff;
  font-size: 20px;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
ul {
  padding-top: 40px;
}
::v-deep .el-button--primary {
  width: 100%;
  height: 50px;
}
::v-deep .el-form-item {
  &:last-of-type {
    margin-bottom: 0;
  }
}
.forget {
  text-align: right;
  font-size: 14px;
  line-height: 40px;
}
</style>

