<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'goods' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ infoForm.id ? '编辑商品' : '添加商品' }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <!-- <el-button type="primary" @click="test">测试</el-button> -->
        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
        <el-button icon="arrow-left" @click="goBackPage">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" labelWidth="120px">
          <el-form-item label="商品分类">
            <el-select v-model="cateId" class="el-select-class" placeholder="选择型号分类">
              <el-option v-for="item in cateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="infoForm.list_pic_url" label="商品图片" prop="list_pic_url" class="image-uploader-diy new-height">
            <div class="index-image">
              <el-image
                v-if="infoForm.list_pic_url"
                :previewSrcList="previewList"
                :src="infoForm.list_pic_url"
                class="image-show"
                fit="cover"
                @click="previewIndexImg"
              ></el-image>
              <div class="o-shadow" @click="delePicList"><i class="el-icon-delete"></i></div>
            </div>
          </el-form-item>
          <el-form-item v-if="!infoForm.list_pic_url" label="商品图片" prop="list_pic_url">
            <el-upload
              ref="upload"
              name="file"
              class="upload-demo"
              :action="qiniuZone"
              :onSuccess="handleSuccess"
              :beforeUpload="indexImgBefore"
              :autoUpload="true"
              listType="picture-card"
              :data="picData"
              :httpRequest="uploadIndexImg"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品轮播图" prop="goods_sn">
            <draggable v-model="gallery_list" draggable=".gallery-item" class="drag-wrap">
              <div v-for="(element, index) in gallery_list" v-show="element.is_delete === 0" :key="index" class="gallery-item">
                <el-image
                  :previewSrcList="previewList"
                  style="width: 148px; height: 148px;margin:0 10px 10px 0;"
                  :src="element.url"
                  fit="cover"
                  @click="previewImg(index)"
                ></el-image>
                <div class="shadow" @click="onRemoveHandler(index)"><i class="el-icon-delete"></i></div>
              </div>
              <el-upload
                ref="upload"
                name="file"
                :onRemove="galleryRemove"
                class="upload-demo"
                :action="qiniuZone"
                :onPreview="galleryPreview"
                :showFileList="false"
                :data="picData"
                :beforeUpload="galleryBefore"
                :onError="hasErrorAct"
                :onSuccess="handleSuccess"
                :autoUpload="true"
                multiple
                listType="picture-card"
                :httpRequest="uploadGalleryImg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </draggable>
          </el-form-item>
          <el-form-item label="商品名称" prop="name"><el-input v-model="infoForm.name"></el-input></el-form-item>
          <el-form-item label="商品简介" prop="goods_brief">
            <el-input v-model="infoForm.goods_brief" type="textarea" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="商品单位" prop="goods_unit">
            <el-input v-model="infoForm.goods_unit"></el-input>
            <div class="form-tip">如：件、包、袋</div>
          </el-form-item>
          <el-form-item label="销量" prop="sell_volume"><el-input v-model="infoForm.sell_volume"></el-input></el-form-item>
          <el-form-item label="型号和价格">
            <div>
              <el-select v-model="specValue" class="el-select-class" placeholder="选择型号分类">
                <el-option v-for="item in specOptionsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="spec-wrap">
              <el-table :data="specData" stripe style="width: 100%">
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
                <el-table-column prop="value" label="型号/规格" width="130">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" size="mini" placeholder="如1斤/条"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="cost" label="成本(元)" width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cost" size="mini" placeholder="成本"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="retail_price" label="零售(元)" width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.retail_price" size="mini" placeholder="零售"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods_weight" label="重量(KG)" width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_weight" size="mini" placeholder="重量"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods_number" label="库存" width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_number" size="mini" placeholder="库存"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="70">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="specDelete(scope.$index, scope.row)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="marginTop20" type="primary" @click="addSpecData">新增型号</el-button>
            </div>
          </el-form-item>
          <el-form-item label="属性设置" class="checkbox-wrap">
            <el-checkbox-group v-model="infoForm.is_new" class="checkbox-list"><el-checkbox label="新品" name="is_new"></el-checkbox></el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择快递模板">
            <el-select v-model="kdValue" placeholder="请选择快递" @change="kdChange">
              <el-option v-for="item in kdOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort_order"><el-input-number v-model="infoForm.sort_order" :mini="1" :max="100"></el-input-number></el-form-item>
          <el-form-item label=" ">
            <el-switch
              v-model="infoForm.is_on_sale"
              activeText="上架"
              inactiveText="下架"
              activeValue="1"
              inactiveValue="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="商品详情" prop="goods_desc">
            <div class="edit_container">
              <quill-editor
                ref="myTextEditor"
                v-model="infoForm.goods_desc"
                class="editer"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </div>
          </el-form-item>
          <!-- 图片上传组件辅助-->
          <el-form-item class="upload_ad">
            <el-upload
              ref="upload"
              name="file"
              class="avatar-uploader"
              :action="qiniuZone"
              listType="picture-card"
              :fileList="detail_list"
              :beforeUpload="beforeUpload"
              :onSuccess="handleSuccess"
              :data="picData"
              multiple
              :httpRequest="uploadDetailsImg"
            ></el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
            <el-button @click="goBackPage">返回列表</el-button>
            <el-button v-if="infoForm.id > 0" type="danger" class="float-right" @click="onCopyGood">复制商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny"><img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
  </div>
