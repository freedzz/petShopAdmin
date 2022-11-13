<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>用户列表</el-breadcrumb-item></el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="用户昵称"><el-input v-model="filterForm.nickname" placeholder="用户昵称"></el-input></el-form-item>
          <el-form-item><el-button type="primary" @click="onSubmitFilter">查询</el-button></el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="60"></el-table-column>
          <el-table-column label="头像" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
            </template>
          </el-table-column>
          <!--<el-table-column prop="username" label="会员名称">-->
          <!--</el-table-column>-->
          <el-table-column prop="nickname" label="昵称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nickname" placeholder="昵称" @blur="submitNick(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="120">
            <template slot-scope="scope">
              {{ scope.row.gender == 2 ? '女' : '男' }}
            </template>
          </el-table-column>
          <!--<el-table-column prop="mobile" label="手机号"></el-table-column>-->
          <el-table-column prop="register_time" label="注册时间" width="180"></el-table-column>
          <el-table-column prop="last_login_time" label="最近登录" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button plain size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          background
          :currentPage.sync="page"
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
import { userUpdateInfo, userDestory, getUser } from '@/api/user/user'
export default {
  components: {},
  data() {
    return {
      page: 1,
      total: 0,
      filterForm: {
        name: ''
      },
      tableData: [],
      loginInfo: null,
      username: ''
    }
  },
  mounted() {
    let thePage = localStorage.getItem('userPage')
    if (!thePage) {
      thePage = 1
    }
    this.page = Number(thePage)
    console.log(this.page)
    this.getList()
  },
  methods: {
    async submitNick(index, row) {
      let res = await userUpdateInfo({
        id: row.id,
        nickname: row.nickname
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    handlePageChange(val) {
      this.page = val
      // 保存到localStorage
      localStorage.setItem('userPage', this.page)
      this.getList()
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'user_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await userDestory({
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
      let res = await getUser({
        page: this.page,
        nickname: this.filterForm.nickname
      })
      if(!res.errno) {
        this.tableData = res.data.userData.data
        this.page = res.data.userData.currentPage
        this.total = res.data.userData.count
      }
      if (!this.loginInfo) {
        this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null)
        this.username = this.loginInfo.username
      }
    }
  }
}
</script>

<style scoped></style>
