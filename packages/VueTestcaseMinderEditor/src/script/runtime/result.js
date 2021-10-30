define(function (require, exports, module) {

  function ResultRuntime() {
    var minder = this.minder;
    var hotbox = this.hotbox;
    var main = hotbox.state("main");
    var resultButtonMapper = {
      '0': {
        label: '移除结果',
        key: 'Alt + D'
      }, 
      '9': {
        label: '成功',
        key: 'Alt + G'
      },
      '1': {
        label: '失败',
        key: 'Alt + F'
      },
      '5': {
        label: '阻塞',
        key: 'Alt + B'
      },
      '4': {
        label: '不执行',
        key: 'Alt + S'
      }
    }

    // 直接加到 main 中，会导致无法显示，但可以保证快捷键可以直接在界面使用
    "09154".replace(/./g, function(p) {
        main.button({
            position: "buttom",
            label: resultButtonMapper[p].label,
            key: resultButtonMapper[p].key,
            action: function() {
                minder.execCommand("result", Number(p));
            }
        });
    });
  }

  return module.exports = ResultRuntime;
});
