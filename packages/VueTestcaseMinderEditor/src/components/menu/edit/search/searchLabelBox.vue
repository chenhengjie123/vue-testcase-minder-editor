<template>
  <el-dialog
    title="过滤标签"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleClose"
    width="600px"
  >
    <el-form
      ref="form"
      label-position="right"
      label-width="100px"
      :model="formData"
      @submit.native.prevent
    >
      <el-form-item label="用例级别">
        <el-checkbox-group v-model="formData.priority">
          <el-checkbox :label="1">
            P0
          </el-checkbox>
          <el-checkbox :label="2">
            P1
          </el-checkbox>
          <el-checkbox :label="3">
            P2
          </el-checkbox>
          <el-checkbox :label="4">
            P3
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="标签">
        <el-checkbox-group v-model="formData.sourceSelected">
          <el-checkbox
            v-for="(item, index) in sourceData"
            :key="index"
            :label="item.name"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "searchLabelBox",
    data() {
      return {
        reslove: null,
        reject: null,
        visible: false,
        formData: {
          priority: [],
          sourceSelected: [],
        },
        sourceData: []
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        'minder': 'getMinder',
      }),
    },
    methods: {
      openModal() {
        this.visible = true;
        this.initData();
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      handleSubmit() {
        this.resolve(this.formData);
        this.visible = false;
      },
      handleCancel() {
        // 重置填写内容
        this.initData();
        this.visible = false;
      },
      handleClose(done) {
        // 重置填写内容
        this.initData();
        done();
      },
      initData() {
        this.formData = {
          priority: [],
          sourceSelected: []
        }
        const sourceData = this.minder.getUsedResource().map(function (resourceName) {
          return {
            name: resourceName,
          }
        });
        this.sourceData = sourceData;
      }
    }
  }
</script>


<style scoped>
</style>
