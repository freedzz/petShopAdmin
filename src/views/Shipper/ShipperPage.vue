<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>快递设置</el-breadcrumb-item></el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/shipper/list"><el-button type="primary" icon="plus">快递公司列表</el-button></router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :model="infoForm" :rules="infoRules" labelWidth="120px">
          <el-form-item label="打印后自动发货"><el-switch v-model="infoForm.autoDelivery" @change="changeStatus(infoForm.autoDelivery)"></el-switch></el-form-item>
          <el-form-item label="寄件人" prop="Name"><el-input v-model="infoForm.Name" placeholder="请输入非代理发货时的寄件人"></el-input></el-form-item>
          <el-form-item label="电话" prop="Tel"><el-input v-model="infoForm.Tel" placeholder="请输入电话"></el-input></el-form-item>
          <el-form-item label="省份" prop="ProvinceName"><el-cascader v-model="senderOptions" :options="options" placeholder="请选择地区"></el-cascader></el-form-item>
          <!---->
          <!--<el-form-item label="省份" prop="ProvinceName">-->
          <!--<el-input v-model="infoForm.ProvinceName" placeholder="请输入省份"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="城市" prop="CityName">-->
          <!--<el-input v-model="infoForm.CityName" placeholder="请输入城市"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="区/县" prop="ExpAreaName">-->
          <!--<el-input v-model="infoForm.ExpAreaName" placeholder="请输入区/县"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="地址" prop="Address"><el-input v-model="infoForm.Address" placeholder="请输入具体地址"></el-input></el-form-item>
          <el-form-item><el-button type="primary" @click="onSaveSubmit">确定保存</el-button></el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-form labelWidth="120px">
          <el-form-item label="使用中的快递">
            <el-table :data="tableData" style="width: 100%" border stripe>
              <el-table-column prop="name" label="名字"></el-table-column>
              <el-table-column prop="code" label="代号"></el-table-column>
              <el-table-column prop="CustomerName" label="客户编号"></el-table-column>
              <el-table-column prop="MonthCode" label="月结账号"></el-table-column>
              <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getShipper, storeShipperSettings, changeAutoStatus, getAllRegion } from '@/api/shipper/shipper'
export default {
  components: {},
  data() {
    return {
      infoForm: {},
      page: 1,
      total: 0,
      filterForm: {
        name: ''
      },
      tableData: [],
      options: [],
      senderOptions: [],
      infoRules: {
        Name: [{ required: true, message: '请输入寄件人姓名', trigger: 'blur' }],
        Tel: [{ required: true, message: '请输入寄件人电话', trigger: 'blur' }],
        ProvinceName: [{ required: true, message: '请输入寄件省份', trigger: 'blur' }],
        CityName: [{ required: true, message: '请输入寄件城市', trigger: 'blur' }],
        ExpAreaName: [{ required: true, message: '请输入寄件区县', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入寄件人具体地址', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
    this.getAllRegion()
  },
  methods: {
    async getAllRegion() {
      let res = await getAllRegion()
      if(!res.errno) {
        this.options = res.data
      }
    },
    async changeStatus() {
      this.infoForm.autoDelivery = this.infoForm.autoDelivery ? 1 : 0
      let res = await changeAutoStatus({
        status: this.infoForm.autoDelivery
      })
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '更改成功'
        })
        this.infoForm.autoDelivery = this.infoForm.autoDelivery ? true : false
      } else {
        this.$message({
          type: 'error',
          message: '更改失败'
        })
      }
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'shipper_add', query: { id: row.id } })
    },
    onSaveSubmit() {
      this.infoForm.province_id = this.senderOptions[0]
      this.infoForm.city_id = this.senderOptions[1]
      this.infoForm.district_id = this.senderOptions[2]
      this.infoForm.autoDelivery = this.infoForm.autoDelivery ? 1 : 0
      this.$refs.infoForm.validate(async (valid) => {
        if (valid) {
          let res = await storeShipperSettings(this.infoForm)
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.infoForm.autoDelivery = this.infoForm.autoDelivery ? true : false
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            })
          }
        } else {
          return false
        }
      })
    },
    async getList() {
      let res = await getShipper()
      if(!res.errno) {
        this.infoForm = res.data.set
        this.tableData = res.data.info
        this.infoForm.autoDelivery = this.infoForm.autoDelivery ? true : false
        this.senderOptions.push(this.infoForm.province_id, this.infoForm.city_id, this.infoForm.district_id)
      }
    }
  }
}
</script>
<style scoped>
.form-table-box {
  border: 1px solid #f1f1f1;
  margin-bottom: 20px;
}
</style>
