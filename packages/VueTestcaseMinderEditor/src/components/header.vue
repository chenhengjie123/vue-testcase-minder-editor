<template lang="html">
  <header>
    <div id="mind_tab">
      <div :class="{selected:switchShow.showEditMenu}">
        <a href="javascritp:;" class="btn-showEditMenu" @click="showMenu">思维导图</a>
      </div>
      <div :class="{selected:switchShow.showViewMenu}">
        <a href="javascritp:;" class="btn-showViewMenu" @click="showMenu">外观样式</a>
      </div>
      <div class="rightCol">
        <span class="selected-node-count-text">{{selectedNodeCountText}}</span>
        <el-button class="full-screen-button" icon="el-icon-full-screen" @click="toggleFullScreen">{{fullScreenText}}</el-button>
      </div>
    </div>
        
    <div id="mind_tab-content">
      <div class="mind-tab-panel" v-show="switchShow.showEditMenu">
        <edit-menu></edit-menu>
      </div>
      <div class="mind-tab-panel" v-show="switchShow.showViewMenu">
        <view-menu></view-menu>
      </div>
    </div>
  </header>
</template>

<script>
  import editMenu from './menu/edit/editMenu'
  import viewMenu from './menu/view/viewMenu'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  
  export default {
    name: 'headerVue',
    data() {
      return {
        switchShow: {
          showEditMenu: true,
          showViewMenu: false
        },
        fullScreenText: "全屏",
        selectedNodeCount: 0,
        selectedNodeText: ''
      }
    },
    components: {
      editMenu,
      viewMenu
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        'config': 'config',
        'minder': 'getMinder'
      }),
      selectedNodeCountText() {
        let minder = this.minder
        let self = this
        let returnText = ''
        minder.on && minder.on('interactchange', function() {
          self.selectedNodeCount = minder.getSelectedNodes().length
          if (self.selectedNodeCount === 1) {
            self.selectedNodeText = minder.getSelectedNodes()[0].data.text
          } else {
            self.selectedNodeText = ''
          }
        });
        returnText = "当前选中的节点数：" + self.selectedNodeCount
        if (self.selectedNodeText) {
          returnText += " 当前选中节点的文字内容：" + self.selectedNodeText
        }
        return returnText
      },
    },
    methods: {
      ...mapMutations('caseEditorStore', [
        'setConfig'
      ]),
      showMenu: function (e) {
        for (var variable in this.switchShow) {
          if (this.switchShow.hasOwnProperty(variable)) {
            this.switchShow[variable] = false
          }
        }
        this['switchShow'][e.target.className.replace('btn-', '')] = true
      },
      toggleFullScreen: function() {
        // 实际生效
        this.setConfig({'isFullScreen': !this.config.isFullScreen})

        this.fullScreenText = this.fullScreenText.indexOf("退出") === -1 ? "退出全屏": "全屏"
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/header.scss";
</style>
