<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/"><el-breadcrumb-item>显示设置</el-breadcrumb-item></el-breadcrumb>
      <div class="operation-nav"><el-button type="primary" @click="onSubmitInfo">确定保存</el-button></div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :model="infoForm" labelWidth="120px">
          <el-form-item label="广告" prop="type">
            <el-radio-group v-model="infoForm.banner">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公告">
            <el-radio-group v-model="infoForm.notice">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告下的图标">
            <el-radio-group v-model="infoForm.channel">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">不显示</el-radio>
            </el-radio-group>
            <div class="form-tip">那几个图标</div>
          </el-form-item>
          <el-form-item label="首页分类图片或文字">
            <el-radio-group v-model="infoForm.index_banner_img">
              <el-radio :label="1">图片</el-radio>
              <el-radio :label="0">文字</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
            <el-button @click="goBackPage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { showsetStore, getShowset } from '@/api/showset/showset'

export default {
  components: {},
  data() {
    return {
      value: [],
      infoForm: {}
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    test() {
      console.log(this.value)
    },
    goBackPage() {
      this.$router.go(-1)
    },
    onSubmitInfo() {
      this.$refs['infoForm'].validate(async (valid) => {
        if (valid) {
          let res = await showsetStore(this.infoForm)
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
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
    async getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      //加载优惠券详情
      let res = await getShowset()
      if(!res.errno) {
        this.infoForm = res.data
      }
    }
  }
}
</script>
<style scoped>
.el-form-item .date-picker {
  width: 450px !important;
  max-width: 410px !important;
}
.el-form-item .date-picker input {
  width: 410px !important;
  max-width: 410px !important;
}
.margin-left {
  margin-left: 20px;
}
</style>