</template>

<script>
import api from '@/config/api'
import lrz from 'lrz'
import moment from 'moment'
import draggable from 'vuedraggable'
import $ from 'jquery'
import { quillEditor } from 'vue-quill-editor'
import { uploadToQiniu, checkSku, goodsStore, uploadHttpsImage, getGoodsSpec, getQiniuToken, getGalleryList, copygoods, goodsInfo, getAllCategory, getAllSpecification, getExpressData } from '@/api/goods/goods'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    }
  ],
  [
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ],
  [
    {
      size: ['small', false, 'large', 'huge']
    }
  ],
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ],
  ['link', 'image', 'video']
]
export default {
  components: {
    // ElFormItem,
    // ElForm,
    quillEditor,
    draggable
  },
  data() {
    return {
      root: '',
      qiniuZone: '',
      picData: {
        token: ''
      },
      url: '',
      kdOptions: [],
      kdValue: '',
      cateId: '',
      detail_list: [],
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      cateOptions: [],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      category: [],
      infoForm: {
        name: '',
        list_pic_url: '',
        goods_brief: '',
        goods_desc: '',
        is_on_sale: 0,
        is_new: false
        // is_index: false,
      },
      infoRules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        goods_brief: [
          {
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }
        ],
        list_pic_url: [
          {
            required: true,
            message: '请选择商品图片',
            trigger: 'blur'
          }
        ]
      },
      specRules: {
        value: [
          {
            required: true,
            message: '请输入型号名',
            trigger: 'blur'
          }
        ]
      },
      specData: [
        {
          goods_sn: '',
          value: '',
          cost: '',
          retail_price: '',
          goods_weight: '',
          goods_number: ''
        }
      ],
      specOptionsList: [],
      specValue: 1,
      selectedSpec: '规格',
      is_has_spec: false,
      gallery: {
        goods_id: 0
      },
      gallery_list: [],
      visible: false,
      hasPost: 0,
      previewList: [],
      autoFocus: false
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted() {
    this.infoForm.id = this.$route.query.id || 0
    this.getInfo()
    this.getAllCategory()
    this.getExpressData()
    this.getQiniuToken()
    this.getAllSpecification()
    if (this.infoForm.id > 0) {
      this.getSpecData()
      this.getGalleryList()
    }
    this.root = api.rootUrl
    this.qiniuZone = api.qiniu
  },
  methods: {
    handleSuccess() {
      console.log(11)
    },
    uploadIndexImg(request) {
      const file = request.file
      lrz(file)
        .then(async (rst) => {
          const fileName = moment().format('YYYYMMDDHHmmssSSS') + Math.floor(Math.random() * 100) + file.name // 自定义图片名
          const formData = new FormData()
          formData.append('file', rst.file)
          formData.append('token', this.picData.token)
          formData.append('key', fileName)
          let res = await uploadToQiniu(this.qiniuZone, formData)
          if(res) {
            this.handleUploadListSuccess(res)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    async handleUploadListSuccess(res) {
      this.infoForm.list_pic_url = this.url + res.key
      let res2 = await uploadHttpsImage({
        url: this.infoForm.list_pic_url
      })
      if(!res2.errno) {
        this.infoForm.https_pic_url = res2.data
      }
    },
    onRemoveHandler(index) {
      const that = this
      that
        .$confirm('确定删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const arr = that.gallery_list
          arr[index].is_delete = 1
        })
    },
    uploadGalleryImg(request) {
      const file = request.file
      lrz(file)
        .then(async (rst) => {
          const fileName = moment().format('YYYYMMDDHHmmssSSS') + Math.floor(Math.random() * 100) + file.name // 自定义图片名
          const formData = new FormData()
          formData.append('file', rst.file)
          formData.append('token', this.picData.token)
          formData.append('key', fileName)
          let res = await uploadToQiniu(this.qiniuZone, formData)
          if(res) {
            this.handleUploadGallerySuccess(res)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    handleUploadGallerySuccess(res) {
      const urlData = this.url + res.key
      const data = {
        id: 0,
        url: urlData,
        is_delete: 0
      }
      this.gallery_list.push(data)
    },
    test() {
      console.log(this.gallery_list)
    },
    previewIndexImg() {
      const that = this
      that.previewList = []
      that.previewList.push(that.infoForm.list_pic_url)
    },
    previewImg(index) {
      const that = this
      that.previewList = []
      const arr = that.gallery_list
      that.previewList.push(arr[index].url)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    async checkSkuOnly(index, row) {
      if (!row.goods_sn) {
        this.$message({
          type: 'error',
          message: 'SKU不能为空'
        })
        return false
      }
      let res = await checkSku({
        info: row
      })
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
    async getSpecData() {
      let res = await getGoodsSpec({
        id: this.infoForm.id
      })
      if(!res.errno) {
        const info = res.data
        this.specData = info.specData
        this.specValue = info.specValue
      }
    },
    addSpecData() {
      const ele = {
        goods_sn: '',
        value: '',
        cost: '',
        retail_price: '',
        goods_weight: '',
        goods_number: ''
      }
      this.specData.push(ele)
    },
    specDelete(index) {
      this.specData.splice(index, 1)
    },
    testCallBack() {
      console.log(this.specValue)
    },
    hasErrorAct(err) {
      console.log(err)
    },
    async getQiniuToken() {
      let res = await getQiniuToken()
      if(!res.errno) {
        this.picData.token = res.data.token
        this.url = res.data.url
      }
    },
    specChange(value) {
      this.specForm.id = value
    },
    addPrimarySpec() {
      this.is_has_spec = true
    },
    getImgUrl() {
      const str = this.infoForm.goods_desc
      // 匹配图片（g表示匹配所有结果i表示区分大小写）
      const imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
      // 匹配src属性
      const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      const arr = str.match(imgReg)
      if (!arr) {
        return false
      }
      const data = []

      for (let i = 0; i < arr.length; i++) {
        const src = arr[i].match(srcReg)
        const jsonData = {}
        jsonData.url = src[1]
        data[i] = jsonData
      }
      this.detail_list = data
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    delePicList() {
      const that = this
      that
        .$confirm('确定删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.infoForm.list_pic_url = ''
        })
    },
    indexImgBefore() {
      this.getQiniuToken()
    },
    galleryBefore(file) {
      this.picData.key = new Date().getTime() + Math.floor(Math.random() * 100) + file.name // 自定义图片名
      this.getQiniuToken()
    },
    galleryRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    galleryPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async getGalleryList() {
      let res = await getGalleryList({
        goodsId: this.infoForm.id
      })
      if(!res.errno) {
        this.gallery_list = res.data.galleryData
      }
    },
    kdChange(kdValue) {
      this.infoForm.freight_template_id = kdValue
    },
    timeChange(val) {
      console.log(val)
      // this.infoForm.freight_template_id = kdValue;
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },

    beforeUpload() {
      this.getQiniuToken()
      this.quillUpdateImg = true
    },
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    goBackPage() {
      this.$router.go(-1)
    },
    // 富文本插入网络图片
    onLinkImageUrl() {
      var imageurl = document.querySelector('.url-image-fuzhu input').value
      const quill = this.$refs.myTextEditor.quill
      const length = quill.getSelection().index
      quill.insertEmbed(length, 'image', imageurl)
      quill.setSelection(length + 1)
    },
    onCopyGood() {
      this.$confirm('确定复制该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await copygoods({
          id: this.infoForm.id
        })
        if(!res.errno) {
          this.$message({
            type: 'success',
            message: '复制成功!'
          })
        }
      })
    },
    onSubmitInfo() {
      this.$refs.infoForm.validate(async (valid) => {
        if (valid) {
          if (!this.infoForm.list_pic_url) {
            this.$message({
              type: 'error',
              message: '请上传商品首图！'
            })
            return false
          }
          if (this.gallery_list.length === 0) {
            this.$message({
              type: 'error',
              message: '请至少上传一张轮播图！'
            })
            return false
          }
          if (this.specData.length === 0) {
            this.$message({
              type: 'error',
              message: '请添加一个规格型号'
            })
            return false
          }
          for (const ele of this.specData) {
            if (ele.cost === '' || ele.goods_sn === '' || ele.goods_weight === '' || ele.retail_price === '' || ele.value === '') {
              this.$message({
                type: 'error',
                message: '型号和价格的值不能为空'
              })
              return false
            }
          }
          this.infoForm.gallery = this.gallery_list
          // return false;
          let res = await goodsStore({
            info: this.infoForm,
            specData: this.specData,
            specValue: this.specValue,
            cateId: this.cateId
          })
          if(!res.errno) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.infoForm.id = res.data
            this.getGalleryList()
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
    uploadDetailsImg(request) {
      const file = request.file
      lrz(file)
        .then(async (rst) => {
          const fileName = moment().format('YYYYMMDDHHmmssSSS') + Math.floor(Math.random() * 100) + file.name // 自定义图片名
          const formData = new FormData()
          formData.append('file', rst.file)
          formData.append('token', this.picData.token)
          formData.append('key', fileName)
          let res = await uploadToQiniu(this.qiniuZone, formData)
          if(res) {
            this.handleUploadDetailSuccess(res)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    handleUploadDetailSuccess(res) {
      const data = this.url + res.key
      const quill = this.$refs.myTextEditor.quill
      // 如果上传成功
      // 获取光标所在位置
      const length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', data)
      // 调整光标到最后
      quill.setSelection(length + 1)
      // this.$message.error('图片插入失败')
      // loading动画消失
      this.quillUpdateImg = false
    },
    async getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      // 加载商品详情
      let res = await goodsInfo({
        id: this.infoForm.id
      })
      if(!res.errno) {
        const resInfo = res.data
        const goodsInfo = resInfo.info
        // goodsInfo.is_index = goodsInfo.is_index ? true : false;
        goodsInfo.is_new = !!goodsInfo.is_new
        goodsInfo.is_on_sale = goodsInfo.is_on_sale ? '1' : '0'
        this.infoForm = goodsInfo
        this.kdValue = goodsInfo.freight_template_id
        this.cateId = resInfo.category_id
        this.getImgUrl()
      }
    },
    // 获取所有分类
    async getAllCategory() {
      let res = await getAllCategory({
        params: {}
      })
      if(!res.errno) {
        this.options = res.data
      }
    },
    async getAllSpecification() {
      let res = await getAllSpecification()
      if(!res.errno) {
        const resInfo = res.data
        this.specOptionsList = resInfo
      }
    },
    async getExpressData() {
      let res = await getExpressData({
        params: {}
      })
      if(!res.errno) {
        const options = res.data
        this.kdOptions = options.kd
        this.cateOptions = options.cate
      }
    },
    // summernote 上传图片，返回链接
    sendFile() {
      console.log('sendFile')
    },
    // 初始化 summernote
    initSummerNote() {
      const that = this
      $('#summernote').summernote({
        lang: 'zh-CN',
        placeholder: '请输入商品描述',
        height: 300,
        minHeight: 300,
        maxHeight: 400,
        focus: true,
        callbacks: {
          onBlur: function() {
            console.log(' on blur ')
            console.log($('#summernote').summernote('code'))
            that.infoForm.goods_desc = $('#summernote').summernote('code')
          },
          onImageUpload: function(files) {
            console.log('onImageUpLoad...')
            that.sendFile(files[0])
          }
        }
      }),
      // console.error(that.infoForm.goods_desc);
      $('#summernote').summernote('code', that.infoForm.goods_desc)
    }
  }
}
</script>

<style scoped>
.shadow,
.o-shadow {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 10px;
  cursor: pointer;
}

.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  position: relative;
}

.gallery-item:hover .shadow {
  opacity: 1;
}

.video-wrap {
  width: 300px;
}

.dialog-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.dialog-header .value {
  width: 150px;
  margin-right: 14px;
}

.input-wrap .el-input {
  width: 200px;
  float: left;
  margin: 0 20px 20px 0;
}

.input-wrap .el-input input {
  background-color: #fff !important;
  color: #233445 !important;
}

.specFormDialig .el-input {
  width: 150px;
  margin-right: 10px;
}

.el-select-class {
  width: 200px;
  margin-right: 20px;
}

.sepc-form {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.spec-form-wrap {
  margin-top: 0 !important;
}

.add-spec {
  margin-top: 10px;
}

.spec-form-wrap .header {
  display: flex;
  justify-content: flex-start;
}

.spec-form-wrap .header .l {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

/*.sepc-form div{*/
/*margin-left: 0;*/
/*}*/

.float-right {
  float: right;
}

.sepc-form .el-input {
  width: 200px;
  margin-right: 20px;
}

.marginTop20 {
  margin-top: 20px;
}

.checkbox-wrap .checkbox-list {
  float: left;
  margin-right: 20px;
}

.upload_ad {
  display: none;
}

.upload_ad .el-upload--picture-card {
  display: none;
}

.ql-container {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.image-uploader-diy {
  /*height: 200px;*/
  position: relative;
}

.image-uploader-diy .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader-diy .el-upload:hover {
  border-color: #20a0ff;
}

.image-uploader-diy .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.image-uploader-diy .image-show {
  min-width: 148px;
  height: 148px;
  background-color: #f9f9f9;
  display: block;
}

.index-image {
  width: 148px;
  height: 148px;
  position: relative;
}

.index-image:hover .o-shadow {
  opacity: 1;
}

.image-uploader-diy .new-image-uploader {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader-diy .new-image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader-diy .new-image-uploader .image-show {
  width: 165px;
  height: 105px;
  display: block;
}

.item-url-image-fuzhu .el-input {
  width: 260px;
}

.hidden {
  display: none;
}
</style>
