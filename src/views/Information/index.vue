<template>
  <!-- 用户信息 -->
  <div class="container">
    <!-- 条件查询 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" size="small">
        <el-form-item label="疫苗名称">
          <el-input v-model="formInline.name" placeholder="疫苗名称"/>
        </el-form-item>
        <el-form-item label="适合人群">
          <el-select v-model.number="formInline.fit" placeholder="请选择适合人群">
            <el-option
                v-for="item in vaccineFit"
                :key="item.value"
                :label="item.label"
                v-model.number="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          <el-button icon="el-icon-refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加删除按钮  -->
    <div class="btn">
      <el-row>
        <el-button size="small" type="success" @click="handleAdd()">添加疫苗</el-button>
        <el-button size="small" type="danger" @click="handleDelete()">批量删除</el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
          ref="multipleTable"
          :data="tableData"
          border
          row-key
          size="mini"
          stripe
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            align="center"
            type="selection"
            width="40">
        </el-table-column>

        <el-table-column
            align="center"
            label="疫苗名称"
            prop="name"
            width="140"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            align="center"
            label="生产日期"
            prop="createDate"
            width="100">
        </el-table-column>
        <el-table-column
            align="center"
            label="失效期"
            prop="expireDate"
            width="100">
        </el-table-column>
        <el-table-column
            align="center"
            label="数量"
            prop="count"
            width="50">
        </el-table-column>
        <el-table-column
            align="center"
            label="成分"
            prop="ingredients"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            align="center"
            label="批准文号"
            prop="approvalNumber"
            width="190">
        </el-table-column>
        <el-table-column
            align="center"
            label="规格"
            prop="specification"
            width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width="210">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
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
    <!-- 查看/编辑弹层表单  -->
    <div class="watchForm">
      <el-dialog :visible.sync="watchVisible" show-close title="疫苗信息" :close-on-click-modal="false">
        <el-form label-position="right" label-width="80px" size="small" :disabled="disabled" ref="watchForm"
                 :rules="rules"
                 :model="formDialogData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formDialogData.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剩余数量" prop="count">
                <el-input v-model.number="formDialogData.count"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="生产日期" prop="createDate">
                <el-date-picker
                    v-model="formDialogData.createDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效期" prop="expireDate">
                <el-date-picker
                    v-model="formDialogData.expireDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格" prop="specification">
                <el-input v-model="formDialogData.specification"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="批准文号" prop="approvalNumber">
                <el-input v-model="formDialogData.approvalNumber"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="药品成分" prop="ingredients">
                <el-input v-model="formDialogData.ingredients"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="制药厂">
                <el-select v-model="selectedName" filterable placeholder="请选择">
                  <el-option
                      v-for="item in factoryOptions"
                      :key="item.id"
                      :label="item.factoryName"
                      :value="item.factoryName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="疫苗类型" prop="typeId">
                <el-select v-model="formDialogData.typeId" filterable placeholder="请选择">
                  <el-option
                      v-for="item in vaccineType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="factoryDialogData.phone" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适合人群" prop="fit">
                <el-select v-model.number="formDialogData.fit" placeholder="请选择适合人群">
                  <el-option
                      v-for="item in vaccineFit"
                      :key="item.value"
                      :label="item.label"
                      v-model.number="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="药厂地址">
                <el-input v-model="factoryDialogData.place" disabled/>
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
    <!-- 添加疫苗信息 -->
    <div class="addTable">
      <el-dialog :visible.sync="addVisible" show-close title="疫苗信息" :close-on-click-modal="false">
        <el-form :rules="rules" :model="formDialogData" label-position="right" label-width="80px" size="mini"
                 ref="addForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formDialogData.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剩余数量" prop="count">
                <el-input v-model.number="formDialogData.count"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="生产日期" prop="createDate">
                <el-date-picker
                    v-model="formDialogData.createDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效期" prop="expireDate">
                <el-date-picker
                    v-model="formDialogData.expireDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格" prop="specification">
                <el-input v-model="formDialogData.specification"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="批准文号" prop="approvalNumber">
                <el-input v-model="formDialogData.approvalNumber"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="药品成分" prop="ingredients">
                <el-input v-model="formDialogData.ingredients"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="制药厂">
                <el-select v-model="selectedName" filterable placeholder="请选择">
                  <el-option
                      v-for="item in factoryOptions"
                      :key="item.id"
                      :label="item.factoryName"
                      :value="item.factoryName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="疫苗类型" prop="typeId">
                <el-select v-model="formDialogData.typeId" filterable placeholder="请选择">
                  <el-option
                      v-for="item in vaccineType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="factoryDialogData.phone" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适合人群" prop="fit">
                <el-select v-model.number="formDialogData.fit" placeholder="请选择适合人群">
                  <el-option
                      v-for="item in vaccineFit"
                      :key="item.value"
                      :label="item.label"
                      v-model.number="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="药厂地址">
                <el-input v-model="factoryDialogData.place" disabled/>
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
          @current-change="handlePageChange"
          background
          layout="total,prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getFactory, getPage, getVaccineType, removeByIds, saveVaccine, updateVaccine} from "@/api/vaccine";

