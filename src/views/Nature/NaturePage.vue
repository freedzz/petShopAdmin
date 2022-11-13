<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>商品设置</el-breadcrumb-item></el-breadcrumb>
    </div>
    <div class="content-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品分类" name="first"></el-tab-pane>
        <el-tab-pane label="商品型号" name="second"></el-tab-pane>
      </el-tabs>
      <div class="form-table-box">
        <div class="btn-wrap">
          <router-link v-if="pIndex == 0" to="/dashboard/category/add"><el-button plain type="primary" icon="plus">添加分类</el-button></router-link>
          <router-link v-if="pIndex == 1" to="/dashboard/specification/detail"><el-button plain type="primary" icon="plus">添加型号</el-button></router-link>
        </div>
        <el-table
          v-if="pIndex == 0"
          :data="categoryData"
          style="width: 100%"
          border
          stripe
        >
          <el-table-column prop="name" label="分类名称">
            <template slot-scope="scope">
              <div v-if="scope.row.level == 1" class="bg-gray">{{ scope.row.name }}</div>
              <div v-if="scope.row.level == 2" class="bg-left">{{ scope.row.name }}</div>
              <!-- {{ scope.row.level == 2 ? '' : '' }} {{scope.row.name}} -->
            </template>
          </el-table-column>
          <el-table-column label="图标显示" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_channel" activeText="" inactiveText="" @change="changeChannelStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="首页显示" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_show" activeText="" inactiveText="" @change="changeShowStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="全部产品页面显示" width="140">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_category" activeText="" inactiveText="" @change="changeCategoryStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="sort_order" label="排序" width="100" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.sort_order" placeholder="排序" @blur="submitSort(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="pIndex == 1"
          :data="specData"
          style="width: 100%"
          border
          stripe
        >
          <el-table-column prop="id" label="ID" width="100"></el-table-column>
          <el-table-column prop="name" label="型号名"></el-table-column>
          <el-table-column prop="sort_order" label="排序" width="200"></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="specEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="specDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getSpecification,
  getCategory,
  categoryDestory,
  specificationDelete,
  updateSort,
  getCategoryStatus,
  getChannelStatus,
  getShowStatus
} from '@/api/nature/nature'

export default {
  components: {},
  data() {
    return {
      activeName: 'first',
      pIndex: 0,
      categoryData: [],
      is_spec_add: false,
      dialogFormVisible: false,
      specData: [],
      form: {},
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClick(tab) {
      const pindex = tab._data.index
      this.activeClass = 0
      if (+pindex === 0) {
        this.getList()
        this.pIndex = 0
      } else if (+pindex === 1) {
        this.getSpecList()
        this.pIndex = 1
      }
    },
    async changeShowStatus($event, para) {
      let res = await getShowStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    async changeChannelStatus($event, para) {
      let res = await getChannelStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    async changeCategoryStatus($event, para) {
      let res = await getCategoryStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    async submitSort(index, row) {
      let res = await updateSort({
        id: row.id,
        sort: row.sort_order
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'category_add', query: { id: row.id } })
    },
    specEdit(index, row) {
      this.$router.push({ name: 'specification_detail', query: { id: row.id } })
    },
    specDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await specificationDelete({
          id: row.id
        })
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getSpecList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败，该型号下有商品!'
          })
        }
      })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await categoryDestory({
          id: row.id
        })
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败，该分类有子分类!'
          })
        }
      })
    },
    async getList() {
      let res = await getCategory({
        page: this.page
      })
      if(!res.errno) {
        this.categoryData = res.data
      }
    },
    async getSpecList() {
      let res = await getSpecification()
      if(!res.errno) {
        this.specData = res.data
      }
    }
  }
}
</script>

<style scoped>
.sort-width {
  width: 90px;
}
.right {
  float: right;
}
.form-inline {
  margin-top: 2px;
  height: 40px;
  margin-right: 20px;
}
.block {
  margin-bottom: 10px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.active {
  border-color: #ff4949;
  color: #ff4949;
}
.marginRight {
  margin-right: 20px;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
