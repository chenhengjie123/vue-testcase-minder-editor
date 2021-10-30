<template lang="html">
<div class="menu-container">
<!--  撤销回退、重做-->
  <back-and-right></back-and-right>

  <expand></expand>
  <selection></selection>
  <insert-box v-if="allowEditNode"></insert-box>
  <move-box v-if="allowEditNode"></move-box>
  <edit-del v-if="allowEditNode"></edit-del>
  <!--    超链接-->
  <hyberlink v-if="allowEditNode"></hyberlink>
<!--  查询、过滤-->
  <search></search>
  <node-box v-if="allowEditNode"></node-box>
  <sequence-box v-if="allowEditPriority"></sequence-box>
  <!-- <progress-box></progress-box> -->
  <!--  自定义标签-->
  <resource-edit v-if="allowEditLabel"></resource-edit>
  <!--测试结果登记-->
  <result-box v-if="allowEditResult"></result-box>

</div>
</template>

<script>
import insertBox from './insertBox'
import moveBox from './moveBox'
import editDel from './editDel'
import sequenceBox from './sequenceBox'
import progressBox from './progressBox'
import expand from './expand'
import selection from './selection'
import NodeBox from "./noteBox";
import resourceEdit from "./resourceEdit";
import Search from "./search/search";
import hyberlink from "./hyberlink";
import backAndRight from "./backAndRight";
import resultBox from './resultBox';

import {
  mapGetters
} from 'vuex'

export default {
  name: 'editMenu',
  components: {
    Search,
    NodeBox,
    insertBox,
    moveBox,
    editDel,
    sequenceBox,
    // progressBox,
    expand,
    selection,
    resourceEdit,
    hyberlink,
    backAndRight,
    resultBox
  },
  computed: {
    ...mapGetters('caseEditorStore', {
      count: 'count',
      config: 'config'
    }),
    allowEditPriority() {
      return this.config.allowEditPriority
    },
    allowEditLabel() {
      return this.config.allowEditLabel
    },
    allowEditResult() {
      return this.config.allowEditResult
    },
    allowEditNode() {
      return this.config.allowEditNode
    }

  }
}
</script>
