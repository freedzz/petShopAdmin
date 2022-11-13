<template>
  <div class="com-image-drag">
    <div class="button-list">
      <el-button
        v-if="!drag_open"
        :disabled="banner_list.length <= 1"
        type="text"
        size="small"
        class="operation-success"
        @click="openDrag"
      ></el-button>
      <el-button
        v-if="drag_open"
        type="text"
        size="small"
        class="operation-success"
        @click="save"
      ></el-button>
      <el-button
        v-if="drag_open"
        type="text"
        size="small"
        class="operation-error"
        @click="cancle"
      ></el-button>
    </div>
    <div class="image-list">
      <!-- 拖拽层 -->
      <div class="list-wrap">
        <draggable
          v-model="banner_list"
          :options="{
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'chosenClass',
            scroll: true,
            scrollSensitivity: 200
          }"
        >
          <div v-for="($item, $index) in banner_list" :key="$index" class="image-item" :style="{ backgroundImage: `url(${$item.url})` }"></div>
        </draggable>
      </div>
      <!-- 展示层 -->
      <div v-show="!drag_open" class="list-wrap">
        <div
          v-for="($item, $index) in banner_list"
          :key="$index"
          class="image-item"
          :style="{ backgroundImage: `url(${$item.url})` }"
          @mouseover.prevent="$item.is_hover = true"
          @mouseleave.prevent="$item.is_hover = false"
        >
          <div v-show="!$item.is_hover" class="label"><i class="el-icon-upload-success el-icon-check icon-success"></i></div>
        </div>
        <el-upload
          listType="picture-card"
          name="file"
          class="upload-machine"
          :disabled="drag_open"
          action="https://up.qiniu.com/"
          :onSuccess="onSuccess"
          :beforeUpload="beforeUpload"
          :showFileList="false"
          :multiple="multiple"
          enctype="multipart/form-data"
        ></el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { getGalleryList } from '@/api/goods/goods'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default: () => ({})
    },
    beforeUpload: {
      type: Function,
      default: () => ({})
    },
    onError: {
      type: Function,
      default: () => ({})
    },
    onSuccess: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      banner_list: [], //拖拽插件不建议直接改变父组件的传值，所以另建一个新数组
      file_list: [], //保存开启拖拽之前排序的数组
      drag_open: false, //拖拽开启开关,
      infoForm: {}
    }
  },
  mounted() {
    this.infoForm.id = this.$route.query.id || 0
    this.getInfo()
  },
  methods: {
    async getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      let res = await getGalleryList({
        params: {
          id: this.infoForm.id
        }
      })
      if(!res.errno) {
        this.infoForm = res.data
        // console.log(api)
        this.banner_list = this.infoForm.data.map(function(v) {
          let obj = {
            url: v.img_url,
            is_hover: false
          }
          return obj
        })
      }
    },

    // 开启拖拽
    openDrag() {
      this.file_list = JSON.parse(JSON.stringify(this.banner_list)) //数组深拷贝
      this.drag_open = true
    },
    // 取消拖拽
    cancle() {
      this.banner_list = this.file_list
      this.drag_open = false
    },
    // 拖拽保存
    save() {
      this.drag_open = false
    }
  }
}
</script>

<style scoped>
.image-item {
  width: 200px;
  height: 200px;
}
.in-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0;
}

.img-wrap {
  float: left;
  width: 100px;
  height: 100px;
}

.input-wrap {
  width: 100px;
  float: left;
  margin-left: 30px;
  margin-top: 30px;
}
</style>
