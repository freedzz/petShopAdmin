<template>
  <div class="icons margin-lr">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="自定义图标" name="1">
        <div class="custom-svg flex flex-wrap">
          <el-card
            v-for="(svg, index) in svgList"
            :key="index"
            class="svg-item margin-lr-sm"
            shadow="hover"
            style="cursor: pointer"
            @click.native="handleCopyIcon(svg, true, $event)"
          >
            <svg-icon :iconClass="svg" className="icon"></svg-icon>
            <div class="icon-name">{{ svg }}</div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="element-ui图标" name="2">
        <div class="element-ui-icon flex flex-wrap">
          <el-card
            v-for="(svg, index) in elementIcons"
            :key="index"
            class="svg-item margin-lr-sm"
            shadow="hover"
            style="cursor: pointer"
            @click.native="handleCopyIcon(svg, false, $event)"
          >
            <i :class="svg" class="icon"></i>
            <div class="icon-name">{{ svg }}</div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-bar"><el-input v-model="searchKey" placeholder="请输入搜索条件..." /></div>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import { elementIcons } from './constant.js'

// 获取到components文件夹下的所有文件
const requireSvg = require.context('@/assets/icons/svg', true, /\.svg/)
const svgList = []
// 编辑文件获取每个组件的名字和config
requireSvg.keys().forEach(svg => {
  const svgIcon = svg.split('.')[1]
  svgList.push(svgIcon.split('/')[1])
})

export default {
  name: 'Icons',
  data() {
    return {
      activeName: '1',
      svgList: svgList,
      elementIcons: elementIcons,
      copyText: '',
      searchKey: ''
    }
  },
  computed: {},
  watch: {
    searchKey: {
      handler(value) {
        console.log(value)
        if (this.activeName === '1') {
          this.svgList = value ? this.svgList.filter(icon => icon.indexOf(value) > -1) : svgList
        } else {
          this.elementIcons = value ? this.elementIcons.filter(icon => icon.indexOf(value) > -1) : elementIcons
        }
      }
    }
  },
  methods: {
    tabClick(tab) {
      if (tab.name === '1') {
        this.svgList = svgList
      } else {
        this.elementIcons = elementIcons
      }
      this.searchKey = ''
    },
    filterIcon() {
      this.elementIcons = this.elementIcons.filter(icon => icon.indexOf(this.searchKey) > -1)
    },
    handleCopyIcon(svg, isCostom, event) {
      const copyText = isCostom ? `<svg-icon icon-class='${svg}' class-name='icon'></svg-icon>` : `<i class="${svg}" class="icon"></i>`
      clip(copyText, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  position: relative;
  .el-tabs {
    .el-tab-pane {
      display: flex;
      .svg-item {
        margin-top: 10px;
        width: 150px;
        &:hover {
          .icon,
          .icon-name {
            color: #409eff;
          }
        }
        /deep/ .el-card__body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px;
          .icon {
            font-size: 18px;
            margin-bottom: 10px;
          }
        }
        .icon-name {
          font-size: 8px;
          line-height: 12px;
          text-align: center;
        }
      }
    }
  }
  .search-bar {
    position: absolute;
    top: 6px;
    left: 250px;
    .el-input {
      /deep/ .el-input__inner {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
