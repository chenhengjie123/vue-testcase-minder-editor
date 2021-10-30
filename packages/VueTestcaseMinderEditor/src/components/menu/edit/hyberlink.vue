<template>
  <div class="selection-group">
    <i class="el-icon-link" style="font-size: 23px;cursor: pointer;" @click="openModal"></i>
    <el-dropdown trigger="click" @command="handleLinkCommand">
  <span class="el-dropdown-link">
    链接<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown" class="selection-dropdown-list">
        <el-dropdown-item command="add">插入超链接</el-dropdown-item>
        <el-dropdown-item command="remove">移除已有超链接</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


    <el-dialog title="超链接" :visible.sync="visible" width="50%">

      <el-form
        ref="form"
        label-position="right"
        :rules="rules"
        label-width="100px"
        :model="formData"
      >
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="formData.url" placeholder="必填：以http(s):// 开头" />
        </el-form-item>
        <el-form-item label="提示文本" prop="title">
          <el-input v-model="formData.title" placeholder="必填：鼠标在连接上悬停时提示文本" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';


  export default {
    name: "hyberlink",
    data() {
      return {
        reslove: null,
        reject: null,
        visible: false,
        formData: {
          url: '',
          title: ''
        },
        rules: {
          url: [
            {required: true, pattern: /http[s]{0,1}:\/\/([\w.]+\/?)\S*/, message: '请输入正确链接', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      ...mapGetters('caseEditorStore', {
        'minder': 'getMinder',
      }),
    },
    methods: {
      openModal(options) {
        this.visible = true;
        this.formData = {
          ...options
        }
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      handleLinkCommand(command) {
        switch (command) {
          case 'add':
            this.addLinkModal();
            break;
          case 'remove':
            this.removeHyperLick();
            break;
          default:
            break;
        }
      },
      addLinkModal() {
        this.openModal();

      },
      removeHyperLick() {
        this.minder.execCommand('HyperLink', null);
      },

      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.resolve({
              url: this.formData.url,
              title: this.formData.title
            })
            this.minder.execCommand('HyperLink',this.formData.url, this.formData.title);
            this.visible = false;
            this.initData();
          }
        })
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
          url: '',
          title: ''
        }
      }
    }
  }
</script>

<style scoped>
</style>
