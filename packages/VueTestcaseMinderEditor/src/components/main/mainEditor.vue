<template lang="html">
  <div class="mind-editor"></div>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        previewTimer: null,
      }
    },

    // 父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量
    inject: ['main'],

    mounted() {
      var Editor = require('../../script/editor');
      var el = this.$el;
      var editor = window.editor = new Editor(el);
      this.setEditor(editor);

      window.minder = window.km = editor.minder;
      this.setMinder(editor.minder);
      this.executeCallback();

      // 显示 note 浮层 kityminder-core 源码src/module/note.js NoteIconRenderer
      window.minder.on('shownoterequest', this.shownoterequest);

      // note 浮层隐藏
      document.addEventListener('wheel', this.main.hidePreviewer);
      document.addEventListener('mousedown', this.main.hidePreviewer);
      document.addEventListener('mousewheel', this.main.hidePreviewer);

      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('wheel', this.main.hidePreviewer);
        document.removeEventListener('mousedown', this.main.hidePreviewer);
        document.removeEventListener('mousewheel', this.main.hidePreviewer);
      });

    },
    computed: {
      ...mapGetters('caseEditorStore', [
        'minder'
      ])
    },
    methods: {
      ...mapActions('caseEditorStore', [
        'executeCallback'
      ]),
      ...mapMutations('caseEditorStore', [
        'setMinder',
        'setEditor'
      ]),

      // 展示 note 的浮层
      shownoterequest(e) {
        this.previewTimer = setTimeout(() => {
          this.main.preview(e.node, e.keyword);
        }, 300);
      },
      hidenoterequest() {
        clearTimeout(this.previewTimer);
      },

    },
  }
</script>

<style lang="scss">
@import "../../style/editor.scss";
</style>
