<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>广告列表</el-breadcrumb-item></el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/ad/add"><el-button type="primary" icon="plus">添加广告</el-button></router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="70px"></el-table-column>
          <el-table-column prop="image_url" label="广告">
            <template slot-scope="scope">
              <img :src="scope.row.image_url" alt="" style="width: 90px;height: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="goods_id" label="关联商品"></el-table-column>
          <el-table-column prop="end_time" label="结束时间"></el-table-column>
          <el-table-column prop="sort_order" label="排序" width="100" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.sort_order" placeholder="排序" @blur="submitSort(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="状态" width="80px">
            <template slot-scope="scope">
              {{ scope.row.enabled == 1 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column label="开启状态" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" activeText="" inactiveText="" @change="changeStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          :currentPage="page"
          :pageSize="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { updateSort, saleStatus, adDestoory, getList } from '@/api/ad/ad'
export default {
  components: {},
  data() {
    return {
      page: 1,
      total: 0,
      filterForm: {
        name: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    test() {
      console.log(this.tableData)
    },
    async submitSort(index, row) {
      let res = await updateSort({
        id: row.id,
        sort: row.sort_order
      })
      if(res) {
        console.log(res)
      }
    },
    async changeStatus($event, para) {
      let res = await saleStatus({
        status: $event,
        id: para
      })
      if(res) {
        console.log(res)
      }
    },
    handlePageChange(val) {
      this.page = val
      // 保存到localStorage
      localStorage.setItem('adPage', this.page)
      localStorage.setItem('adFilterForm', JSON.stringify(this.filterForm))
      this.getList()
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'ad_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await adDestoory({
          id: row.id
        })
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }
      })
    },
    onSubmitFilter() {
      this.page = 1
      this.getList()
    },
    async getList() {
      let res = await getList({
        page: this.page
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    }
  }
}
</script>

<style scoped></style>
