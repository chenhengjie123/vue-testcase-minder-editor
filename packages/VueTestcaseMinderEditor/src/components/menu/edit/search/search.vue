<template>
  <div class="selection-group">
    <i class="el-icon-search"
       style="font-size: 23px;cursor: pointer;"
       @click="()=>{main.openSearchBox()}">
    </i>
    <el-dropdown trigger="click" @command="handleSearchCommand">
  <span class="el-dropdown-link">
    搜索<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown" class="selection-dropdown-list">
        <el-dropdown-item command="word">关键字搜索</el-dropdown-item>
        <!--标签过滤有问题，先关掉-->
        <!-- <el-dropdown-item command="label">标签过滤</el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>

  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: "search",
    inject: ['main'],

    data() {
      return {}
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        count: 'count',
        'minder': 'getMinder',
      }),
    },

    methods: {
      handleSearchCommand(command) {
        switch (command) {
          case 'word':
            this.main.openSearchBox();
            break;
          case 'label':
            this.main.openLabelBox();
            break;
          default:
            break;
        }
      },
    }
  }
</script>

<style scoped>
</style>
