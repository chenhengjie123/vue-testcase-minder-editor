<template>
<div class="insert-group" style="width: 60px">
    <ul style="padding-inline-start: 7px;list-style: none;width: 40px;margin-top:0px;margin-left: 15px" :class="commandDisabled">
      <li :class="undoActive" @click="handleUndo" :active="false">
        <i class="el-icon-back" title="撤销" style="font-size: 25px;cursor: pointer;" ></i>
      </li>

      <li :class="redoActive"  @click="handleRedo">
        <i class="el-icon-right"  title="重做" style="font-size: 25px;cursor: pointer;"></i>
      </li>
    </ul>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "backAndRight",
    data() {
      return {
        undoActive: '',
        redoActive: ''
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        'minder': 'getMinder',
        'editor': 'getEditor'
      }),
      commandDisabled() {
        let minder = this.minder
        let self = this;
        minder.on && minder.on('interactchange', function() {
          self.classRedoActive();
          self.classUndoActive();
        });
        return minder.queryCommandState;
      },
    },
    methods: {
      classRedoActive() {
        let isActive;
        if (Object.prototype.hasOwnProperty.call(this.editor, 'history')) {
          isActive = this.editor.history.hasRedo() === true;
        }
        this.redoActive = isActive ? 'active' : ''
      },
      classUndoActive() {
        let isActive;
        if (Object.prototype.hasOwnProperty.call(this.editor, 'history')) {
          isActive = this.editor.history.hasUndo() === true;
        }
        this.undoActive = isActive ? 'active' : ''
      },
      handleUndo() {
        if (this.editor.history.hasUndo()) {
          this.editor.history.undo();
        }
      },
      handleRedo() {
        if (this.editor.history.hasRedo()) {
          this.editor.history.redo();
        }
      },
    },
  }
</script>

<style scoped>
</style>
