<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'nature' }">商品设置</el-breadcrumb-item>
        <el-breadcrumb-item>{{ infoForm.id ? '编辑分类' : '添加分类' }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav"><el-button type="primary" icon="arrow-left" @click="goBackPage">返回列表</el-button></div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" labelWidth="120px">
          <el-form-item label="分类名称" prop="name"><el-input v-model="infoForm.name"></el-input></el-form-item>
          <el-form-item label="简短介绍">
            <el-input v-model="infoForm.front_name" type="textarea" :rows="1"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item v-if="infoForm.parent_id == 0" label="分类图片" prop="img_url">
            <img v-if="infoForm.img_url" :src="infoForm.img_url" class="image-show">
            <el-upload
              class="upload-demo"
              name="file"
              :action="qiniuZone"
              :onRemove="bannerRemove"
              :beforeRemove="beforeBannerRemove"
              :fileList="fileList"
              :onSuccess="handleUploadBannerSuccess"
              :data="picData"
              :beforeUpload="getQiniuToken"
            >
              <el-button v-if="!infoForm.img_url" size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div class="form-tip">图片尺寸：顶级分类为690*自定义, 只能上传jpg/png文件</div>
          </el-form-item>
          <!-- <el-form-item v-if="infoForm.parent_id == 0" label="分类图片高度" prop="name"><el-input v-model="infoForm.p_height"></el-input></el-form-item> -->
          <el-form-item v-if="infoForm.parent_id == 0" label="图标" prop="icon_url">
            <img v-if="infoForm.icon_url" :src="infoForm.icon_url" class="image-show">
            <el-upload
              class="upload-demo"
              name="file"
              :action="qiniuZone"
              :onRemove="iconRemove"
              :beforeRemove="beforeIconRemove"
              :fileList="fileList2"
              :data="picData"
              :onSuccess="handleUploadIconSuccess"
              :beforeUpload="getQiniuToken"
            >
              <el-button v-if="!infoForm.icon_url" size="small" type="primary">点击上传</el-button>
            </el-upload>

            <div class="form-tip">图片尺寸：图标250*250, 只能上传jpg/png文件</div>
          </el-form-item>
          <el-form-item label="排序"><el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number></el-form-item>
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
import api from '@/config/api'
import {
  categoryInfo,
  getTopCategory,
  saveStore,
  deleteIconImage,
  deleteBannerImage,
  getQiniuToken
} from '@/api/category/category'

export default {
  components: {
    // ElFormItem,
  },
  data() {
    return {
      qiniuZone: '',
      fileList: [],
      fileList2: [],
      parentCategory: [
        {
          id: 0,
          name: '顶级分类'
        }
      ],
      infoForm: {
        id: 0,
        name: '',
        parent_id: 0,
        front_name: '',
        img_url: '',
        sort_order: 100,
        icon_url: ''
        // is_show: true,
      },
      infoRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        front_name: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        img_url: [{ required: true, message: '请选择分类图片', trigger: 'blur' }],
        icon_url: [{ required: true, message: '请选择分类图标', trigger: 'blur' }]
      },
      picData: {
        token: ''
      },
      url: ''
    }
  },
  mounted() {
    this.getTopCategory()
    this.infoForm.id = this.$route.query.id || 0
    this.getInfo()
    this.qiniuZone = api.qiniu
    this.getQiniuToken()
  },
  methods: {
    async getQiniuToken() {
      let res = await getQiniuToken()
      if(!res.errno) {
        const resInfo = res.data
        this.picData.token = resInfo.token
        this.url = resInfo.url
      }
    },
    beforeBannerRemove() {
      return this.$confirm('确定移除该图？删除后将无法找回')
    },
    beforeIconRemove() {
      return this.$confirm('确定移除图标？删除后将无法找回')
    },
    async bannerRemove() {
      this.infoForm.img_url = ''
      let res = await deleteBannerImage({
        id: this.infoForm.id
      })
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },
    async iconRemove() {
      this.infoForm.icon_url = ''
      let res = await deleteIconImage({
        id: this.infoForm.id
      })
      if(!res.errno) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },
    goBackPage() {
      this.$router.go(-1)
    },
    onSubmitInfo() {
      this.infoForm.level = +this.infoForm.parent_id === 0 ? 'L1' : 'L2'
      console.log(this.infoForm.level)
      this.$refs.infoForm.validate(async (valid) => {
        if (valid) {
          let res = await saveStore(this.infoForm)
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.go(-1)
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
    handleUploadBannerSuccess(res) {
      const url = this.url
      this.infoForm.img_url = url + res.key
    },
    handleUploadIconSuccess(res) {
      const url = this.url
      this.infoForm.icon_url = url + res.key
    },
    async getTopCategory() {
      let res = await getTopCategory()
      if(!res.errno) {
        this.parentCategory = this.parentCategory.concat(res.data)
      }
    },
    async getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      // 加载分类详情
      let res = await categoryInfo({
        id: this.infoForm.id
      })
      if(!res.errno) {
        const resInfo = res.data
        const data = {
          name: '分类图',
          url: resInfo.img_url
        }
        this.fileList.push(data)
        const iconData = {
          name: '图标',
          url: resInfo.icon_url
        }
        this.fileList2.push(iconData)
        this.infoForm = resInfo
      }
    }
  }
}
</script>

<style scoped>
.image-uploader {
  height: 105px;
}

.image-uploader .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 105px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-show {
  background-color: #f8f8f8;
  min-width: 105px;
  height: 105px;
  display: block;
}
</style>
