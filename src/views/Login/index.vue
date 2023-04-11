<template>
  <div class="container">
    <el-card class="box-card">
      <div class="header-title">
        {{ title }}
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="70px"
               size="medium"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input prefix-icon="el-icon-user" type="input" maxlength="11" v-model="ruleForm.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" show-password v-model="ruleForm.password"
                    autocomplete="off"/>
        </el-form-item>
        <!--        <el-form-item label="角色" prop="rid">-->
        <!--          <el-select v-model="ruleForm.rid" placeholder="请选择">-->
        <!--            <el-option-->
        <!--                v-for="item in options"-->
        <!--                :key="item.value"-->
        <!--                :label="item.label"-->
        <!--                :value="item.value">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button class="register" @click="$router.replace('/register')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {login} from '@/api/user'
import md5 from '@/utils/md5'

export default {
  data() {
    return {
      title: "系统用户登录",
      ruleForm: {
        phone: '',
        password: '',
      },
      rules: {
        phone: [{required: true, message: '请输入11位手机号', trigger: 'blur'},
          {required: true, min: 11, message: '请输入11位手机号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      // options: [{
      //   value: '0',
      //   label: '管理员'
      // }, {
      //   value: '1',
      //   label: '医生'
      // }]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.user).then(res => {
            if (res.code === 200) {
              console.log(res.data)
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("hospitalId", res.data.hospitalId);
              this.$store.commit('setHospitalId', res.data.hospitalId);
              this.$message.success(res.msg);
              this.$router.push('/');
            } else {
              this.$message.warning(res.msg)
            }
          });
        } else {
          return;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    user() {
      return {
        phone: this.ruleForm.phone,
        password: md5(this.ruleForm.password)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  .box-card {
    width: 480px;
    margin: 100px auto;

    .header-title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    .el-form-item {
      .el-input {
        width: 90%;
      }

      .register {
        font-size: 12px;
        border: none;
        color: red;
      }

      .text {
        font-size: 14px;
      }
    }
  }
}
</style>