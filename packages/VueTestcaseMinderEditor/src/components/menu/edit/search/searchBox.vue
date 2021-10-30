<template>
  <div v-show="showSearch" id="search" class="search-box clearfix">

    <div class="input-group input-group-sm search-input-wrap">
      <el-input
        ref="searchInput"
        v-model="keyword"
        type="text"
        clearable
        @keydown.native="handleKeyDown"
      />
      <span
        v-show="showTip"
        class="input-group-addon search-addon"
        v-html="'第 ' + curIndex + ' 条，共 ' + resultNum + ' 条'"
      />
    </div>
    <div class="btn-group btn-group-sm prev-and-next-btn" role="group">
      <el-button
        type="default"
        class="btn btn-default"
        icon="el-icon-arrow-up"
        @click="() => { doSearch('prev') }"
      />
      <el-button
        type="default"
        class="btn btn-default"
        icon="el-icon-arrow-down"
        @click="() => { doSearch('next') }"
      />
    </div>
    <div class="close-search" @click="exitSearch">
      <span class="el-icon-close"/>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
  import {mapGetters} from "vuex";

  let searchSequence = [];
  let nodeSequence = [];

  export default {
    name: "searchBox",
    data() {
      return {
        showSearch: false,
        keyword: '',
        showTip: false,
        curIndex: 1,
        resultNum: 10
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        minder: "getMinder",
        editor: "getEditor"
      }),
    },
    created() {
      $('body').on('keydown', (e) => {
        if (e.keyCode == 70 && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
          this.enterSearch();
          e.preventDefault();
        }
      });
    },
    methods: {
      enterSearch() {
        this.showSearch = true;
        // 有搜索结果选择， 无搜索结果获取焦点
        this.$nextTick(() => {
          if (this.keyword) {
            this.$refs.searchInput.select();
          } else {
            this.$refs.searchInput.focus();
          }
        });
        this.makeNodeSequence();
        this.minder.on('contentchange', this.makeNodeSequence);
        this.$once('hook:beforeDestroy', () => {
          this.minder.off('contentchange', this.makeNodeSequence);
        });
      },
      handleKeyDown(e) {
        if (e.keyCode == 13) {
          const direction = e.shiftKey ? 'prev' : 'next';
          this.doSearch(direction);
        }
        if (e.keyCode == 27) {
          this.exitSearch();
        }
      },
      doSearch(direction) {
        this.showTip = true;
        this.curIndex = 0;
        this.resultNum = 0;
        let keyword = this.keyword.toLowerCase();
        let newSearch = this.doSearch.lastKeyword != keyword;
        this.doSearch.lastKeyword = keyword;
        if (newSearch) {
          this.makeSearchSequence(keyword);
        }
        this.resultNum = searchSequence.length;
        if (searchSequence.length) {
          let curIndex = newSearch ? 0 : (direction === 'next' ? this.doSearch.lastIndex + 1 : this.doSearch.lastIndex - 1) || 0;
          curIndex = (searchSequence.length + curIndex) % searchSequence.length;

          this.setSearchResult(searchSequence[curIndex].node, searchSequence[curIndex].keyword);

          this.doSearch.lastIndex = curIndex;

          this.curIndex = curIndex + 1;
        }
      },
      makeSearchSequence(keyword) {
        searchSequence = [];
        for (let i = 0; i < nodeSequence.length; i++) {
          const node = nodeSequence[i];
          const text = node.getText().toLowerCase();
          const id = node.data.id.toLowerCase();
          if (id.indexOf(keyword) != -1) {
            searchSequence.push({node: node});
          }
          if (text.indexOf(keyword) != -1) {
            searchSequence.push({node: node});
          }
          const note = node.getData('note');
          if (note && note.toLowerCase().indexOf(keyword) != -1) {
            searchSequence.push({node: node, keyword: keyword});
          }
        }
      },
      makeNodeSequence() {
        nodeSequence = [];
        this.minder.getRoot().traverse(function (node) {
          nodeSequence.push(node);
        });
      },
      setSearchResult(node, previewKeyword) {
        this.minder.execCommand('camera', node, 50);
        setTimeout(function () {
          this.minder.select(node, true);
          if (!node.isExpanded()) this.minder.execCommand('expand', true);
          if (previewKeyword) {
            this.minder.fire('shownoterequest', {node: node, keyword: previewKeyword});
          }
        }, 60);
      },
      exitSearch() {
        this.showSearch = false;
        this.$refs.searchInput.blur();
        this.minder.fire('hidenoterequest');
        this.editor.receiver.selectAll();
        this.minder.off('contentchange', this.makeNodeSequence);
      }
    }
  }
</script>
<style lang="less" scoped>
.search-box {
  float: right;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  position: relative;
  top: 0;
  z-index: 3;
  width: 410px;
  height: 40px;
  padding: 3px 6px;
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    width: 280px;
    .el-input {
      float: left;
      width: 100%;
    }
  }
  .search-input-wrap {
    float: left;
  }
  .input-group-addon {
    text-align: center;
    display: table-cell;
    width: 1%;
    height: 30px;
    padding: 5px 10px;
    line-height: 1.5;
    font-size: 12px;
    border-radius: 3px;
    white-space: nowrap;
    vertical-align: middle;
    color: #555;
  }
  .btn-group {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    .btn {
      position: relative;
      float: left;
      padding: 0px 10px;
      width: 34px;
      height: 32px;
      font-size: 12px;
      line-height: 32px;
      border-radius: 3px;
    }
    .btn:first-child {
      margin-left: 0;
    }
  }
  .prev-and-next-btn {
    float: left;
    margin-left: 5px;
  }
  .close-search {
    float: right;
    height: 20px;
    width: 20px;
    padding: 1px;
    border-radius: 100%;
    margin-top: 6px;
    margin-right: 2px;
    cursor: pointer;
    .lk-icon-close {
      height: 16px;
      width: 16px;
    }
  }
}
</style>


