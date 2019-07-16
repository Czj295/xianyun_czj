<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        captcha: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          // {min: 11,max: 11,message: '请输入正确的手机号码',trigger:'blur'}
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      const phoneNumber = this.form.username;
      if (!phoneNumber.trim()) {
        this.$message.warning("请输入手机号码!")
        return
      }
      // 发送手机验证码的接口
      this.$axios({
        method: 'POST',
        url: '/captchas',
        data: {
          tel: phoneNumber
        }
      }).then(res =>{ 
        // console.log(res)
        const { code } = res.data
        this.$alert(`您的手机验证码是：${code}`,'提示',{
          confirmButtonText: '确定',
          type: 'warning'
        })
      })
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.form);
      this.$refs.form.validate( valid => {
        if(valid){
          // es6 语法  将一个属性从对象里拿出来 ，剩余的形成一个新的对象  (props)
          const { checkPassword, ...props } = this.form
            this.$store.dispatch('user/register',props).then(res => {
              console.log(res)
              this.$message.success('注册成功，即将跳转到首页')
            setTimeout(() => {
              this.$router.push('/')
            },2000)
            })
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>