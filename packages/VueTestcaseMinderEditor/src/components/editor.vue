<template>
  <!--<div class="main-container">-->
  <div :class="computeFullScreenClass">
    <header-menu></header-menu>
    <main-editor></main-editor>
    <navigator></navigator>

    <!-- note markdown 挂件 -->
    <div
      v-show="showNotePreviewer"
      class="note-box"
      ref="notePreviewer"
      :style="notBoxStyle"
    >
      <VueMarkdown :source="markSource"/>
    </div>


    <!--    查询过滤文本框-->
    <search-box ref="searchBox"/>
    <search-label-box ref="searchLabelBox"></search-label-box>

  </div>

</template>

<script>

  import headerMenu from './header'
  import mainEditor from './main/mainEditor'
  import navigator from './main/navigator'
  import VueMarkdown from 'vue-markdown';
  import searchBox from "./menu/edit/search/searchBox";
  import searchLabelBox from "./menu/edit/search/searchLabelBox";
  import {expandParent} from '../utils/convert/jsonconvert';

  import {
    mapMutations,
    mapGetters
  } from 'vuex'


  export default {
    name: 'editor',
    components: {
      headerMenu,
      mainEditor,
      navigator,
      VueMarkdown,
      searchBox,
      searchLabelBox
    },
    //父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量
    provide() {
      return {
        main: this
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', [
        'config',
        'minder'
      ]),
      computeFullScreenClass: function() {
        return this.config.isFullScreen ? "full-screen" : ""
      }
    },
    data() {
      return {
        showNotePreviewer: false,
        notBoxStyle: {},
        markSource: ''
      }
    },
    props: {
      allowEditPriority: {
        type: Boolean,
        default: true
      },
      allowEditLabel: {
        type: Boolean,
        default: true
      },
      allowEditResult: {
        type: Boolean,
        default: true
      },
      allowEditNode: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.$refs.notePreviewer.addEventListener('wheel', (e) => {
        e.stopPropagation()
      });
      this.$refs.notePreviewer.addEventListener('mousedown', (e) => {
        e.stopPropagation()
      });
      this.$refs.notePreviewer.addEventListener('mousewheel', (e) => {
        e.stopPropagation()
      });
      
      // 设置到 vuex 里，便于其他 vue 组件获取更新
      this.setConfig({
        'allowEditPriority': this.allowEditPriority,
        'allowEditLabel': this.allowEditLabel,
        'allowEditResult': this.allowEditResult,
        'allowEditNode': this.allowEditNode
      })

      this.reloadModules(this.config)

    },
    methods: {
      ...mapMutations('caseEditorStore', [
        'setConfig'
      ]),
      // 设置note显示和位置
      preview(node, keyword) {
        let icon = node.getRenderer('NoteIconRenderer').getRenderShape();
        let b = icon.getRenderBox('screen');
        let note = node.getData('note');
        let x = b.cx;
        let y = b.bottom;
        this.markSource = note;
        this.showNotePreviewer = true;
        this.notBoxStyle = {
          top: y + 'px',
          left: x + 'px',
        }
      },
      hidePreviewer() {
        this.showNotePreviewer = false;
      },
      openSearchBox() {
        this.$refs.searchBox.enterSearch();
      },
      openLabelBox() {
        this.$refs.searchLabelBox.openModal().then(res => {
          const priority = res.priority;
          const source = res.sourceSelected;
          const testResult = "";
          this.filterMindForLabel(priority, testResult, source);
        });
      },
      filterMindForLabel(priority, testResult, source) {
        const json = window.minder.exportJson();
        filter(json.root);

        function filter(data) {
          let needExpand = false;

          const hasPriorityCondition = priority.length !== 0; // 具备Priority过滤条件
          const hasTestResultCondition = testResult.length !== 0; // 具备testResult过滤条件
          const hasSourceCondition = source.length !== 0; // 具备source过滤条件

          // 交集
          let intersection = null;
          if (hasSourceCondition) {
            intersection = source.filter(function (val) {
              return data.data.resource && data.data.resource.indexOf(val) > -1
            });
          }

          const matchPriority = hasPriorityCondition && priority.indexOf(data.data.priority) !== -1;
          const matchTestResult = hasTestResultCondition && testResult.indexOf(data.data.testResult) !== -1;
          const matchSource = hasSourceCondition && intersection.length !== 0;
          needExpand = (!hasPriorityCondition || matchPriority) && (!hasTestResultCondition || matchTestResult) && (!hasSourceCondition || matchSource);
          if (needExpand) {
            data.data.expandState = 'expand'
          } else {
            data.data.expandState = 'collapse'
          }
          if (data.children.length !== 0) {
            data.children.forEach(item => {
              filter(item);
            });
          }
        }

        json.root.data.expandState = 'expand';
        json.root = expandParent(json.root);
        window.minder.importJson(json);
      },
      reloadModules(config) {
        window.minder.enable()
        // 对应去掉 kityminder-core 里的相关组件
        var disableModuleNames = []
        if (!config.allowEditPriority) { // 修改优先级开关
          disableModuleNames.push("SetPriorityCommand")
        }
        if (!config.allowEditLabel) { // 修改自定义标签开关
          disableModuleNames.push("ResourceCommand")
        }
        if (!config.allowEditResult) { // 修改测试结果开关
          disableModuleNames.push("ResultCommand")
        }
        if (!config.allowEditNode) { // 修改节点开关
          disableModuleNames.push("AppendChildCommand")
          disableModuleNames.push("AppendSiblingCommand")
          disableModuleNames.push("ArrangeUpCommand")
          disableModuleNames.push("RemoverNodeCommand")
          disableModuleNames.push("AppendParentCommand")

          disableModuleNames.push("ClearStyleCommand")
          disableModuleNames.push("CopyStyleCommand")
          disableModuleNames.push("PastStyleCommand")

          disableModuleNames.push("fontfamilyCommand")
          disableModuleNames.push("fontsizeCommand")
          disableModuleNames.push("boldCommand")
          disableModuleNames.push("italicCommand")
        }
        window.minder.disableSpecificModule(disableModuleNames)

        // 编辑节点的部分功能不能直接通过调整模块禁用，得另外设置
        if (!config.allowEditNode) {
          window.minder.setStatus("readonly")
          // 关掉右键展示 hotbox 功能
          if (editor.hotbox.$element.parentNode === window.editor.hotbox.$container) {
            window.editor.hotbox.$container.removeChild(editor.hotbox.$element);
          }
        } else {
          // 从 readonly 切换到其他状态，需要加上第二个 force 参数，且值要为 true 
          window.minder.setStatus("normal", true)
          window.editor.hotbox.$container.appendChild(editor.hotbox.$element);
        }
      }
    },
    watch: {
      config: {
        handler(value) {
          this.reloadModules(value)
        }
      }
    }
  }

</script>
