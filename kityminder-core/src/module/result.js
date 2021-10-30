define(function (require, exports, module) {
  var kity = require('../core/kity')
  var utils = require('../core/utils')

  var Minder = require('../core/minder')
  var MinderNode = require('../core/node')
  var Command = require('../core/command')
  var Module = require('../core/module')
  var Renderer = require('../core/render')

  Module.register('ResultModule', function () {
    var minder = this
    // FIXME: 超级大坑，滴滴AgileTC用了 progress 记录测试结果，为了兼容这里只能继续用。
    var RESULT_DATA = 'progress'
    var DEFAULT_BACKGROUND = '#43BC00'
    var PASS_VALUE = 9
    var FAIL_VALUE = 1
    var BLOCK_VALUE = 5
    var SKIP_VALUE = 4
    var FRAME_GRAD = new kity.LinearGradient().pipe(function(g) {
        g.setStartPosition(0, 0);
        g.setEndPosition(0, 1);
        g.addStop(0, '#fff');
        g.addStop(1, '#ccc');
    });
    //
    // minder.getPaper().addResource(FRAME_GRAD);
    // 进度图标的图形
    var ResultIcon = kity.createClass('ResultIcon', {
      base: kity.Group,
      constructor: function (value) {
        this.callBase()
        this.setSize(20)
        this.create()
        this.setValue(value)
        this.setId(utils.uuid('node_progress'))
        this.translate(0.5, 0.5)
      },
      setSize: function (size) {
        this.width = this.height = size
      },
      create: function () {
        var default_circle = new kity.Circle(9).fill("#FFED83")
        default_pie = new kity.Pie(9, 0).fill(DEFAULT_BACKGROUND)
        pass = new kity.Path().setTranslate( - 10, -10).setPathData("M15.812,7.896l-6.75,6.75l-4.5-4.5L6.25,8.459l2.812,2.803l5.062-5.053L15.812,7.896z").fill("#EEE")
        fail = new kity.Path().setTranslate( - 10, -10).setPathData("M5,5l.7,-.7l4.3,4.3l4.3,-4.3l1.4,1.4l-4.3,4.3l4.3,4.3l-1.4,1.4l-4.3,-4.3l-4.3,4.3l-1.4,-1.4l4.3,-4.3l-4.3,-4.3l.7,-.7z").fill("#d81e06")
        block = new kity.Pie(9, 0).fill("red")
        skip = new kity.Path().setTranslate( - 10, -10).setScale(.02).setPathData("M747.3152 415.6416a256.0512 256.0512 0 0 0-489.472 96.768H341.504a170.6496 170.6496 0 0 1 327.6288-58.624l-115.0976 20.9408 227.84 116.736 48.2816-251.392-82.8416 75.5712zM0 512C0 229.2224 229.1712 0 512 0c282.7776 0 512 229.1712 512 512 0 282.7776-229.1712 512-512 512-282.7776 0-512-229.1712-512-512z").fill("#BE96F9")
        this.addShapes([default_circle, default_pie,  skip, pass, fail, block])
        this.pie = default_pie
        this.check = pass
        this.fail = fail
        this.block = block
        this.skip = skip
        },
      setValue: function (value) {
        
        SKIP_VALUE !== value ? this.pie.setAngle( - 360 * (value - 1) / 8).fill(DEFAULT_BACKGROUND) : this.pie.setAngle(360).fill("#fff")
        this.check.setVisible(PASS_VALUE == value)
        this.fail.setVisible(FAIL_VALUE == value)
        this.block.setVisible(BLOCK_VALUE == value)
        this.skip.setVisible(SKIP_VALUE == value)
        BLOCK_VALUE == value && this.block.setAngle( - 180)
      }
    })
    /**
     * @command Result
     * @description 设置节点的结果信息（添加一个结果小图标）
     * @param {number} value 要设置的进度
     *     取值为 0 移除结果信息；
     *     取值为 1 表示成功；
     *     取值为 2 表示失败；
     *     取值为 3 表示忽略；
     * @state
     *    0: 当前有选中的节点
     *   -1: 当前没有选中的节点
     */
    var ResultCommand = kity.createClass('ResultCommand', {
      base: Command,
      execute: function (km, value) {
        var nodes = km.getSelectedNodes()
        // if (value > 0 && nodes.length === 1 && !nodes[0].isLeaf()) {
        //   ilayer.alert('父节点不允许标记测试结果。', {
        //     skin: 'layui-layer-molv',
        //     closeBtn: 0
        //   })
        //   return
        // }
        var msg_flag = false
        for (var i = 0; i < nodes.length; i++) {
          if (value === 0) {
            nodes[i].removeKey(RESULT_DATA).render()
          } else {
            nodes[i].setData(RESULT_DATA, value || null).render()
            // if (nodes[i].isLeaf()) {

            // } else {
            //   msg_flag = true
            // }
          }
        }
        // if (msg_flag) {
        //   ilayer.alert('父节点不允许标记测试结果。', {
        //     skin: 'layui-layer-molv',
        //     closeBtn: 0
        //   })
        // }
        km.layout()
      },
      queryValue: function (km) {
        var nodes = km.getSelectedNodes()
        var val
        for (var i = 0; i < nodes.length; i++) {
          val = nodes[i].getData(RESULT_DATA)
          if (val) break
        }
        return val || null
      },
      queryState: function (km) {
        return km.getSelectedNodes().length ? 0 : -1;
      }
    })
    return {
      commands: {
        result: ResultCommand
      },
      renderers: {
        left: kity.createClass('ResultRenderer', {
          base: Renderer,
          create: function (node) {
            return new ResultIcon()
          },
          shouldRender: function (node) {
            // return node.getData(RESULT_DATA);
            return node.getData(RESULT_DATA) && !node.getData('hideState')
          },
          update: function (icon, node, box) {
            var data = node.getData(RESULT_DATA)
            var spaceLeft = node.getStyle('space-left')
            var x, y
            icon.setValue(data)
            x = box.left - icon.width - spaceLeft
            y = -icon.height / 2
            icon.setTranslate(x + icon.width / 2, y + icon.height / 2)
            return new kity.Box(x, y, icon.width, icon.height)
          }
        })
      }
    }
  })
}
)
