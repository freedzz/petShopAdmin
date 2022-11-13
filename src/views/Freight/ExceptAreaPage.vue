<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'freight' }">运费模板</el-breadcrumb-item>
        <el-breadcrumb-item>偏远地区</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" plain icon="arrow-left" @click="addExceptArea">添加偏远地区</el-button>
        <el-button type="primary" icon="arrow-left" @click="goBackPage">返回</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <div class="form-table-box">
          <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column prop="id" label="ID" width="100px"></el-table-column>
            <el-table-column prop="content" label="名称" width="200px"></el-table-column>
            <el-table-column prop="areaName" label="偏远地区"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="small" plain @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" plain @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExceptarea, exceptAreaDelete } from '@/api/freight/freight'
export default {
  components: {},
  data() {
    return {
      value: true,
      nowTableIndex: 0,
      areaData: [],
      selectedArea: [],
      hiddenSelectedArea: [],
      specEditVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    goBackPage() {
      this.$router.go(-1)
    },
    addExceptArea() {
      this.$router.push({ name: 'except_area_add' })
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'except_area_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await exceptAreaDelete({
          id: row.id
        })
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getInfo()
        }
      })
    },
    async getInfo() {
      let res = await getExceptarea()
      if(!res.errno) {
        this.tableData = res.data
      }
    }
  }
}
</script>

<style scoped>
.number_input {
  width: 90px;
}

.money_input {
  width: 100px;
}

.el-form-item__content {
  display: flex;
  justify-content: flex-start;
}

.line-wrap {
  display: flex;
  justify-content: flex-start;
}

.default-freight .el-input {
  width: 130px;
  float: left;
}

.default-freight .el-input .el-input__inner {
  width: 100px;
}

.default-freight .line {
  display: flex;
  justify-content: flex-start;
  border-right: 1px solid #f1f1f1;
  /*padding-right: 40px;*/
  margin-right: 40px;
}

.default-freight .line2 {
  display: flex;
  justify-content: flex-start;
}

.default-freight .text {
  width: 60px;
  float: left;
  margin-left: 10px;
}

.default-freight .text2 {
  width: 50px;
  float: left;
  /*margin: 10px;*/
}

.float-right {
  float: right;
}

.add-btn {
  color: #3a8ee6;
  font-size: 14px;
  padding: 20px;
  border: 1px solid #f1f1f1;
  border-top: none;
  display: flex;
  justify-content: space-between;
}
</style>
