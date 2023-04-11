<template>
  <div class="container">
    <el-card class="box-card">
      <div class="header-title">
        {{ title }}
      </div>
      <el-form :model="ruleForm"
               :rules="rules" ref="ruleForm"
               label-width="90px" size="small">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" :maxlength="11"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="ruleForm.password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" show-password v-model="ruleForm.repassword"/>
        </el-form-item>
        <el-form-item label="医院id" prop="hid">
          <el-input v-model="ruleForm.hid"/>
        </el-form-item>
        <el-form-item label="医生编号" prop="code">
          <el-input v-model="ruleForm.code" :minlength="4" :maxlength="6"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button class="login" @click="$router.replace('/user')">已有账号，请去登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {register} from "@/api/user";
import md5 from '@/utils/md5'

export default {
  data() {
    let checkPass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    };
    return {
      title: '注册',
      ruleForm: {
        phone: '',
        name: '',
        password: '',
        repassword: '',
        hid: '',
        code: '',
        rid: 1
      },
      rules: {
        phone: [{required: true, min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        repassword: [{required: true, message: '请确认密码', trigger: 'blur'},
          {validator: checkPass, trigger: 'blur'}],
        hid: [{required: true, message: '请输入医院id', trigger: 'blur'}],
        code: [{required: true, min: 4, max: 6, message: '请输入4-6位编码', trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.user).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.replace("/login")
            } else {
              this.$message.warning(res.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    user() {
      return {
        phone: this.ruleForm.phone,
        name: this.ruleForm.name,
        password: md5(this.ruleForm.password),
        repassword: md5(this.ruleForm.repassword),
        hid: this.ruleForm.hid,
        code: this.ruleForm.code,
        rid: this.ruleForm.rid
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding-top: 8%;

  .box-card {
    width: 480px;
    margin: auto;

    .header-title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 1px solid grey;
    }

    .el-form {
      .el-form-item {
        .el-input {
          width: 90%;
        }

        .login {
          border: none;
          font-size: 12px;
          color: skyblue;
        }
      }
    }
  }
}

</style>