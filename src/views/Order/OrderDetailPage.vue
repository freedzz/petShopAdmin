<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'order' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ infoForm.order_sn ? '订单详情' : '添加订单' }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" size="small" icon="arrow-left" @click="goBackPage">返回列表</el-button>
      </div>
    </div>
    <div class="order-status-text">
      <label>{{ infoForm.order_status_text }}</label>
      <div>
        <el-button type="danger" plain @click="changeStatus">变更状态</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="订单信息" name="first">
            <div class="content-title marginTop">买家信息：</div>
            <el-table :data="addressData" style="width: 100%" border stripe>
              <el-table-column prop="user_id" label="用户id" width="70"></el-table-column>
              <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
              <el-table-column prop="avatar" label="头像" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" alt="" style="width: 60px;height: 60px">
                </template>
              </el-table-column>
              <el-table-column prop="name" label="客户名" width="100"></el-table-column>
              <el-table-column prop="mobile" label="客户手机" width="120"></el-table-column>
              <el-table-column prop="address" label="客户地址"></el-table-column>
              <el-table-column prop="postscript" label="买家备注" width="300"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="addressEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="content-title marginTop">货物信息：</div>
            <el-table :data="infoForm.goodsList" style="width: 100%" border stripe>
              <el-table-column prop="goods_sn" label="商品SKU" width="120"></el-table-column>
              <el-table-column prop="list_pic_url" label="商品图" width="120">
                list_pic_url
                <template slot-scope="scope">
                  <img :src="scope.row.list_pic_url" alt="" style="width: 60px;height: 60px">
                </template>
              </el-table-column>
              <el-table-column prop="goods_name" label="商品名"></el-table-column>
              <el-table-column prop="goods_specifition_name_value" label="型号" width="100"></el-table-column>
              <el-table-column prop="retail_price" label="售价" width="100"></el-table-column>
              <el-table-column prop="number" label="购买数量" width="100"></el-table-column>
              <el-table-column label="小计" width="100">
                <template slot-scope="scope">
                  <label>{{ scope.row.retail_price * scope.row.number }}</label>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="goodsListEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="detail-wrap">
              <div class="total-price">优惠：¥{{ infoForm.promotions_price }}</div>
              <div class="total-price">合计：¥{{ infoForm.actual_price }}（含运费：¥{{ infoForm.freight_price }}）</div>
              <div class="total-price">改价前：¥{{ infoForm.change_price }}（含运费：¥{{ infoForm.freight_price }}）</div>
              <div class="total-price">
                {{
                  infoForm.change_price - infoForm.actual_price > 0
                    ? '优惠金额：' + (infoForm.change_price - infoForm.actual_price).toFixed(2)
                    : '涨价金额：' + (infoForm.actual_price - infoForm.change_price).toFixed(2)
                }}
              </div>
            </div>
            <div class="memo-wrap">
              <div class="content-title">卖家备注：</div>
              <el-input
                v-model="infoForm.admin_memo"
                class="memo-input"
                type="textarea"
                autosize
                placeholder="请输入内容"
              ></el-input>
              <el-button size="small" type="primary" @click="saveAdminMemo">保存</el-button>
            </div>

            <div class="footer">
              <div class="item">
                <div class="t">订单ID：</div>
                <div class="c">{{ infoForm.id }}</div>
              </div>
              <div class="item">
                <div class="t">订单号：</div>
                <div class="c">{{ infoForm.order_sn }}</div>
              </div>
              <div class="item">
                <div class="t">加入时间：</div>
                <div class="c">{{ infoForm.add_time }}</div>
              </div>
              <div v-if="infoForm.pay_time" class="item">
                <div class="t">付款时间：</div>
                <div class="c">{{ infoForm.pay_time }}</div>
              </div>
              <div v-if="infoForm.shipping_time" class="item">
                <div class="t">发货时间：</div>
                <div class="c">{{ infoForm.shipping_time }}</div>
              </div>
              <div v-if="infoForm.confirm_time" class="item">
                <div class="t">确认时间：</div>
                <div class="c">{{ infoForm.confirm_time }}</div>
              </div>
              <div v-if="infoForm.dealdone_time" class="item">
                <div class="t">完成时间：</div>
                <div class="c">{{ infoForm.dealdone_time }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="物流信息" name="second">
            <div v-if="expressData.logistic_code == ''" class="no-traces">暂无物流信息</div>
            <div v-else class="has-traces">
              <p>
                <label>快递公司：</label>
                <span>{{ expressData.shipper_name }}</span>
              </p>
              <p>
                <label>快递单号：</label>
                <span>{{ expressData.logistic_code }}</span>
              </p>
              <p><label>快递轨迹：</label></p>
              <div v-if="on_posting == 1" class="posting">正在查询，请稍候...</div>

              <ul class="traces-wrap">
                <li v-for="(item, index) in expressData.traces" :key="index" class="traces-list">
                  <div class="traces-time">{{ item.time }}</div>
                  <div class="traces-content">{{ item.status }}</div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!--<div class="content-title">买家信息：</div>-->
      </div>
    </div>
    <el-dialog title="修改地址" :visible.sync="dialogAddressVisible">
      <el-form :model="nowAddressData">
        <el-form-item label="所在地区:" labelWidth="120px"><el-cascader v-model="addOptions" :options="options" placeholder="请选择"></el-cascader></el-form-item>
        <el-form-item label="详细地址:" labelWidth="120px">
          <el-input v-model="nowAddressData.cAddress" class="el-input" autoComplete="off" placeholder="请输入详细地"></el-input>
        </el-form-item>
        <el-form-item label="收货人:" labelWidth="120px">
          <el-input v-model="nowAddressData.name" class="el-input" autoComplete="off" placeholder="请输入收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机:" labelWidth="120px">
          <el-input v-model="nowAddressData.mobile" class="el-input" autoComplete="off" placeholder="请输入收货人手机"></el-input>
        </el-form-item>
        <el-form-item label="留言:" labelWidth="120px">
          <el-input
            v-model="nowAddressData.postscript"
            class="el-input"
            autoComplete="off"
            placeholder=""
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddress">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改商品" :visible.sync="dialogGoodsListVisible">
      <el-form :model="goodsData">
        <el-form-item label="id:" labelWidth="120px">
          <label>{{ goodsData.goods_id }}</label>
        </el-form-item>
        <el-form-item label="商品图:" labelWidth="120px">
          <template>
            <img :src="goodsData.list_pic_url" alt="" style="width: 60px;height: 60px">
          </template>
        </el-form-item>
        <el-form-item label="商品名:" labelWidth="120px">
          <label>{{ goodsData.goods_name }}</label>
        </el-form-item>
        <el-form-item label="商品型号:" labelWidth="120px">
          <label>{{ goodsData.goods_specifition_name_value }}</label>
        </el-form-item>
        <el-form-item label="售价:" labelWidth="120px">
          <label>{{ goodsData.retail_price }}</label>
        </el-form-item>
        <el-form-item label="购买数量:" labelWidth="120px"><el-input-number v-model="goodsData.number" :min="1" label="购买的数量"></el-input-number></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsListVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGoodsList">保存并返回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定打包备货</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="PackageConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="变更状态" :visible.sync="statusVisible" width="30%">
      <el-form :model="statusData">
        <el-form-item label="状态:" labelWidth="120px">
          <el-select v-model="statusValue" class="el-select-class" placeholder="选择状态">
            <!---->
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusVisible = false">取 消</el-button>
        <el-button type="primary" @click="statusConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderChangeStatus,
  getOrderExpress,
  goodsListDelete,
  saveGoodsList,
  saveAddress,
  orderpack,
  saveAdminMemo,
  getAllRegion,
  getOrderDetail,
} from '@/api/order/order'

