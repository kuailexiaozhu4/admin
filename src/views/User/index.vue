<template>
  <!-- 用户信息 -->
  <div class="container">
    <!-- 条件查询 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="用户姓名">
          <el-input v-model="formInline.name" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="formInline.phone" placeholder="用户手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          <el-button icon="el-icon-refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
          ref="multipleTable"
          :data="tableData"
          border
          row-key
          size="medium"
          stripe
          style="width: 100%"
          tooltip-effect="dark"
      >
        <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55">
        </el-table-column>

        <el-table-column
            align="center"
            label="姓名"
            prop="name"
            width="140">
        </el-table-column>
        <el-table-column
            align="center"
            label="手机号"
            prop="phone"
            width="130">
        </el-table-column>
        <el-table-column
            align="center"
            label="年龄"
            prop="age"
            width="90">
        </el-table-column>
        <el-table-column
            align="center"
            label="状态"
            prop="status"
            width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">可用</el-tag>
            <el-tag v-else-if="scope.row.status==1" type="danger">不可用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="性别"
            prop="gender"
            width="60">
        </el-table-column>
        <el-table-column
            align="center"
            label="地址"
            prop="address"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" width="260">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="primary"
                @click="handleWatch(scope.row)">查看
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  弹层表单数据  -->
    <div class="editTable">
      <el-dialog :visible.sync="dialogVisible" show-close title="用户信息" :close-on-click-modal="false">
        <el-form :disabled="disabled" :model="formDialogData" label-position="right" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formDialogData.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-input v-if="disabled===true" v-model="formDialogData.gender"/>
                <el-select v-else v-model="formDialogData.gender" placeholder="请选择" size="small">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="formDialogData.phone"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="formDialogData.age"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册时间" prop="createTime">
                <el-input v-model="formDialogData.createTime" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号状态" prop="status">
                <el-input v-model="formDialogData.status" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="formDialogData.idCard" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleCancel()">取消</el-button>
          <el-button size="small" type="primary" @click="handleDecide()">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页器  -->
    <div class="footer">
      <el-pagination
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="handleChange"
          background
          layout="total,prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getPage, removeById, updateUser} from "@/api/users";

export default {
  created() {
    this.getAll()
  },
  data() {
    return {
      // 条件查询
      formInline: {
        name: '',
        phone: ''
      },
      // 表格数据
      tableData: [],
      // 分页数据
      pagination: {
        total: 0,
        size: 8,
        current: 1
      },
      // 单层是否展开
      dialogVisible: false,
      //弹层数据
      formDialogData: {},
      //弹层能否编辑
      disabled: true,
      // 选择框
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
    }
  },
  methods: {
    async getAll() {
      getPage(this.pagination, this.formInline).then((res) => {
        this.pagination.total = res.data.total;
        this.tableData = res.data.records;
      })
    },
    //条件查询
    onSubmit() {
      this.getAll();
    },
    // 重置
    onReset() {
      this.formInline = {
        name: '',
        phone: ''
      }
      this.getAll()
    },
    // 表格编辑操作
    handleEdit(row) {
      this.dialogVisible = true;
      this.formDialogData = row;
      this.disabled = false;
    },
    // 表格查看操作
    handleWatch(row) {
      this.dialogVisible = true;
      this.disabled = true;
      this.formDialogData = row;
    },
    // 表格删除操作
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeById(row).then(res => {
          this.$message.success('删除成功!');
        }).finally(() => {
          this.getAll();
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    //弹层取消
    handleCancel() {
      this.dialogVisible = false;
    },
    //弹层确定
    handleDecide() {
      if (this.disabled) {
        this.dialogVisible = false;
      } else {
        // axios修改数据库 formDialogData
        updateUser(this.formDialogData).then(res => {
        }).finally(() => {
          this.dialogVisible = false;
          this.getAll();
        })
      }
    },
    handleChange(current) {
      this.pagination.current = current;
      this.getAll();
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  .search {
  }

  .button {
    margin-bottom: 10px;
  }

  .table {
    margin-bottom: 10px;
  }

  .footer {
    text-align: right;
  }
}

</style>