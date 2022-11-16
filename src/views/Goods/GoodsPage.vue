<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>商品列表</el-breadcrumb-item></el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/goods/add"><el-button type="primary" icon="plus" size="small">添加商品</el-button></router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="block">
        <span class="wrapper">
          <el-button
            :plain="true"
            type="primary"
            :class="activeClass == 1 ? 'active' : ''"
            size="small"
            @click="sortOrder(1)"
          >按销量排序</el-button>
          <el-button
            :plain="true"
            type="primary"
            :class="activeClass == 2 ? 'active' : ''"
            size="small"
            @click="sortOrder(2)"
          >按售价排序</el-button>
          <el-button
            :plain="true"
            type="primary"
            :class="activeClass == 3 ? 'active' : ''"
            size="small"
            @click="sortOrder(3)"
          >按库存排序</el-button>
        </span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部商品" name="first"></el-tab-pane>
        <el-tab-pane label="出售中" name="second"></el-tab-pane>
        <el-tab-pane label="已售完" name="third"></el-tab-pane>
        <el-tab-pane label="已下架" name="fourth"></el-tab-pane>
      </el-tabs>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="form-inline">
          <el-form-item label="商品名称"><el-input v-model="filterForm.name" size="small" placeholder="商品名称"></el-input></el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmitFilter">查询</el-button>
            <el-button size="small" @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
        <!--<el-button @click="expandToggle" type="primary" icon="plus" size="small">{{expand == false?'全部展开':'全部收起'}}</el-button>-->
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.product" style="width: 100%" stripe>
                <el-table-column prop="id" label="id" width="60"></el-table-column>
                <el-table-column prop="goods_sn" label="商品SKU" width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_sn" size="mini" placeholder="商品SKU" @blur="checkSkuOnly(scope.$index, scope.row)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods_aka" label="快递单上的简称" width="160">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_name" size="mini" placeholder="简称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="型号/规格" width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" size="mini" placeholder="如1斤/条"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="cost" label="成本(元)" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cost" size="mini" placeholder="成本"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="retail_price" label="零售(元)" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.retail_price" size="mini" placeholder="零售"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods_weight" label="重量(KG)" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_weight" size="mini" placeholder="重量"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods_number" label="库存" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_number" size="mini" placeholder="库存"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="140">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-check"
                      circle
                      @click="specSave(scope.$index, scope.row)"
                    ></el-button>
                    <el-switch
                      v-model="scope.row.is_on_sale"
                      size="mini"
                      activeText=""
                      inactiveText=""
                      activeValue="1"
                      inactiveValue="0"
                      @change="changeProductStatus($event, scope.row.id)"
                    ></el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="120"></el-table-column>
          <el-table-column prop="list_pic_url" label="商品图片" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.list_pic_url" alt="" style="width: 40px;height: 40px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="sort_order" label="排序" width="140" sortable>
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.sort_order"
                class="sort-width"
                size="mini"
                :min="1"
                :max="100"
                controlsPosition="right"
                placeholder="排序"
                @blur="submitSort(scope.$index, scope.row)"
                @change="submitSort(scope.$index, scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="sell_volume" label="销量" width="80" sortable></el-table-column>
          <el-table-column prop="goods_number" label="库存" width="80" sortable></el-table-column>
          <el-table-column label="首页显示" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_index" activeText="" inactiveText="" @change="changeShowStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="上架" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_on_sale" activeText="" inactiveText="" @change="changeStatus($event, scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" plain type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          :currentPage="page"
          :pageSize="size"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { updateStockByHand, updateGoodsNumber, updatePrice, checkSku, updateShortName, updateSort, goodDestory, getGood, onsale, out, drop, sort, saleStatus, productStatus, indexShowStatus} from '@/api/goods/goods'
export default {
  components: {},
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      filterForm: {
        name: ''
      },
      tableData: [],
      activeName: 'second',
      pIndex: 0,
      num: 0,
      activeClass: 0,
      expand: true,
      tableDa: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  mounted() {
    this.getOnSaleList()
  },
  methods: {
    stockSyc() {
      this.$confirm('确定要同步库存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await updateStockByHand()
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '同步成功'
          })
          this.getOnSaleList()
        }
      })
    },
    async updateGoodsNumber() {
      let res = await updateGoodsNumber()
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '同步成功2/2，完成'
        })
      }
    },
    async specSave(index, row) {
      if (row.goods_name === '' || row.value === '' || row.cost === '' || row.retail_price === '' || row.goods_weight === '') {
        this.$message({
          type: 'error',
          message: '值不能为空!'
        })
        return false
      }
      let res = await updatePrice(row)
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.errmsg
        })
      }
    },
    async checkSkuOnly(index, row) {
      if (!row.goods_sn) {
        this.$message({
          type: 'error',
          message: 'SKU不能为空'
        })
        return false
      }
      let res = await checkSku({ info: row })
      if(res.errno === 100) {
        this.$message({
          type: 'error',
          message: '该SKU已存在！'
        })
      } else {
        this.$message({
          type: 'success',
          message: '该SKU可以用！'
        })
      }
    },
    expandToggle() {
      this.expand = !this.expand
    },
    test() {
      console.log(this.tableData)
    },
    async submitName(index, row) {
      let res = await updateShortName({ id: row.id, short_name: row.short_name })
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }
    },
    async submitSort(index, row) {
      let res = await updateSort({ id: row.id, sort: row.sort_order })
      if(!res.errno) {
        console.log(res)
      }
    },
    handleClick(tab) {
      const pindex = tab._data.index
      this.page = 1
      this.activeClass = 0
      if (+pindex === 0) {
        this.getList()
        this.pIndex = 0
      } else if (+pindex === 1) {
        this.getOnSaleList()
        this.pIndex = 1
      } else if (+pindex === 2) {
        this.getOutList()
        this.pIndex = 2
      } else if (+pindex === 3) {
        this.getDropList()
        this.pIndex = 3
      }
    },
    handlePageChange(val) {
      this.page = val
      const nIndex = this.pIndex
      if (+nIndex === 0) {
        this.getList()
      } else if (+nIndex === 1) {
        this.getOnSaleList()
      } else if (+nIndex === 2) {
        this.getOutList()
      } else if (+nIndex === 3) {
        this.getDropList()
      } else if (+nIndex === 4) {
        this.sortOrder(this.num)
      }
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'goods_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await goodDestory({ id: row.id })
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            const pIndex = localStorage.getItem('pIndex')

            if (+pIndex === 0) {
              this.getList()
            } else if (+pIndex === 1) {
              this.getOnSaleList()
            } else if (+pIndex === 2) {
              this.getOutList()
            } else if (+pIndex === 3) {
              this.getDropList()
            }
          }
        })
    },
    onSubmitFilter() {
      this.page = 1
      this.getList()
    },
    async clear() {
      let res = await getGood({
        page: this.page,
        name: ''
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
        this.filterForm.name = ''
      }
    },
    async getList() {
      let res = await getGood({
        page: this.page,
        size: this.size,
        name: this.filterForm.name
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    },
    async getOnSaleList() {
      let res = await onsale({
        page: this.page,
        size: this.size
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    },
    async getOutList() {
      let res = await out({
        page: this.page,
        size: this.size
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    },
    async getDropList() {
      let res = await drop({
        page: this.page,
        size: this.size
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    },
    async sortOrder(num) {
      this.num = num
      this.pIndex = 4
      this.activeClass = num
      let res = await sort({
        page: this.page,
        size: this.size,
        index: num
      })
      if(!res.errno) {
        this.tableData = res.data.data
        this.page = res.data.currentPage
        this.total = res.data.count
      }
    },
    async changeStatus($event, para) {
      let res = await saleStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    async changeProductStatus($event, para) {
      let res = await productStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
      }
    },
    async changeShowStatus($event, para) {
      let res = await indexShowStatus({
        status: $event,
        id: para
      })
      if(!res.errno) {
        console.log(res)
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
</style>