export default {
  data() {
    return {
      statusList: [
        {
          value: '101',
          label: '待付款'
        },
        {
          value: '102',
          label: '交易关闭'
        },
        {
          value: '300',
          label: '待发货'
        },
        {
          value: '301',
          label: '已发货'
        },
        {
          value: '401',
          label: '交易成功'
        }
      ],
      statusVisible: false,
      statusValue: '',
      statusData: {},
      activeName: 'first',
      dialogVisible: false,
      dialogAddressVisible: false,
      dialogGoodsListVisible: false,
      addressData: [],
      infoForm: {
        order_sn: 0
      },
      infoRules: {
        user_id: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        order_sn: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        order_status: [{ required: true, message: '请选择商品图片', trigger: 'blur' }]
      },
      options: [],
      addOptions: [],
      nowAddressData: {},
      goodsData: {},
      oldGoodsNumber: 0,
      expressData: {},
      is_finish: 0,
      on_posting: 0
    }
  },
  mounted() {
    this.infoForm.id = this.$route.query.id || 0
    this.getInfo()
    this.getAllRegion()
  },
  methods: {
    changeStatus() {
      this.statusVisible = true
    },
    async statusConfirm() {
      let res = await orderChangeStatus({
        status: this.statusValue,
        orderSn: this.infoForm.order_sn
      })
      if(!res.errno) {
        this.getInfo()
        this.statusVisible = false
      }
    },
    async handleClick(tab) {
      const pindex = tab._data.index
      if (+pindex === 1) {
        if (+this.is_finish === 0) {
          this.on_posting = 1
          let res = await getOrderExpress({
            orderId: this.infoForm.id
          })
          if(!res.errno) {
            this.expressData = res.data
            this.expressData.traces = JSON.parse(this.expressData.traces)
            this.is_finish = res.data.is_finish
            this.on_posting = 0
          }
        }
      }
    },
    async PackageConfirm() {
      let res = await orderpack({
        orderSn: this.infoForm.order_sn
      })
      if(!res.errno) {
        this.dialogVisible = false
        this.addressData = []
        this.getInfo()
      }
    },
    goPackage() {
      this.dialogVisible = true
    },
    test() {
      console.log(this.addressData)
      console.log(this.infoForm)
    },
    handleRowDelete(index, row) {
      this.goodsData = row
      this.goodsData.order_id = this.infoForm.id
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await goodsListDelete({
            ...this.goodsData
          })
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$router.go(-1)
          }
        })
    },
    async saveGoodsList() {
      this.goodsData.order_id = this.infoForm.id
      const old = this.oldGoodsNumber
      const now = this.goodsData.number
      console.log(old)
      console.log(now)

      if (old !== now) {
        let number = 0
        let addOrMinus = 0
        if (old > now) {
          number = old - now
        } else {
          number = now - old
          addOrMinus = 1
        }
        this.goodsData.number = number
        this.goodsData.addOrMinus = addOrMinus
        let res = await saveGoodsList(this.goodsData)
        if(!res.errno) {
          this.$router.go(-1)
        }
      } else {
        this.dialogGoodsListVisible = false
      }
    },
    async saveAdminMemo() {
      let res = await saveAdminMemo({
        text: this.infoForm.admin_memo,
        id: this.infoForm.id
      })
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      }
    },
    async saveAddress() {
      this.nowAddressData.order_sn = this.infoForm.order_sn
      this.nowAddressData.addOptions = this.addOptions
      let res = await saveAddress(this.nowAddressData)
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.addressData = []
        this.getInfo()
        this.dialogAddressVisible = false
      } else {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
      }
    },
    onSubmitInfo() {
      console.log('onSubmitInfo')
    },
    goBackPage() {
      this.$router.go(-1)
    },
    addressEdit() {
      this.dialogAddressVisible = true
    },
    goodsListEdit(index, info) {
      console.log(info)
      this.goodsData = info
      this.oldGoodsNumber = info.number
      this.dialogGoodsListVisible = true
    },
    async getAllRegion() {
      let res = await getAllRegion()
      if(!res.errno) {
        this.options = res.data
      }
    },
    async getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      let res = await getOrderDetail({
        orderId: this.infoForm.id
      })
      if(!res.errno) {
        this.infoForm = res.data.orderInfo
        const data = {
          user_id: this.infoForm.user_id,
          name: this.infoForm.consignee,
          nickname: this.infoForm.user_name,
          avatar: this.infoForm.avatar,
          mobile: this.infoForm.mobile,
          postscript: this.infoForm.postscript,
          address: this.infoForm.full_region + this.infoForm.address,
          cAddress: this.infoForm.address
        }
        this.addressData = []
        this.addressData.push(data)
        this.nowAddressData = data
        this.addOptions.push(this.infoForm.province, this.infoForm.city, this.infoForm.district)
      }
    }
  }
}
</script>

<style scoped>
.no-traces {
  width: 100%;
  line-height: 100px;
  font-size: 15px;
}

.has-traces {
  width: 100%;
}

.has-traces p {
  height: 30px;
  line-height: 30px;
}

.has-traces p label {
  font-size: 15px;
  color: #6f6f6f;
  width: 100px;
}

.has-traces .traces-wrap {
  margin-bottom: 20px;
  margin-left: 80px;
}

.traces-wrap li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
}

.traces-wrap .traces-time {
  font-size: 15px;
  width: 160px;
}

.traces-wrap .traces-content {
  font-size: 15px;
}
.memo-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.memo-input {
  margin-right: 10px;
}
.order-status-text {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-title {
  margin-bottom: 8px;
  font-size: 14px;
}

.marginTop {
  margin-top: 20px;
}

.footer {
  width: 100%;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid #d1dbe5;
}

.footer .item {
  font-size: 14px;
  color: #5e7382;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.detail-wrap {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #f1f1f1;
  margin: 20px 0;
}

.total-price {
  width: 100%;
  font-size: 14px;
  margin: 6px 0;
}
.item .t {
  width: 80px;
}
</style>