export default {
  created() {
    this.hospitalId = localStorage.getItem("hospitalId")
    this.getAll();
    this.getAllFactory();
    this.getAllVaccineType();
  },
  data() {
    return {
      hospitalId: '',
      // 条件查询
      formInline: {
        name: '',
        fit: '',
      },
      // 表格数据
      tableData: [],
      // 分页数据
      pagination: {
        total: 0,
        size: 12,
        current: 1
      },
      // 添加弹层展开
      addVisible: false,
      // 查看弹层是否展开
      watchVisible: false,
      disabled: true,
      // 校验规则
      rules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        count: [{required: true, message: '请输入数字', type: 'number', trigger: 'blur'}],
        createDate: [{required: true, message: '不能为空', trigger: 'blur'}],
        expireDate: [{required: true, message: '不能为空', trigger: 'blur'}],
        specification: [{required: true, message: '不能为空', trigger: 'blur'}],
        approvalNumber: [{required: true, message: '不能为空', trigger: 'blur'}],
        ingredients: [{required: true, message: '不能为空', trigger: 'blur'}],
        typeId: [{required: true, message: '不能为空', trigger: 'blur'}],
        fit: [{required: true, message: '不能为空', trigger: 'blur'}]
      },
      // 删除的疫苗ids
      ids: [],
      //查看/编辑/添加弹层疫苗数据
      formDialogData: {},
      // 弹层工厂数据
      factoryDialogData: {},
      // 制药厂选择框列表
      factoryOptions: [],
      // 疫苗类型列表
      vaccineType: [],
      selectedName: '',
      // 选择框
      vaccineFit: [
        {
          value: 0,
          label: '儿童(1-12)岁'
        },
        {
          value: 1,
          label: '青少年(12-18)岁'
        },
        {
          value: 2,
          label: '成年人(18-30)岁'
        },
        {
          value: 3,
          label: '中老年(30-40)'
        },
        {
          value: 4,
          label: '老年人(40-60)'
        }
      ],
    }
  },
  methods: {
    getAll() {
      getPage(this.pagination, {...this.formInline, "hospitalId": this.hospitalId}).then((res) => {
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
        type: '',
      }
      this.getAll()
    },
    // 查看表格操作
    handleWatch(row) {
      this.watchVisible = true;
      this.disabled = true;
      this.formDialogData = row;
      this.factoryDialogData = row.factoryId;
      this.selectedName = row.factoryId.factoryName;
    },
    //axios查找制药厂
    getAllFactory() {
      getFactory().then(res => {
        this.factoryOptions = res.data;
      })
    },
    //axios查找疫苗类型
    getAllVaccineType() {
      getVaccineType().then(res => {
        this.vaccineType = res.data;
      })
    },
    // 添加疫苗
    handleAdd() {
      this.addVisible = true;
      this.formDialogData = {};
      this.selectedName = '';
    },
    // 数据处理
    selectedFactory(name) {
      return this.factoryOptions.filter(f => f.factoryName == name)[0]
    },
    // 编辑表格操作
    handleEdit(row) {
      this.watchVisible = true;
      this.disabled = false;
      this.formDialogData = row;
      this.factoryDialogData = row.factoryId;
      this.selectedName = row.factoryId.factoryName;
    },
    //弹层取消
    handleCancel() {
      this.watchVisible = false;
      this.addVisible = false;
      this.getAll();
      this.resetForm();
    },
    //弹层确定
    handleDecide() {
      // 查看/编辑
      if (this.watchVisible) {
        if (this.disabled) {
          this.handleCancel();
        } else {
          this.$refs.watchForm.validate((valid) => {
            if (valid) {
              updateVaccine(this.formDialogData).then(res => {
                this.$message.success(res.msg)
              })
              this.watchVisible = false;
              this.getAll();
            } else {
              this.getAll();
              return false;
            }
          });
        }
      }
      // 添加
      if (this.addVisible) {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            saveVaccine(this.formDialogData).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg)
              }
            }).finally(() => {
              this.addVisible = false;
              this.resetForm();
              this.getAll();
            })
          } else {
            return false;
          }
        });
      }
    },
    // 重置添加表单
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    // 选中疫苗的id数组
    handleSelectionChange(options) {
      this.ids = options.map(item => item.id);
    },
    // 表格删除操作
    Delete(ids, hospitalId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeByIds(ids).then(data => {
          this.$message.success(data.msg);
        }).finally(() => {
          this.getAll();
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 删除
    handleDelete(row) {
      if (row) {
        this.Delete([row.id]);
      } else {
        // console.log(this.ids)
        this.Delete(this.ids);
      }
    },
    // 切换页数
    handlePageChange(current) {
      this.pagination.current = current;
      this.getAll();
    }
  },
  watch: {
    // 每当 selectedName 改变时，这个函数就会执行
    selectedName: {
      handler(newValue) {
        this.factoryDialogData = this.selectedFactory(newValue) || {};
        this.$set(this.formDialogData, 'factoryId', this.factoryDialogData);
      },
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  .btn {
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