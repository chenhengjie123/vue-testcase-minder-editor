<template lang="">
<div class="result-group" :disabled="commandDisabled">
  <button title="移除结果 Alt+D" @click="execCommand(0)"  style="padding: 4px; height: 28px;">
    <i aria-label="图标: minus-circle" class="anticon anticon-minus-circle" style="font-size: 18px; color: rgba(0, 0, 0, 0.6);"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path></svg></i>
  </button>
  <button title="失败 Alt+F" @click="execCommand(1)"  style="padding: 4px; height: 28px;">
    <i aria-label="图标: fail" class="anticon anticon-fail" style="width: 18px; height: 18px;"><svg viewBox="0 0 1024 1024" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M0 512A512 512 0 1 0 512 0 512 512 0 0 0 0 512z" fill="#FFED83" fill-opacity="1" data-spm-anchor-id="a313x.7781069.0.i41"></path><path d="M782.826255 253.254397a37.559846 37.559846 0 0 1 0 51.727156l-465.48949 465.599314a36.571429 36.571429 0 0 1-51.727155-51.727156l465.489489-465.599314a37.559846 37.559846 0 0 1 51.727156 0z" fill="#d81e06" fill-opacity="1" data-spm-anchor-id="a313x.7781069.0.i44"></path><path d="M265.554698 253.254397a37.559846 37.559846 0 0 1 51.727155 0l465.48949 465.48949a36.571429 36.571429 0 0 1-51.727156 51.727155L265.554698 305.091377a37.559846 37.559846 0 0 1 0-51.83698z" fill="#d81e06" fill-opacity="1" data-spm-anchor-id="a313x.7781069.0.i42"></path></svg></i>
  </button>
  <button title="通过 Alt+G" @click="execCommand(2)"  style="padding: 4px; height: 28px;">
    <i aria-label="图标: checked" class="anticon anticon-checked" style="width: 18px; height: 18px;"><svg viewBox="0 0 1024 1024" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M509.750303 514.249697m-509.750303 0a509.750303 509.750303 0 1 0 1019.500606 0 509.750303 509.750303 0 1 0-1019.500606 0Z" fill="#6AC259" fill-opacity="1"></path><path d="M250.957576 537.05697a19.859394 19.859394 0 0 1 0-28.780606l28.780606-28.780606a19.859394 19.859394 0 0 1 28.780606 0l2.01697 2.094545 113.105454 121.250909a9.929697 9.929697 0 0 0 14.351515 0L713.69697 317.129697h2.094545a19.859394 19.859394 0 0 1 28.780606 0l28.780606 28.780606a19.859394 19.859394 0 0 1 0 28.780606l-328.921212 341.333333a19.859394 19.859394 0 0 1-28.780606 0L254.991515 543.030303z" fill="#FFFFFF" fill-opacity="1"></path></svg></i>
  </button>
  <button title="阻塞 Alt+B" @click="execCommand(3)" type="button" class="ant-btn ant-btn-link ant-btn-sm" style="padding: 4px; height: 28px;">
    <i aria-label="图标: block" class="anticon anticon-block" style="width: 18px; height: 18px;"><svg viewBox="0 0 1024 1024" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024A511.99872 511.99872 0 1 0 468.650775 1.794556 512.169386 512.169386 0 0 0 0.00128 512.00128a511.99872 511.99872 0 0 0 511.99872 511.99872z" fill="#FFFFFF" fill-opacity="1"></path><path d="M512 938.66688A426.6656 426.6656 0 1 0 511.914667 85.250347 426.6656 426.6656 0 0 0 512 938.66688z" fill="#d81e06" fill-opacity="1"></path><path d="M512 938.66688a426.6656 426.6656 0 0 0 426.6656-426.6656H85.3344a426.6656 426.6656 0 0 0 426.6656 426.6656z" fill="#FFED83" fill-opacity="1" data-spm-anchor-id="a313x.7781069.0.i5"></path></svg></i>
    </button>
  <button title="不执行 Alt+S" @click="execCommand(4)" type="button" class="ant-btn ant-btn-link ant-btn-sm" style="padding: 4px; height: 28px;">
    <i aria-label="图标: skip" class="anticon anticon-skip" style="width: 18px; height: 18px;"><svg viewBox="0 0 1024 1024" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M747.3152 415.6416a256.0512 256.0512 0 0 0-489.472 96.768H341.504a170.6496 170.6496 0 0 1 327.6288-58.624l-115.0976 20.9408 227.84 116.736 48.2816-251.392-82.8416 75.5712zM0 512C0 229.2224 229.1712 0 512 0c282.7776 0 512 229.1712 512 512 0 282.7776-229.1712 512-512 512-282.7776 0-512-229.1712-512-512z" fill="#BE96F9" fill-opacity="1" p-id="577"></path></svg></i>
  </button>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'resultBox',
  data() {
    return { }
  },
  computed: {
    ...mapGetters('caseEditorStore', {
      'minder': 'getMinder'
    }),
    commandDisabled() {
      var minder = this.minder
      minder.on && minder.on('interactchange', function () {
        this.commandValue = minder.queryCommandValue('result');
      });
      return minder.queryCommandState && minder.queryCommandState('result') === -1;
    },
    
  },
  methods: {
    execCommand(index) {
      // 兼容原来滴滴旧的登记方式，需要调整每个按钮对应的 command 里的值
      var indexTocommandValueMap = {
        0: 0, // 去掉结果
        1: 1, // 不通过
        2: 9, // 通过
        3: 5, // 阻塞
        4: 4  // 不执行
      }
      this.commandDisabled || this.minder.execCommand('result', indexTocommandValueMap[parseInt(index)])
    },
    isActive(index) {
      return this.minder.queryCommandValue && this.minder.queryCommandValue('result') == index;
    },
    title(index) {
      switch (index) {
        case 0: return '移除结果：Alt+D';
        case 1: return '成功：Alt+G';
        case 2: return '失败：Alt+F';
        case 3: return '跳过：Alt+S';
        default: return '';
      }
    }
  },
  created() {}
}
</script>
