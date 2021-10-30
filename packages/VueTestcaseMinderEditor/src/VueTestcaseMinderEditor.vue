<template>
  <editor class="vue-testcase-minder-editor-container"
      :allowEditPriority="allowEditPriority"
      :allowEditLabel="allowEditLabel"
      :allowEditResult="allowEditResult"
      :allowEditNode="allowEditNode"
  ></editor>
</template>

<script>
import editor from './components/editor.vue'
import Vue from 'vue'

// 非正规写法，这个 store 为了方便外部引用得变成一个 module
import caseEditorStore from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import $ from 'jquery'

require('codemirror')
require('codemirror/mode/xml/xml')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')
require('codemirror/mode/markdown/markdown')
require('codemirror/addon/mode/overlay')
require('codemirror/mode/gfm/gfm')
require('marked')

require('kity')

// require('../node_modules/hotbox/hotbox.js')
require('../../../hotbox/hotbox.js')
// require('../node_modules/kityminder-core/dist/kityminder.core.js')
require('../../../kityminder-core/dist/kityminder.core.js')

require('./script/expose-editor.js')

Vue.use(ElementUI)

import {
  mapMutations,
  mapGetters
} from 'vuex'

export default {
  components: { editor },
  name: 'VueTestcaseMinderEditor',
  caseEditorStore,
  data() {
    return {
      minder: {}
    }
  },
  props: {
    initJson: {
      type: Object,
      default: {
        'root': {
            "data": {
                "id": "c9hol4de1iw0",
                "created": 1614161753133,
                "text": "中心主题"
            },
            "template": "default",
            "theme": "fresh-blue",
            "version": "1.4.43"
        }
      }
    },
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
  computed: {
    ...mapGetters('caseEditorStore', [
      'config'
    ]),
  },
  methods: {
    ...mapMutations('caseEditorStore', [
      'setConfig'
    ]),
    getJsonData() {
      return this.minder.exportJson()
    }
  },
  mounted() {
    // TODO: 直接从 window 取 minder 不大好，应该调用 vuex 
    this.minder = window.minder
    this.minder.importJson(this.initJson)
  },
  watch: {
    // 因为父组件有可能是通过异步等方式来获取初始化 Json 的，
    // 因此需要监听这个属性值的变化，一旦有变化重新加载。
    initJson: {
      deep: true,
      handler(val) {
        this.minder.importJson(val)
      }
    },
    allowEditPriority: {
      handler(value) {
        this.setConfig({"allowEditPriority": value})
      }
    },
    allowEditLabel: {
      handler(value) {
        this.setConfig({"allowEditLabel": value})
      }
    },
    allowEditResult: {
      handler(value) {
        this.setConfig({"allowEditResult": value})
      }
    },
    allowEditNode: {
      handler(value) {
        this.setConfig({"allowEditNode": value})
      }
    }
  }
}
</script>

<style scoped>
html {
  font-family: sans-serif;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

article, aside, footer, header, nav, section {
  display: block;
}

h1 {
  font-size: 2em;
  margin: .67em 0;
}

figcaption, figure, main {
  display: block;
}

figure {
  margin: 1em 40px;
}

hr {
  overflow: visible;
  box-sizing: content-box;
  height: 0;
}

pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

a:active, a:hover {
  outline-width: 0;
}

abbr[title] {
  text-decoration: underline;
  text-decoration: underline dotted;
  border-bottom: none;
}

b, strong {
  font-weight: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

dfn {
  font-style: italic;
}

mark {
  color: #000;
  background-color: #ff0;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -.25em;
}

sup {
  top: -.5em;
}

audio, video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

button, input, optgroup, select, textarea {
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button, input {
  overflow: visible;
}

button, select {
  text-transform: none;
}

button, html [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
}

[type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner, button::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

[type='button']:-moz-focusring, [type='reset']:-moz-focusring, [type='submit']:-moz-focusring, button:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  margin: 0 2px;
  padding: .35em .625em .75em;
  border: 1px solid #c0c0c0;
}

legend {
  display: table;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0;
  white-space: normal;
  color: inherit;
}

progress {
  display: inline-block;
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type='checkbox'], [type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}

[type='search']::-webkit-search-cancel-button, [type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

details, menu {
  display: block;
}

summary {
  display: list-item;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

.vue-testcase-minder-editor-container {
  position: relative;
  height: calc(100vh - 100px);
}

.vue-testcase-minder-editor-container.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh !important;
    z-index: 99;
}
</style>
