<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>热门搜索</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/keywords/add"><el-button type="primary" icon="plus">添加热门搜索</el-button></router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="关键词"><el-input v-model="filterForm.name" placeholder="搜索关键词"></el-input></el-form-item>
          <el-form-item><el-button type="primary" @click="onSubmitFilter">查询</el-button></el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="100px"></el-table-column>
          <el-table-column prop="keyword" label="关键词"></el-table-column>
          <el-table-column prop="is_hot" label="is_hot"></el-table-column>
          <el-table-column prop="is_default" label="is_default"></el-table-column>
          <el-table-column prop="is_show" label="is_show"></el-table-column>
          <el-table-column prop="sort_order" label="排序" width="80"></el-table-column>
          <el-table-column label="操作" width="140">
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
import { keywordsDestory, getKeywords } from '@/api/keywords/keywords'
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
    handlePageChange(val) {
      this.page = val
      // 保存到localStorage
      localStorage.setItem('keywordsPage', this.page)
      localStorage.setItem('keywordsFilterForm', JSON.stringify(this.filterForm))
      this.getList()
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'keywords_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await keywordsDestory({
          id: row.id
        })
        if (res.errno === 0) {
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
      let res = await getKeywords({
        params: {
          page: this.page,
          name: this.filterForm.name
        }
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
