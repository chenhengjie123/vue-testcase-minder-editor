<template>
  <div class="selection-group" :disabled="disabled">
    <el-dropdown trigger="click" :hide-on-click="true" @command="handleCommand">
      <span>
        主题设置
        <i class="el-icon-caret-bottom el-icon--right"/>
      </span >
      <el-dropdown-menu slot="dropdown" class="theme-dropdown-list">
        <el-dropdown-item
          v-for="(item,index) in themeList"
          :key="index"
          :style="{background:item.background,color:item.color,borderRadius:item.borderRadius+'px'}"
          :class="theme(index)"
          :command="index"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Mold',
    data() {
      return {
        mold_index: 1,
        themeList: [],
        nameList: {
          'classic': '脑图经典',
          'classic-compact': '紧凑经典',
          'snow': '温柔冷光',
          'snow-compact': '紧凑冷光',
          'fish': '鱼骨图',
          'wire': '线框',
          'fresh-red': '清新红',
          'fresh-soil': '泥土黄',
          'fresh-green': '文艺绿',
          'fresh-blue': '天空蓝',
          'fresh-purple': '浪漫紫',
          'fresh-pink': '脑残粉',
          'fresh-red-compat': '紧凑红',
          'fresh-soil-compat': '紧凑黄',
          'fresh-green-compat': '紧凑绿',
          'fresh-blue-compat': '紧凑蓝',
          'fresh-purple-compat': '紧凑紫',
          'fresh-pink-compat': '紧凑粉',
          'tianpan': '经典天盘',
          'tianpan-compact': '紧凑天盘'
        }
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        'minder': 'getMinder'
      }),
      class_mold_index() {
        return 'mold-' + this.mold_index
      },
      disabled() {
        return this.minder.queryCommandState && this.minder.queryCommandState('template') === -1
      },
      templateList() {
        let themeList = kityminder.Minder.getThemeList()
        return themeList;
      },
      curTheme() {
        return function () {
          return this.nameList['classic'];
        }
      }
    },
    created() {
      let list = kityminder.Minder.getThemeList()
      for (var k in list) {
        let style = list[k]
        let label = {
          name: this.nameList[k],
          background: style['root-background'],
          color: style['root-color'],
          borderRadius: style['root-radius'] / 2
        }
        this.themeList.push(label)
      }
    },
    methods: {
      handleCommand(command) {
        this.mold_index = ~~command + 1;
        this.minder.useTheme(Object.keys(this.templateList)[command]);
      },
      theme(index) {
        return 'mold-' + index + ' dropdown-item theme-icons'
      }
    }
  }
</script>

<style scoped>
.theme-group {
  width: 120px;
  cursor: pointer;
}
.theme-group:hover {
  background-color: #efefef;
}
.theme-dropdown-list {
  width: 250px;
  height: auto;
  font-size: 12px;
  text-align: center;
}
.dropdown-item {
  display: inline-block;
  width: 70px;
  height: 30px;
  padding: 0;
  margin: 2px 1px;
}
</style>
