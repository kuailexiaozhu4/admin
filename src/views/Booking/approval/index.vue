<template>
  <!-- 用户信息 -->
  <div class="container">
    <!-- 条件查询 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" size="small">
        <el-form-item label="申请人">
          <el-input v-model="formInline.appUserName" placeholder="申请人姓名"/>
        </el-form-item>
        <el-form-item label="疫苗名称">
          <el-input v-model="formInline.vaccineName" placeholder="疫苗名称"/>
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
            width="50">
        </el-table-column>

        <el-table-column
            align="center"
            label="申请人"
            prop="appUserId.name"
            width="190"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            align="center"
            label="年龄"
            prop="appUserId.age"
            width="80">
        </el-table-column>
        <el-table-column
            align="center"
            label="手机号"
            prop="appUserId.phone"
            width="210">
        </el-table-column>
        <el-table-column
            align="center"
            label="疫苗名称"
            prop="vaccineId.name">
        </el-table-column>
        <el-table-column
            align="center"
            label="疫苗类型"
            prop="vaccineId.typeId"
            width="190">
        </el-table-column>
        <el-table-column
            align="center"
            label="疫苗数量"
            prop="vaccineId.count"
            width="100">
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="handleApprove(scope.row)">批准
            </el-button>
            <el-button
                size="mini"
                icon="el-icon-search"
                @click="handleWatch(scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <!--查看内容-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
     </span>
    </el-dialog>，
  </div>
</template>
<script>
import {getPage} from "@/api/appUserVaccine";

export default {
  created() {
    this.formInline.hospitalId = localStorage.getItem("hospitalId")
    this.getAll()
  },
  data() {
    return {
      // 条件查询
      formInline: {
        vaccineName: '',
        appUserName: '',
        // 预约中
        sign: 0,
        hospitalId: ''
      },
      // 表格数据
      tableData: [],
      // 分页数据
      pagination: {
        total: 0,
        size: 12,
        current: 1
      }
    }
  },
  methods: {
    getAll() {
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
      this.formInline.vaccineName = '';
      this.formInline.appUserName = '';
      this.getAll()
    },
    // 批准
    handleApprove(row) {
      console.log(row);
    },
    // 查看
    handleWatch(row) {
      console.log(row);
    },
    // 切换页数
    handleChange(current) {
      this.pagination.current = current;
      this.getAll();
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  .table {
    margin-bottom: 10px;
  }

  .footer {
    text-align: right;
  }
}
</style>