define(function (require, exports, module) {
  var runtimes = [];

  function assemble(runtime) {
    runtimes.push(runtime);
  }

  function KMEditor(selector) {
    this.selector = selector;
    for (var i = 0; i < runtimes.length; i++) {
      if (typeof runtimes[i] == 'function') {
        runtimes[i].call(this, this);
      }
    }
  }

  KMEditor.assemble = assemble;

  assemble(require('./runtime/container'));
  assemble(require('./runtime/fsm'));
  assemble(require('./runtime/minder'));
  assemble(require('./runtime/receiver'));
  assemble(require('./runtime/hotbox'));
  assemble(require('./runtime/input'));
  assemble(require('./runtime/clipboard-mimetype'));
  assemble(require('./runtime/clipboard'));
  assemble(require('./runtime/drag'));
  assemble(require('./runtime/node'));
  assemble(require('./runtime/history'));
  assemble(require('./runtime/jumping'));
  assemble(require('./runtime/priority'));
  // 为兼容原有滴滴用例，用例结果复用了 progress 这个 key 所以不能出原版 progress 的 hotbox 按钮
  // assemble(require('./runtime/progress'));
  // 禁用导出功能
  // assemble(require('./runtime/exports'));
  assemble(require('./runtime/result'));

  return module.exports = KMEditor;
});
